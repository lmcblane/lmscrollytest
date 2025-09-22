// scrolly-visual-essay.js — Data visualization visual essay
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('scroller-container');
    if (!container) return;

    // --- Define blocks: text + data for charts ---
    const blocksData = [
        {
            text: "Population growth over the last decade.",
            data: [5, 10, 8, 12, 15, 20, 18],
            color: "#1f77b4"
        },
        {
            text: "CO2 emissions trend in major countries.",
            data: [400, 420, 430, 450, 460, 480, 500],
            color: "#ff7f0e"
        },
        {
            text: "Renewable energy adoption per region.",
            data: [10, 15, 20, 25, 30, 35, 40],
            color: "#2ca02c"
        }
    ];

    // --- Wrapper ---
    const wrapper = document.createElement('div');
    wrapper.className = 'scroller-wrapper';
    container.appendChild(wrapper);

    // --- Inject CSS ---
    const style = document.createElement('style');
    style.textContent = `
        .scroller-wrapper { position: relative; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #e6eef6; }
        .scroller-wrapper canvas { position: absolute; top:0; left:0; width:100%; height:100%; z-index:-1; transition: opacity 1s ease; }
        .scroller-wrapper .text-block { min-height:100vh; display:flex; justify-content:center; align-items:center; text-align:center; padding:2rem; box-sizing:border-box; }
        .scroller-wrapper .text-block p { max-width:700px; font-size:1.2rem; line-height:1.5; background: rgba(0,0,0,0.4); padding:20px; border-radius:12px; margin:0; }
    `;
    document.head.appendChild(style);

    // --- Create canvases for each chart ---
    blocksData.forEach((block, idx) => {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.opacity = idx === 0 ? "1" : "0";
        wrapper.appendChild(canvas);
        block.canvas = canvas;
        block.ctx = canvas.getContext('2d');

        // Draw initial chart
        drawBarChart(block.ctx, block.data, block.color, canvas.width, canvas.height);
    });

    // --- Text blocks ---
    blocksData.forEach(block => {
        const div = document.createElement('div');
        div.className = 'text-block';
        div.setAttribute('data-canvas-index', blocksData.indexOf(block));
        const p = document.createElement('p');
        p.textContent = block.text;
        div.appendChild(p);
        wrapper.appendChild(div);
    });

    // --- IntersectionObserver for canvas fade ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const index = parseInt(entry.target.getAttribute('data-canvas-index'));
                blocksData.forEach((block, i) => {
                    block.canvas.style.opacity = i === index ? "1" : "0";
                });
            }
        });
    }, { threshold: 0.3 });

    wrapper.querySelectorAll('.text-block').forEach(block => observer.observe(block));

    console.log("✅ Scrolly visual essay JS executed successfully!");

    // --- Function to draw simple bar chart ---
    function drawBarChart(ctx, data, color, width, height) {
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

    // --- Resize handler ---
    window.addEventListener('resize', () => {
        blocksData.forEach(block => {
            block.canvas.width = window.innerWidth;
            block.canvas.height = window.innerHeight;
            drawBarChart(block.ctx, block.data, block.color, block.canvas.width, block.canvas.height);
        });
    });
});
