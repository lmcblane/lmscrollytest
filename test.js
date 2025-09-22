(function() {
    /**
     * The Story's Configuration.
     * This object acts as the "script" for our visual essay.
     */
    const config = {
        story: [
            {
                narration: {
                    heading: "The Silent Fading",
                    paragraphs: ["Over the last fifty years, the celestial oceans have grown quiet. The majestic Sky-Whales, once countless, are now a rare and fleeting sight."]
                },
                chartUrl: "https://quickchart.io/chart?c={type:'line',data:{labels:[1975,1985,1995,2005,2025],datasets:[{label:'Global Sky-Whale Population (in thousands)',data:[85,72,55,30,12],fill:true,borderColor:'rgb(75, 192, 192)',backgroundColor:'rgba(75, 192, 192, 0.2)'}]}}"
            },
            {
                narration: {
                    heading: "A Vanishing Feast",
                    paragraphs: ["Our research points to a single, devastating cause: the collapse of their primary food source, the Aether-Plankton.", "The depletion is not uniform, with the Northern Celestial Gyre showing the most catastrophic losses."]
                },
                chartUrl: "https://quickchart.io/chart?c={type:'bar',data:{labels:['Northern Gyre','Southern Belt','Equatorial Stream'],datasets:[{label:'Aether-Plankton Depletion (%)',data:[82,45,28],backgroundColor:['rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)']}]}}"
            },
            {
                narration: {
                    heading: "A Perilous Journey",
                    paragraphs: ["This is the crux of the crisis. The Sky-Whales' ancient migration routes now pass directly through the most barren, plankton-depleted zones.", "They are, in essence, journeying through vast cosmic deserts."]
                },
                chartUrl: "https://quickchart.io/chart?v=2.9.4&c={type:'scatter',data:{datasets:[{label:'Migration Route',data:[{x:10,y:80},{x:20,y:75},{x:30,y:60},{x:40,y:40},{x:50,y:20},{x:60,y:22}],borderColor:'blue',fill:false,showLine:true},{label:'Plankton Dead Zone',data:[{x:35,y:55},{x:40,y:48},{x:45,y:40},{x:50,y:30}],backgroundColor:'rgba(255,99,132,0.5)',pointRadius:15}]},options:{plugins:{annotation:{annotations:[{type:'box',xMin:35,xMax:50,yMin:25,yMax:60,backgroundColor:'rgba(255,99,132,0.25)',borderColor:'red'},{type:'label',content:'Fatal Overlap',xValue:52,yValue:50,font:{size:14},color:'red'}]}}}}"
            },
            {
                narration: {
                    heading: "An Echo in the Void",
                    paragraphs: ["Without their sustenance, the Sky-Whales' journey has become a silent march toward extinction.", "Understanding this perilous intersection is the first step toward charting a new course for their survival."]
                },
                chartUrl: "https://quickchart.io/chart?c={type:'doughnut',data:{labels:['Extant Population','Lost Population'],datasets:[{data:[12,88],backgroundColor:['rgb(75, 192, 192)','rgba(0,0,0,0.1)']}]},options:{plugins:{doughnutlabel:{labels:[{text:'12%',font:{size:20}},{text:'Remaining'}]}}}}"
            }
        ],
        observerOptions: { threshold: 0.5 },
        fadeDuration: 400
    };

    /**
     * Injects all necessary CSS into the document's head, including the fix.
     */
    function injectStyles(fadeDuration) {
        const style = document.createElement('style');
        style.textContent = `
            /* ✅ FIX: Ensures the chart is visible behind the text. */
            html, body {
                background: transparent;
            }

            .scroller-section { 
                position: relative; 
                max-width: 650px; 
                margin: 0 auto 100vh auto; 
                padding: 1rem;
            }
            .scroller-narration {
                background: rgba(24, 26, 27, 0.85);
                backdrop-filter: blur(8px) saturate(180%);
                color: #f0f0f0;
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.125);
            }
            .scroller-heading { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: #fff; }
            .scroller-paragraph { font-size: 1.1rem; line-height: 1.6; margin: 0; }
            .sticky-chart-img {
                transition: opacity ${fadeDuration / 1000}s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Creates the sticky container and the image element for the chart.
     */
    function createStickyChart(container) {
        const chartContainer = document.createElement('div');
        Object.assign(chartContainer.style, {
            position: 'sticky', top: '0', width: '100%', height: '100vh',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: '-1', background: '#f0f0f0'
        });
        const chartImg = document.createElement('img');
        chartImg.className = 'sticky-chart-img';
        Object.assign(chartImg.style, {
            maxWidth: '85%', maxHeight: '85%', objectFit: 'contain',
            opacity: '0', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
        });
        chartContainer.appendChild(chartImg);
        container.appendChild(chartContainer);
        return chartImg;
    }
    
    /**
     * Builds the scrollable text sections from the story data.
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
     * Preloads all chart images to prevent loading delays.
     */
    function preloadImages(storyData) {
        for (const scene of storyData) { (new Image()).src = scene.chartUrl; }
    }

    /**
     * Main function to initialize the scroller.
     */
    function initScroller() {
        if (!('IntersectionObserver' in window)) {
            console.error("IntersectionObserver not supported. Scrollytelling will not work.");
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
        preloadImages(config.story);

        let activeIndex = -1;
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const newIndex = parseInt(entry.target.getAttribute('data-index'));
                    if (newIndex === activeIndex) break;
                    activeIndex = newIndex;
                    
                    const handleTransitionEnd = () => {
                        chartImg.onerror = () => { chartImg.style.opacity = 0; chartImg.onerror = null; };
                        chartImg.onload = () => { chartImg.style.opacity = 1; chartImg.onload = null; };
                        chartImg.src = config.story[activeIndex].chartUrl;
                    };
                    
                    chartImg.style.opacity = 0;
                    chartImg.addEventListener('transitionend', handleTransitionEnd, { once: true });
                    break; 
                }
            }
        }, config.observerOptions);

        document.querySelectorAll('.scroller-section').forEach(sec => observer.observe(sec));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
