(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

        // --- Sticky chart container ---
        const chartContainer = document.createElement('div');
        chartContainer.style.position = 'sticky';
        chartContainer.style.top = '0';
        chartContainer.style.width = '100%';
        chartContainer.style.height = '60vh';
        chartContainer.style.display = 'flex';
        chartContainer.style.justifyContent = 'center';
        chartContainer.style.alignItems = 'center';
        chartContainer.style.background = '#f0f0f0';
        chartContainer.style.zIndex = '-1';
        container.appendChild(chartContainer);

        const chartImg = document.createElement('img');
        chartImg.style.maxWidth = '90%';
        chartImg.style.maxHeight = '100%';
        chartImg.style.objectFit = 'contain';
        chartImg.style.transition = 'opacity 0.7s ease';
        chartImg.style.opacity = '0';
        chartContainer.appendChild(chartImg);

        // --- First section ---
        const section = {
            heading: "Population Growth Over the Last Decade",
            paragraphs: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            ],
            image: "https://quickchart.io/chart?c={type:'line',data:{labels:['2010','2015','2020'],datasets:[{label:'Population',data:[100,125,150]}]}}"
        };

        const sectionEl = document.createElement('div');
        sectionEl.className = 'section';
        sectionEl.setAttribute('data-index', 0);

        const heading = document.createElement('div');
        heading.className = 'heading';
        heading.textContent = section.heading;
        sectionEl.appendChild(heading);

        section.paragraphs.forEach(p => {
            const para = document.createElement('div');
            para.className = 'paragraph';
            para.textContent = p;
            sectionEl.appendChild(para);
        });

        container.appendChild(sectionEl);

        // --- CSS ---
        const style = document.createElement('style');
        style.textContent = `
            .section { max-width:700px; margin:0 auto 100px auto; }
            .heading { font-size:1.8rem; font-weight:bold; margin-bottom:0.5rem; }
            .paragraph { margin-bottom:1rem; font-size:1.2rem; line-height:1.5; }
        `;
        document.head.appendChild(style);

        // --- IntersectionObserver to show chart ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    chartImg.style.opacity = 0;
                    setTimeout(() => {
                        chartImg.src = section.image;
                        chartImg.style.opacity = 1;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.section').forEach(sec => observer.observe(sec));
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
