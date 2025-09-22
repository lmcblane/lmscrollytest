(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

        const sectionsData = [
            { 
                heading: "Population growth over the last decade.", 
                paragraphs: Array.from({length:12}, (_,i)=>`Lorem ipsum placeholder paragraph ${i+1} for section 1.`),
                color: "#1f77b4",
                data: [5, 10, 8, 12, 15, 20, 18]
            },
            { 
                heading: "CO2 emissions trend in major countries.", 
                paragraphs: Array.from({length:12}, (_,i)=>`Lorem ipsum placeholder paragraph ${i+1} for section 2.`),
                color: "#ff7f0e",
                data: [400, 420, 430, 450, 460, 480, 500]
            },
            { 
                heading: "Renewable energy adoption per region.", 
                paragraphs: Array.from({length:12}, (_,i)=>`Lorem ipsum placeholder paragraph ${i+1} for section 3.`),
                color: "#2ca02c",
                data: [10, 15, 20, 25, 30, 35, 40]
            }
        ];

        // --- CSS ---
        const style = document.createElement('style');
        style.textContent = `
            .section { position: relative; width: 100%; }
            .graph { position: sticky; top:0; width: 100%; height: 100vh; z-index:-1; transition: opacity 0.5s ease; }
            .text-block { position: relative; margin:0 auto; max-width:700px; padding:2rem; box-sizing:border-box; color:#000; }
            .heading { font-size:1.8rem; font-weight:bold; margin-bottom:1rem; color:#fff; background: rgba(0,0,0,0.2); padding:10px 15px; border-radius:10px; display:inline-block; }
            .paragraph { margin-bottom:1rem; }
            .spacer { height:33vh; } /* initial overlap and pause before text scroll */
        `;
        document.head.appendChild(style);

        // --- Build sections ---
        sectionsData.forEach((section, idx) => {
            const sec = document.createElement('div');
            sec.className = 'section';

            // Graph canvas
            const canvas = document.createElement('canvas');
            canvas.className = 'graph';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.opacity = idx===0 ? "1":"0";
            sec.appendChild(canvas);
            section.canvas = canvas;
            section.ctx = canvas.getContext('2d');
            drawBarChart(section.ctx, section.data, section.color, canvas.width, canvas.height);

            // Spacer for initial overlap / pause
            const spacerTop = document.createElement('div');
            spacerTop.className = 'spacer';
            sec.appendChild(spacerTop);

            // Text block
            const textBlock = document.createElement('div');
            textBlock.className = 'text-block';
            const h = document.createElement('div');
            h.className='heading';
            h.textContent = section.heading;
            textBlock.appendChild(h);
            section.paragraphs.forEach(pText=>{
                const p = document.createElement('div');
                p.className='paragraph';
                p.textContent=pText;
                textBlock.appendChild(p);
            });
            sec.appendChild(textBlock);

            // Spacer bottom for pause after text scroll
            const spacerBottom = document.createElement('div');
            spacerBottom.className='spacer';
            sec.appendChild(spacerBottom);

            container.appendChild(sec);
        });

        // --- IntersectionObserver to switch graphs ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    const section = sectionsData.find(s=>s.canvas.parentNode===entry.target.parentNode);
                    if(!section) return;
                    sectionsData.forEach(s=>{
                        s.canvas.style.opacity = (s===section) ? "1":"0";
                    });
                }
            });
        }, {threshold:[0,0.01]});

        document.querySelectorAll('.section').forEach(sec=>observer.observe(sec));

        // --- Draw bar chart ---
        function drawBarChart(ctx, data, color, width, height){
            ctx.clearRect(0,0,width,height);
            const barWidth = width/(data.length*2);
            const maxData = Math.max(...data);
            data.forEach((v,i)=>{
                const x = i*barWidth*2 + barWidth/2;
                const y = height-(v/maxData)*height*0.8;
                const h = (v/maxData)*height*0.8;
                ctx.fillStyle=color;
                ctx.fillRect(x,y,barWidth,h);
            });
        }

        window.addEventListener('resize', ()=>{
            sectionsData.forEach(section=>{
                section.canvas.width = window.innerWidth;
                section.canvas.height = window.innerHeight;
                drawBarChart(section.ctx, section.data, section.color, section.canvas.width, section.canvas.height);
            });
        });
    }

    if(document.readyState==="loading"){
        document.addEventListener("DOMContentLoaded",initScroller);
    }else{
        initScroller();
    }
})();
