(function() {
    /**
     * Configuration object for the scroller.
     * Makes it easy to change settings and content.
     */
    const config = {
        // Data for each content section
        sections: [
            {
                heading: "Population Growth Over the Last Decade",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                ],
                image: "https://quickchart.io/chart?c={type:'line',data:{labels:['2010','2015','2020'],datasets:[{label:'Population',data:[100,125,150]}]}}"
            },
            {
                heading: "CO₂ Emissions Trend in Major Countries",
                paragraphs: [
                    "Emissions in major countries show varying trends over the years.",
                    "China and India are seeing rapid increases, while Europe declines."
                ],
                image: "https://quickchart.io/chart?c={type:'bar',data:{labels:['USA','China','India'],datasets:[{label:'CO₂',data:[5000,8000,3000]}]}}"
            },
            {
                heading: "Renewable Energy Adoption Per Region",
                paragraphs: [
                    "Renewables are growing fastest in Europe and North America.",
                    "Other regions are slowly catching up."
                ],
                image: "https://quickchart.io/chart?c={type:'pie',data:{labels:['Europe','North America','Asia'],datasets:[{data:[40,35,25]}]}}"
            }
        ],
        // IntersectionObserver options: trigger when a section is 50% in view
        observerOptions: {
            threshold: 0.5
        },
        // CSS transition duration in milliseconds
        fadeDuration: 300 // Shorter duration for responsiveness
    };

    /**
     * Injects the necessary CSS into the document's head.
     * Includes comments about potential parent styling conflicts.
     */
    function injectStyles(fadeDuration) {
        const style = document.createElement('style');
        style.textContent = `
            /* CRITICAL: For z-index: -1 to work, parent elements
               (like <body>) must NOT have a solid background color.
               Ensure parents have 'background: transparent;'. */
            .scroller-section { max-width:700px; margin:0 auto 100vh auto; padding: 20px; }
            .scroller-heading { font-size:1.8rem; font-weight:bold; margin-bottom:0.5rem; }
            .scroller-paragraph { margin-bottom:1rem; font-size:1.2rem; line-height:1.5; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(4px); padding: 10px; border-radius: 8px;}
            .sticky-chart-img {
                transition: opacity ${fadeDuration / 1000}s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Creates the sticky container and the image element for the chart.
     * @param {HTMLElement} container - The main scroller container.
     * @returns {HTMLImageElement} The image element that will display charts.
     */
    function createStickyChart(container) {
        const chartContainer = document.createElement('div');
        Object.assign(chartContainer.style, {
            position: 'sticky',
            top: '0',
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '-1' // Places the chart behind the text content
        });

        const chartImg = document.createElement('img');
        chartImg.className = 'sticky-chart-img';
        Object.assign(chartImg.style, {
            maxWidth: '80%',
            maxHeight: '80%',
            objectFit: 'contain',
            opacity: '0' // Start hidden
        });

        chartContainer.appendChild(chartImg);
        container.appendChild(chartContainer);
        return chartImg;
    }

    /**
     * Builds the scrollable text sections from the config data.
     * @param {HTMLElement} container - The main scroller container.
     * @param {Array} sectionsData - The array of section objects.
     */
    function buildContentSections(container, sectionsData) {
        sectionsData.forEach((sec, idx) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'scroller-section';
            sectionEl.setAttribute('data-index', idx);

            const heading = document.createElement('h2');
            heading.className = 'scroller-heading';
            heading.textContent = sec.heading;
            sectionEl.appendChild(heading);

            sec.paragraphs.forEach(p => {
                const para = document.createElement('p');
                para.className = 'scroller-paragraph';
                para.textContent = p;
                sectionEl.appendChild(para);
            });

            container.appendChild(sectionEl);
        });
    }

    /**
     * Preloads all chart images to prevent loading delays during scroll.
     * @param {Array} sectionsData - The array of section objects.
     */
    function preloadImages(sectionsData) {
        console.log("Preloading images...");
        for (const sec of sectionsData) {
            const img = new Image();
            img.src = sec.image;
        }
    }

    /**
     * The main function to initialize the entire scrollytelling component.
     */
    function initScroller() {
        // 1. Browser Capability Check
        if (!('IntersectionObserver' in window)) {
            console.error("IntersectionObserver is not supported by this browser. Scrollytelling will not work.");
            return;
        }
        
        const container = document.getElementById('scroller-container');
        if (!container) {
            console.error("Scroller container with id 'scroller-container' not found.");
            return;
        }

        // 2. Setup the DOM and Styles
        injectStyles(config.fadeDuration);
        const chartImg = createStickyChart(container);
        buildContentSections(container, config.sections);

        // 3. Preload images for a smoother experience
        preloadImages(config.sections);

        let activeIndex = -1; // Keep track of the currently visible chart index

        // 4. Setup the IntersectionObserver
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newIndex = parseInt(entry.target.getAttribute('data-index'));
                    if (newIndex === activeIndex) return; // Do nothing if it's the same section

                    activeIndex = newIndex;
                    
                    // Fade out the current image
                    chartImg.style.opacity = 0;

                    // Listen for the fade-out transition to end before changing the source
                    chartImg.addEventListener('transitionend', () => {
                        // This event listener should only run once per fade-out
                        
                        // ✅ Robust: Add error handling for broken image links
                        chartImg.onerror = () => {
                            console.error("Failed to load image:", config.sections[activeIndex].image);
                            chartImg.style.opacity = 0; // Hide broken image icon
                            chartImg.onerror = null; // Clear handler
                        };

                        // ✅ Robust: Wait for the new image to load before fading in
                        chartImg.onload = () => {
                            chartImg.style.opacity = 1;
                            chartImg.onload = null; // Clear handler
                        };
                        
                        chartImg.src = config.sections[activeIndex].image;
                        
                    }, { once: true }); // { once: true } is crucial for this to work correctly
                }
            });
        }, config.observerOptions);

        document.querySelectorAll('.scroller-section').forEach(sec => observer.observe(sec));
    }

    // Run the initialization logic after the DOM has loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
