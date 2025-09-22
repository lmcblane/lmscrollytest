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
        introText.style.marginTop = '20vh'; // appear sooner
        introText.innerHTML = `
            <div class="heading" style="font-size:2.5rem;">How is the world changing?</div>
            <div class="paragraph" style="font-size:1.5rem; margin-top:1rem;">A visual essay exploring population, emissions, and renewable energy trends.</div>
        `;
        introSection.appendChild(introText);
        container.appendChild(introSection);

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
            .sticky-image { position: sticky; top: 0; width: 100%; height: 100vh; object-fit: cover; z-index: -1; transition: opacity 0.7s ease; opacity: 0; }
            .text-block { position: relative; margin: 0 auto; max-width: 700px; padding: 2rem; box-sizing: border-box; color: #000; opacity: 0; transition: opacity 1s ease; }
            .text-block.visible { opacity: 1; }
            .heading { font-size: 1.8rem; font-weight: bold; margin-bottom: 1rem; color: #fff; background: rgba(0,0,0,0.2); padding: 10px 15px; border-radius: 10px; display: inline-block; }
            .paragraph { margin-bottom: 1rem; }
            .spacer { height: 80vh; } /* main scroll length for text */
            .pause-top { height: 50vh; } /* pause before text scrolls */
            .pause-bottom { height: 30vh; } /* pause after text ends before next chart */
        `;
        document.head.appendChild(style);

        // --- Build sections ---
        sectionsData.forEach((section, idx) => {
            const sec = document.createElement('div');
            sec.className = 'section';

            // Sticky image
            const img = document.createElement('img');
            img.className = 'sticky-image';
            img.src = section.image;
            img.style.opacity = "0";
            sec.appendChild(img);
            section.img = img;

            // Pause before text scroll
            const pauseTop = document.createElement('div');
            pauseTop.className = 'pause-top';
            sec.appendChild(pauseTop);

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

            // Main scrolling spacer for text
            const spacer = document.createElement('div');
            spacer.className = 'spacer';
            sec.appendChild(spacer);

            // Pause after text ends
            const pauseBottom = document.createElement('div');
            pauseBottom.className = 'pause-bottom';
            sec.appendChild(pauseBottom);

            container.appendChild(sec);
        });

        // --- IntersectionObserver for text blocks and chart fade ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const idx = parseInt(entry.target.getAttribute('data-index'));
                    sectionsData.forEach((section, i) => {
                        if(i === idx){
                            section.img.style.opacity = "1"; // fade in current chart
                        } else {
                            section.img.style.opacity = "0"; // fade out others
                        }
                    });
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });

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
