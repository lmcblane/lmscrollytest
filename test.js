(function() {
    /**
     * The Story's Configuration.
     * Each section now has a simple 'imageUrl'.
     */
    const config = {
        story: [
            {
                narration: { heading: "Chapter 1: The Wide Expanse", paragraphs: ["Our story begins with a view of the vast, open landscapes where our journey will unfold."] },
                imageUrl: "https://picsum.photos/id/1015/800/600" // A landscape photo
            },
            {
                narration: { heading: "Chapter 2: A Narrowing Path", paragraphs: ["As we venture deeper, the path becomes more defined, guiding us toward the core of the narrative."] },
                imageUrl: "https://picsum.photos/id/10/800/600" // A path or road
            },
            {
                narration: { heading: "Chapter 3: The Central Point", paragraphs: ["Here we arrive at the heart of the matter, the key focus of our exploration."] },
                imageUrl: "https://picsum.photos/id/1040/800/600" // A focused subject, like a castle
            },
            {
                narration: { heading: "Chapter 4: A Look to the Future", paragraphs: ["Finally, we look outward, considering the implications of what we have seen and what lies ahead."] },
                imageUrl: "https://picsum.photos/id/1043/800/600" // A view toward the horizon
            }
        ],
        observerOptions: { threshold: 0.5 },
        fadeDuration: 400
    };

    /**
     * Injects all necessary CSS into the document's head.
     */
    function injectStyles(fadeDuration) {
        const style = document.createElement('style');
        style.textContent = `
            html, body { background: transparent; }
            .scroller-section { position: relative; max-width: 650px; margin: 0 auto 100vh auto; padding: 1rem; }
            .scroller-narration { background: rgba(24, 26, 27, 0.85); backdrop-filter: blur(8px) saturate(180%); color: #f0f0f0; padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.125); }
            .scroller-heading { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: #fff; }
            .scroller-paragraph { font-size: 1.1rem; line-height: 1.6; margin: 0; }
            .sticky-chart-img { transition: opacity ${fadeDuration / 1000}s ease-in-out; }
        `;
        document.head.appendChild(style);
    }

    /**
     * Creates the sticky container and the image element.
     */
    function createStickyChart(container) {
        const chartContainer = document.createElement('div');
        Object.assign(chartContainer.style, {
            position: 'sticky', top: '0', width: '100%', height: '100vh',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: '-1', background: '#e0e0e0'
        });
        const chartImg = document.createElement('img');
        chartImg.className = 'sticky-chart-img';
        Object.assign(chartImg.style, {
            maxWidth: '90%', maxHeight: '90%', objectFit: 'cover',
            opacity: '0', borderRadius: '12px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
        });
        chartContainer.appendChild(chartImg);
        container.appendChild(chartContainer);
        return chartImg;
    }
    
    /**
     * Builds the scrollable text sections.
     */
    function buildContentSections(container, storyData) {
        storyData.forEach((scene, idx) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'scroller-section';
            sectionEl.setAttribute('data-index', idx);
            const narrationBox = document.createElement('div');
            narrationBox.className = 'scroller-narration';
            const heading = document.createElement('h2');
            heading.className = 'scroller-heading';
            heading.textContent = scene.narration.heading;
            narrationBox.appendChild(heading);
            scene.narration.paragraphs.forEach(p => {
                const para = document.createElement('p');
                para.className = 'scroller-paragraph';
                para.textContent = p;
                narrationBox.appendChild(para);
            });
            sectionEl.appendChild(narrationBox);
            container.appendChild(sectionEl);
        });
    }

    /**
     * Preloads all images to prevent loading delays during scroll.
     */
    function preloadImages(storyData) {
        for (const scene of storyData) { (new Image()).src = scene.imageUrl; }
    }

    /**
     * Main function to initialize the scroller.
     */
    function initScroller() {
        if (!('IntersectionObserver' in window)) {
            console.error("IntersectionObserver not supported.");
            return;
        }
        const container = document.getElementById('scroller-container');
        if (!container) {
            console.error("Container with id 'scroller-container' not found.");
            return;
        }

        injectStyles(config.fadeDuration);
        const chartImg = createStickyChart(container);
        buildContentSections(container, config.story);
        preloadImages(config.story); // Preload the static images

        let activeIndex = -1;

        function updateChart(newIndex) {
            if (newIndex === activeIndex) return;
            activeIndex = newIndex;

            chartImg.style.opacity = 0;

            setTimeout(() => {
                const activeScene = config.story[activeIndex];
                
                chartImg.onload = () => { 
                    chartImg.style.opacity = 1; 
                    chartImg.onload = null; 
                };
                chartImg.onerror = () => {
                    chartImg.style.opacity = 0;
                    chartImg.onerror = null;
                };

                chartImg.src = activeScene.imageUrl;

            }, config.fadeDuration / 2);
        }

        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const newIndex = parseInt(entry.target.getAttribute('data-index'));
                    updateChart(newIndex);
                    break; 
                }
            }
        }, config.observerOptions);

        document.querySelectorAll('.scroller-section').forEach(sec => observer.observe(sec));
        
        // Trigger the first image to show on load
        if (document.querySelector('.scroller-section')) {
            updateChart(0);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
