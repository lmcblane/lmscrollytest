// scrolly-sticky-paragraphs-fixed.js — GN4-safe sticky charts with black paragraphs
(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

        const blocksData = [
            { heading: "Population growth over the last decade.", data: [5, 10, 8, 12, 15, 20, 18], color: "#1f77b4" },
            { heading: "CO2 emissions trend in major countries.", data: [400, 420, 430, 450, 460, 480, 500], color: "#ff7f0e" },
            { heading: "Renewable energy adoption per region.", data: [10, 15, 20, 25, 30, 35, 40], color: "#2ca02c" }
        ];

        const wrapper = document.createElement('div');
        wrapper.className = 'scroller-wrapper';
        container.appendChild(wrapper);

        // CSS
        const style = document.createElement('style');
        style.textContent = `
            .scroller-wrapper { position: relative; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; line-height:1.6; padding:0 2rem; color: #000; }
            .scroller-wrapper canvas { position: sticky; top: 0; left: 0; width: 100%; height: 100vh; z-index: -1; transition: opacity 1s ease; }
            .heading-block { text-align: center; margin: 40px 0; font-size: 1.5rem; font-weight: bold; background: rgba(0,0,0,0.2); padding:20px; border-radius:12px; display:inline-block; color:#fff; }
            .scroller-wrapper p { max-width: 700px; margin: 16px auto; color: #000; }
        `;
        document.head.appendChild(style);

        // Create canvases
        blocksData.forEach((block, idx) => {
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.opacity = idx === 0 ? "1" : "0";
            wrapper.appendChild(canvas);
            block.canvas = canvas;
            block.ctx = canvas.getContext('2d');
            drawBarChart(block.ctx, block.data, block.color, canvas.width, canvas.height);
        });

        // Add heading + paragraph filler text wrapped in divs
        blocksData.forEach((block, idx) => {
            // Heading block
            const headingDiv = document.createElement('div');
            headingDiv.className = 'heading-block';
            headingDiv.setAttribute('data-canvas-index', idx);
            headingDiv.textContent = block.heading;
            wrapper.appendChild(headingDiv);

            // Filler paragraphs wrapped in divs for observer
            for (let i = 1; i <= 12; i++) {
                const paraWrapper = document.createElement('div'); // wrapper div, no background
                paraWrapper.setAttribute('data-canvas-index', idx);
                const p = document.createElement('p');
                p.textContent = `Lorem ipsum placeholder paragraph ${i} for section ${idx+1}.`;
                paraWrapper.appendChild(p);
                wrapper.appendChild(paraWrapper);
            }
        });

        // IntersectionObserver to switch canvas
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const index = parseInt(entry.target.getAttribute('data-canvas-index'));
                    blocksData.forEach((block, i) => {
                        block.canvas.style.opacity = i === index ? "1" : "0";
                    });
                }
            });
        }, { threshold: 0.3 });

        wrapper.querySelectorAll('[data-canvas-index]').forEach(el => observer.observe(el));

        console.log("✅ Sticky visual essay with black paragraph wrappers executed!");

        // Draw bar chart
        function drawBarChart(ctx, data, color, width, height){
            ctx.clearRect(0, 0, width, height);
            const barWidth = width / (data.length * 2);
            const maxData = Math.max(...data);
            data.forEach((value, i) => {
                const x = i * barWidth * 2 + barWidth / 2;
                const y = height - (value / maxData) * height * 0.8;
                const barHeight = (value / maxData) * height * 0.8;
                ctx.fillStyle = color;
                ctx.fillRect(x, y, barWidth, barHeight);
            });
        }

        window.addEventListener('resize', () => {
            blocksData.forEach(block => {
                block.canvas.width = window.innerWidth;
                block.canvas.height = window.innerHeight;
                drawBarChart(block.ctx, block.data, block.color, block.canvas.width, block.canvas.height);
            });
        });
    }

    // Ensure it runs even if DOMContentLoaded has fired
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
