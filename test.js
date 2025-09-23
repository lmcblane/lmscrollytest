(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

        // Inject CSS (SVG background removed to avoid XML parse errors)
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

            /* removed .hero-section::before with SVG background */

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

            /* (rest of your CSS unchanged) */
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

        // (rest of your JS logic unchanged: storyData, charts, observer, etc.)
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
