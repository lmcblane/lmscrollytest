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

        // --- Data sections ---
        const sections = [
            {
                heading: "Population Growth Over the Last Decade",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                ],
                image: "https://quickchart.io/chart?c={type:'line',data:{labels:['2010','2015','2020'],datasets:[{label:'Population',data:[100,125,150]}]}}"
            },
            {
                heading: "CO₂ Emissions Trend in Major Countries",
                paragraphs: [
                    "Emissions in major countries show varying trends over the years.",
                    "China and India are seeing rapid increases, while Europe declines."
                ],
                image: "https://quickchart.io/chart?c={type:'bar',data:{labels:['USA','China','India'],datasets:[{label:'CO₂',data:[5000,8000,3000]}]}}"
            },
            {
                heading: "Renewable Energy Adoption Per Region",
                paragraphs: [
                    "Renewables are growing fastest in Europe and North America.",
                    "Other regions are slowly catching up."
                ],
                image: "https://quickchart.io/chart?c={type:'pie',data:{labels:['Europe','North America','Asia'],datasets:[{data:[40,35,25]}]}}"
            }
        ];

        // --- CSS ---
        const style = document.createElement('style');
        style.textContent = `
            .section { max-width:700px; margin:0 auto 100px auto; }
            .heading { font-size:1.8rem; font-weight:bold; margin-bottom:0.5rem; }
            .paragraph { margin-bottom:1rem; font-size:1.2rem; line-height:1.5; }
        `;
        document.head.appendChild(style);

        // --- Build sections ---
        sections.forEach((sec, idx) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'section';
            sectionEl.setAttribute('data-index', idx);

            const heading = document.createElement('div');
            heading.className = 'heading';
            heading.textContent = sec.heading;
            sectionEl.appendChild(heading);

            sec.paragraphs.forEach(p => {
                const para = document.createElement('div');
                para.className = 'paragraph';
                para.textContent = p;
                sectionEl.appendChild(para);
            });

            container.appendChild(sectionEl);
        });

        // --- IntersectionObserver to change chart ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-index'));
                    chartImg.style.opacity = 0;
                    setTimeout(() => {
                        chartImg.src = sections[idx].image;
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
