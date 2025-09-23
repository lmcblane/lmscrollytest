<!DOCTYPE html>
<html lang="en">
<head>
    <title>Scrollytelling Test</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #0a0a0a;
            color: white;
            overflow-x: hidden;
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
</head>
<body>
    <div id="scroller-container"></div>
    
    <script>
        (function() {
            function initScroller() {
                const container = document.getElementById('scroller-container');
                if (!container) return;

                // Enhanced CSS for true scrollytelling
                const style = document.createElement('style');
                style.textContent = `
                    body { 
                        margin: 0; 
                        padding: 0; 
                        background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
                        min-height: 100vh;
                    }
                    
                    #scroller-container {
                        position: relative;
                        width: 100%;
                    }
                    
                    /* Hero section */
                    .hero-section {
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: radial-gradient(circle at center, rgba(29, 78, 216, 0.15) 0%, transparent 70%);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .hero-section::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                        opacity: 0.5;
                        animation: float 20s ease-in-out infinite;
                    }
                    
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-10px) rotate(180deg); }
                    }
                    
                    .hero-title {
                        font-size: clamp(3rem, 8vw, 6rem);
                        font-weight: 900;
                        text-align: center;
                        margin-bottom: 2rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        opacity: 0;
                        transform: translateY(50px);
                        animation: fadeInUp 1s ease-out 0.5s forwards;
                    }
                    
                    .hero-subtitle {
                        font-size: clamp(1.2rem, 3vw, 1.8rem);
                        text-align: center;
                        color: rgba(255, 255, 255, 0.8);
                        max-width: 600px;
                        line-height: 1.6;
                        opacity: 0;
                        transform: translateY(30px);
                        animation: fadeInUp 1s ease-out 1s forwards;
                    }
                    
                    @keyframes fadeInUp {
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    /* Scrollytelling sections */
                    .story-section {
                        position: relative;
                        min-height: 200vh;
                    }
                    
                    /* True sticky visualization */
                    .viz-sticky {
                        position: sticky;
                        top: 0;
                        height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1;
                    }
                    
                    .viz-container {
                        width: 90%;
                        max-width: 800px;
                        height: 70vh;
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        padding: 2rem;
                        opacity: 0;
                        transform: scale(0.8) translateY(50px);
                        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    
                    .viz-container.visible {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                    
                    .viz-title {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: white;
                        margin-bottom: 1rem;
                        text-align: center;
                    }
                    
                    .chart-container {
                        position: relative;
                        height: calc(100% - 3rem);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    canvas {
                        max-width: 100% !important;
                        max-height: 100% !important;
                    }
                    
                    /* Story content that scrolls over sticky viz */
                    .story-content {
                        position: relative;
                        z-index: 2;
                        padding-top: 50vh;
                    }
                    
                    .story-step {
                        margin: 50vh 0;
                        display: flex;
                        justify-content: flex-end;
                        padding: 0 5%;
                    }
                    
                    .story-step:nth-child(even) {
                        justify-content: flex-start;
                    }
                    
                    .step-content {
                        max-width: 450px;
                        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
                        backdrop-filter: blur(30px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 20px;
                        padding: 2.5rem;
                        opacity: 0;
                        transform: translateX(100px);
                        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    }
                    
                    .story-step:nth-child(even) .step-content {
                        transform: translateX(-100px);
                    }
                    
                    .step-content.visible {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    
                    .step-number {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        border-radius: 50%;
                        text-align: center;
                        line-height: 40px;
                        font-weight: 700;
                        margin-bottom: 1.5rem;
                        font-size: 1.1rem;
                    }
                    
                    .step-title {
                        font-size: 1.4rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        color: white;
                        line-height: 1.3;
                    }
                    
                    .step-text {
                        color: rgba(255, 255, 255, 0.8);
                        line-height: 1.6;
                        font-size: 1.05rem;
                    }
                    
                    /* Transition zones */
                    .transition-zone {
                        height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .transition-zone::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
                        animation: rotate 30s linear infinite;
                    }
                    
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    
                    .transition-text {
                        font-size: 2rem;
                        font-weight: 700;
                        text-align: center;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        z-index: 1;
                        position: relative;
                    }
                    
                    /* Final section */
                    .conclusion {
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);
                        padding: 4rem 2rem;
                    }
                    
                    .conclusion-title {
                        font-size: 3rem;
                        font-weight: 900;
                        margin-bottom: 2rem;
                        color: white;
                    }
                    
                    .conclusion-text {
                        font-size: 1.3rem;
                        color: rgba(255, 255, 255, 0.9);
                        max-width: 700px;
                        line-height: 1.6;
                        margin-bottom: 3rem;
                    }
                    
                    /* Mobile responsiveness */
                    @media (max-width: 768px) {
                        .viz-container {
                            width: 95%;
                            padding: 1.5rem;
                            height: 60vh;
                        }
                        
                        .story-step {
                            justify-content: center !important;
                            padding: 0 1rem;
                            margin: 30vh 0;
                        }
                        
                        .step-content {
                            max-width: 100%;
                            padding: 2rem;
                            transform: translateY(50px) !important;
                        }
                        
                        .step-content.visible {
                            transform: translateY(0) !important;
                        }
                    }
                `;
                document.head.appendChild(style);

                // Hero section
                const heroSection = document.createElement('div');
                heroSection.className = 'hero-section';
                heroSection.innerHTML = `
                    <h1 class="hero-title">The World in Motion</h1>
                    <p class="hero-subtitle">A data-driven journey through population growth, carbon emissions, and the renewable energy revolution</p>
                `;
                container.appendChild(heroSection);

                // Story data with chart configurations
                const storyData = [
                    {
                        title: "Global Population Surge",
                        chartType: 'line',
                        chartData: {
                            labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2030'],
                            datasets: [{
                                label: 'World Population (Billions)',
                                data: [2.5, 3.0, 3.7, 4.4, 5.3, 6.1, 6.9, 7.8, 8.5],
                                borderColor: '#667eea',
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                borderWidth: 4,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#764ba2',
                                pointBorderWidth: 2,
                                pointRadius: 6
                            }]
                        },
                        steps: [
                            {
                                title: "The Population Explosion",
                                text: "In 1950, the world population was just 2.5 billion people. Today, we've more than tripled that number, crossing 8 billion in 2022."
                            },
                            {
                                title: "Accelerating Growth",
                                text: "The most dramatic growth occurred between 1950-2000, adding nearly 4 billion people in just 50 years - more than had ever existed before."
                            },
                            {
                                title: "Future Projections",
                                text: "By 2030, we're expected to reach 8.5 billion. However, growth rates are slowing as fertility rates decline globally."
                            }
                        ]
                    },
                    {
                        title: "Carbon Emissions Crisis",
                        chartType: 'bar',
                        chartData: {
                            labels: ['China', 'United States', 'India', 'Russia', 'Japan', 'Germany'],
                            datasets: [{
                                label: 'CO₂ Emissions (Billion Tons)',
                                data: [10.1, 5.4, 2.7, 1.8, 1.2, 0.8],
                                backgroundColor: [
                                    'rgba(239, 68, 68, 0.8)',
                                    'rgba(245, 101, 101, 0.8)',
                                    'rgba(252, 165, 165, 0.8)',
                                    'rgba(254, 202, 202, 0.8)',
                                    'rgba(254, 226, 226, 0.8)',
                                    'rgba(255, 245, 245, 0.8)'
                                ],
                                borderColor: '#dc2626',
                                borderWidth: 2,
                                borderRadius: 8
                            }]
                        },
                        steps: [
                            {
                                title: "China Leads Emissions",
                                text: "China produces over 10 billion tons of CO₂ annually - nearly double the United States and more than the next 4 countries combined."
                            },
                            {
                                title: "The Big Six",
                                text: "Just six countries account for over 60% of global carbon emissions, highlighting the concentrated nature of this challenge."
                            },
                            {
                                title: "Per Capita Reality",
                                text: "While China leads in total emissions, per capita emissions tell a different story - Americans produce twice as much CO₂ per person."
                            }
                        ]
                    },
                    {
                        title: "Renewable Energy Revolution",
                        chartType: 'doughnut',
                        chartData: {
                            labels: ['Solar', 'Wind', 'Hydro', 'Nuclear', 'Biomass', 'Geothermal'],
                            datasets: [{
                                data: [28, 26, 16, 10, 13, 7],
                                backgroundColor: [
                                    '#f59e0b',
                                    '#06b6d4',
                                    '#3b82f6',
                                    '#8b5cf6',
                                    '#10b981',
                                    '#ef4444'
                                ],
                                borderWidth: 3,
                                borderColor: '#1f2937',
                                hoverBorderWidth: 5
                            }]
                        },
                        steps: [
                            {
                                title: "Solar Takes the Lead",
                                text: "Solar power now accounts for 28% of new renewable capacity, becoming the fastest-growing energy source in human history."
                            },
                            {
                                title: "Wind Power Rising",
                                text: "Wind energy is close behind at 26%, with massive offshore wind farms transforming coastlines around the world."
                            },
                            {
                                title: "The Clean Transition",
                                text: "Together, renewables now account for over 30% of global electricity generation, with costs plummeting every year."
                            }
                        ]
                    }
                ];

                // Create story sections
                storyData.forEach((story, index) => {
                    // Story section
                    const storySection = document.createElement('div');
                    storySection.className = 'story-section';

                    // Sticky visualization
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

                    // Story content
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

                    // Add transition zone between sections
                    if (index < storyData.length - 1) {
                        const transitionZone = document.createElement('div');
                        transitionZone.className = 'transition-zone';
                        transitionZone.innerHTML = `
                            <div class="transition-text">Next: ${storyData[index + 1].title}</div>
                        `;
                        container.appendChild(transitionZone);
                    }
                });

                // Conclusion
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

                // Create charts after DOM is ready
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

                // Intersection Observer for animations
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

                // Observe all animated elements
                setTimeout(() => {
                    document.querySelectorAll('.viz-container, .step-content').forEach(el => {
                        observer.observe(el);
                    });
                }, 500);
            }

            // Initialize when DOM is ready
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initScroller);
            } else {
                initScroller();
            }
        })();
    </script>
</body>
</html>
