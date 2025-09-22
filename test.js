function initScroller() {
    // ... (no changes to the code above this function) ...

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

    let activeIndex = -1;

    // This function will now handle the chart update logic
    function updateChart(newIndex) {
        if (newIndex === activeIndex) return;
        activeIndex = newIndex;

        // Start fading out
        chartImg.style.opacity = 0;

        // Use a short timeout to let the fade-out animation begin before swapping the source.
        // This is more robust than listening for the transitionend event.
        setTimeout(() => {
            const activeScene = config.story[activeIndex];
            const svgGenerator = chartGenerators[activeScene.chartType];
            
            if (svgGenerator) {
                const svgString = svgGenerator(activeScene.chartData);
                const encodedSvg = btoa(svgString); // Base64 encode the SVG string
                
                // The onload event ensures we only fade-in once the SVG is parsed and ready.
                chartImg.onload = () => { 
                    chartImg.style.opacity = 1; 
                    chartImg.onload = null; 
                };

                // In case of any SVG error, just stay hidden.
                chartImg.onerror = () => {
                    chartImg.style.opacity = 0;
                    chartImg.onerror = null;
                };

                chartImg.src = `data:image/svg+xml;base64,${encodedSvg}`;
            }
        }, config.fadeDuration / 2); // Wait for half the fade duration to swap
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

    // Optional: Trigger the first chart immediately on load
    const firstSection = document.querySelector('.scroller-section');
    if(firstSection) {
        updateChart(0);
    }
}
