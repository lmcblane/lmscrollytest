(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

        // --- Inject CSS dynamically ---
        const style = document.createElement('style');
        style.textContent = `/* ALL your CSS from the style.textContent block here */`;
        document.head.appendChild(style);

        // --- Hero section ---
        const heroSection = document.createElement('div');
        heroSection.className = 'hero-section';
        heroSection.innerHTML = `
            <h1 class="hero-title">The World in Motion</h1>
            <p class="hero-subtitle">A data-driven journey through population growth, carbon emissions, and the renewable energy revolution</p>
        `;
        container.appendChild(heroSection);

        // --- Story data and sections ---
        const storyData = [/* ... the full storyData array with charts and steps ... */];

        storyData.forEach((story, index) => {
            const storySection = document.createElement('div');
            storySection.className = 'story-section';

            const stickyViz = document.createElement('div');
            stickyViz.className = 'viz-sticky';

            const vizContainer = document.createElement('div');
            vizContainer.className = 'viz-container';
            vizContainer.innerHTML = `
                <div class="viz-title">${story.title}</div>
                <div class="chart-container">
                    <canvas id="chart-${index}"></canvas>
                </div>
            `;

            stickyViz.appendChild(vizContainer);
            storySection.appendChild(stickyViz);

            const storyContent = document.createElement('div');
            storyContent.className = 'story-content';

            story.steps.forEach((step, stepIndex) => {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'story-step';
                stepDiv.innerHTML = `
                    <div class="step-content">
                        <div class="step-number">${stepIndex + 1}</div>
                        <h3 class="step-title">${step.title}</h3>
                        <p class="step-text">${step.text}</p>
                    </div>
                `;
                storyContent.appendChild(stepDiv);
            });

            storySection.appendChild(storyContent);
            container.appendChild(storySection);

            if (index < storyData.length - 1) {
                const transitionZone = document.createElement('div');
                transitionZone.className = 'transition-zone';
                transitionZone.innerHTML = `
                    <div class="transition-text">Next: ${storyData[index + 1].title}</div>
                `;
                container.appendChild(transitionZone);
            }
        });

        // --- Conclusion ---
        const conclusion = document.createElement('div');
        conclusion.className = 'conclusion';
        conclusion.innerHTML = `
            <h2 class="conclusion-title">The Path Forward</h2>
            <p class="conclusion-text">
                As our population grows and climate challenges intensify, the renewable energy revolution offers hope. 
                The data shows we're at a critical inflection point where clean technology is becoming unstoppable.
            </p>
        `;
        container.appendChild(conclusion);

        // --- Build charts ---
        setTimeout(() => {
            storyData.forEach((story, index) => {
                const ctx = document.getElementById(`chart-${index}`);
                if (ctx) {
                    new Chart(ctx, {
                        type: story.chartType,
                        data: story.chartData,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                        font: { size: 14 }
                                    }
                                }
                            },
                            scales: story.chartType !== 'doughnut' ? {
                                x: {
                                    ticks: { color: 'rgba(255,255,255,0.7)' },
                                    grid: { color: 'rgba(255,255,255,0.1)' }
                                },
                                y: {
                                    ticks: { color: 'rgba(255,255,255,0.7)' },
                                    grid: { color: 'rgba(255,255,255,0.1)' }
                                }
                            } : {}
                        }
                    });
                }
            });
        }, 100);

        // --- Intersection Observer for animations ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
        });

        setTimeout(() => {
            document.querySelectorAll('.viz-container, .step-content').forEach(el => {
                observer.observe(el);
            });
        }, 500);
    }

    // Init when DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
