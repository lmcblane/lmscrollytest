// scrolly-sticky-fixed.js — sticky canvases stacked behind text, first text visible immediately
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

        // --- CSS ---
        const style = document.createElement('style');
        style.textContent = `
            .scroller-wrapper { 
                position: relative; 
                font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; 
                line-height:1.6; 
                padding: 0 2rem; 
                color: #000; 
            }
            .scroller-wrapper canvas { 
                position: sticky; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100vh; 
                z-index: -1; 
                transition: opacity 1s ease; 
            }
            .heading-block { 
                text-align: center; 
                margin: 0px 0 10px 0; 
                font-size: 1.5rem; 
                font-weight: bold; 
                background: rgba(0,0,0,0.2); 
                padding: 15px; 
                border-radius:12px; 
                display:inline-block; 
                color:#fff; 
            }
            .scroller-wrapper p { 
                max-width: 700px; 
                margin: 8px auto; 
                color: #000; 
            }
        `;
        document.head.appendChild(style);

        // --- Create all sticky canvases at the top ---
        blocksData.forEach((block, idx) => {
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.opacity = idx === 0 ? "1" : "0"; // first canvas visible immediately
            wrapper.appendChild(canvas);
            block.canvas = canvas;
            block.ctx = canvas.getContext('2d')
