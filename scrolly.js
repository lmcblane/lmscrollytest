(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

        // --- Intro Section ---
        const introSection = document.createElement('div');
        introSection.className = 'section';
        const introText = document.createElement('div');
        introText.className = 'text-block fade';
        introText.style.textAlign = 'center';
        introText.style.marginTop = '40vh';
        introText.innerHTML = `
            <div class="heading" style="font-size:2.5rem;">How is the world changing?</div>
            <div class="paragraph" style="font-size:1.5rem; margin-top:1rem;">A visual essay exploring population, emissions, and renewable energy trends.</div>
        `;
        introSection.appendChild(introText);
        container.appendChild(introSection);

        // --- Sticky chart container ---
        const chartContainer = document.createElement('div');
        chartContainer.style.position = 'sticky';
        chartContainer.style.top = '0';
        chartContainer.style.width = '100%';
        chartContainer.style.height = '100vh';
        chartContainer.style.zIndex = '-1';
        chartContainer.style.background = '#f0f0f0';
        chartContainer.style.display = 'flex';
        chartContainer.style.justifyContent = 'center';
        chartContainer.style.alignItems = 'center';
        container.appendChild(chartContainer);

        // Chart image element
        const chartImg = document.createElement('img');
        chartImg.style.maxWidth = '90%';
        chartImg.style.maxHeight = '90%';
        chartImg.style.objectFit = 'contain';
        chartImg.style.transition = 'opacity 0.5s ease';
        chartImg.style.opacity = '0';
        chartContainer.appendChild(chartImg);

        // --- Data sections ---
        const sectionsData = [
            {
                heading: "Population Growth Over the Last Decade",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                ],
                image: "https://quickchart.io/chart?c={type:'line',data:{labels:['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],datasets:[{label:'Population Growth',data:[100,105,110,115,120,125,130,135,140,145,150]}]}}"
            },
            {
                heading: "CO₂ Emissions Trend in Major Countries",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                ],
                image: "https://quickchart.io/chart?c={type:'bar',data:{labels:['USA','China','India','Russia','Japan'],datasets:[{label:'CO₂ Emissions',data:[5000,8000,3000,1500,1200]}]}}"
            },
            {
                heading: "Renewable Energy Adoption Per Region",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                ],
                image: "https://quickchart.io/chart?c={type:'pie',data:{labels:['North America','Europe','Asia','Africa','South America'],datasets:[{data:[40,30,15,10,5]}]}}"
            }
        ];

        // --- CSS ---
        const style = document.createElement('style');
        style.textContent = `
            .section { position: relative; width: 100%; }
            .text-block { position: relative; margin: 0 auto; max-width: 700px; padding: 2rem; box-sizing: border-box; color: #000; opacity: 0; transition: opacity 1s ease; }
            .text-block.visible { opacity: 1; }
            .heading { font-size: 1.8rem; font-weight: bold; margin-bottom: 1rem; color: #fff; background: rgba(0,0,0,0.2); padding: 10px 15px; border-radius: 10px; display: inline-block; }
            .paragraph { margin-bottom: 1rem; }
            .spacer { height: 50vh; }
        `;
        document.head.appendChild(style);

        // --- Build sections ---
        sectionsData.forEach((section, idx) => {
            const sec = document.createElement('div');
            sec.className = 'section';

            // Spacer top
            const spacerTop = document.createElement('div');
            spacerTop.className = 'spacer';
            sec.appendChild(spacerTop);

            // Text block
            const textBlock = document.createElement('div');
            textBlock.className = 'text-block fade';
            textBlock.setAttribute('data-index', idx);

            const heading = document.createElement('div');
            heading.className = 'heading';
            heading.textContent = section.heading;
            textBlock.appendChild(heading);

            section.paragraphs.forEach(pText => {
                const p = document.createElement('div');
                p.className = 'paragraph';
                p.textContent = pText;
                textBlock.appendChild(p);
            });

            sec.appendChild(textBlock);

            // Spacer bottom
            const spacerBottom = document.createElement('div');
            spacerBottom.className = 'spacer';
            sec.appendChild(spacerBottom);

            container.appendChild(sec);
        });

        // --- IntersectionObserver ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const idx = parseInt(entry.target.getAttribute('data-index'));
                    chartImg.src = sectionsData[idx].image;
                    chartImg.style.opacity = "1";
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.text-block').forEach(block => observer.observe(block));

        // Fade in intro text immediately
        introText.classList.add('visible');
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
