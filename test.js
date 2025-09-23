(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

        // Intro section (title + subhead)
        const introSection = document.createElement('div');
        introSection.className = 'section intro-section';

        const introText = document.createElement('div');
        introText.className = 'text-block fade';
        introText.style.textAlign = 'center';
        introText.style.marginTop = '30vh';
        introText.style.marginBottom = '20vh'; // Add bottom margin
        introText.innerHTML = `
            <div class="heading" style="font-size:2.5rem;">How is the world changing?</div>
            <div class="paragraph" style="font-size:1.5rem; margin-top:2rem;">A visual essay exploring population, emissions, and renewable energy trends.</div>
        `;
        introSection.appendChild(introText);
        container.appendChild(introSection);

        // Data sections
        const sectionsData = [
            {
                heading: "Population Growth Over the Last Decade",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                ],
                image: "https://quickchart.io/chart?c={type:'line',data:{labels:['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],datasets:[{label:'Population Growth',data:[100,105,110,115,120,125,130,135,140,145,150]}]}}"
            },
            {
                heading: "CO₂ Emissions Trend in Major Countries",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                ],
                image: "https://quickchart.io/chart?c={type:'bar',data:{labels:['USA','China','India','Russia','Japan'],datasets:[{label:'CO₂ Emissions',data:[5000,8000,3000,1500,1200]}]}}"
            },
            {
                heading: "Renewable Energy Adoption Per Region",
                paragraphs: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                ],
                image: "https://quickchart.io/chart?c={type:'pie',data:{labels:['North America','Europe','Asia','Africa','South America'],datasets:[{data:[40,30,15,10,5]}]}}"
            }
        ];

        // --- IMPROVED CSS ---
        const style = document.createElement('style');
        style.textContent = `
            body { margin: 0; padding: 0; }
            
            .section { 
                position: relative; 
                width: 100%; 
                margin-bottom: 15vh; /* Add space between sections */
            }
            
            .intro-section {
                margin-bottom: 25vh; /* Extra space after intro */
            }
            
            .sticky-image { 
                position: sticky; 
                top: 0; 
                width: 100%; 
                height: 100vh; 
                object-fit: cover; 
                z-index: -1; 
                transition: opacity 0.5s ease; 
                opacity: 0; 
            }
            
            .text-block { 
                position: relative; 
                margin: 4rem auto; /* Increased vertical margins */
                max-width: 700px; 
                padding: 3rem 2rem; /* Increased padding */
                box-sizing: border-box; 
                color: #000; 
                opacity: 0; 
                transition: opacity 1s ease;
                background: rgba(255, 255, 255, 0.95); /* Better readability */
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .text-block.visible { opacity: 1; }
            
            .heading { 
                font-size: 1.8rem; 
                font-weight: bold; 
                margin-bottom: 2rem; /* Increased spacing */
                color: #333; 
                line-height: 1.3;
            }
            
            .paragraph { 
                margin-bottom: 1.5rem; /* Increased paragraph spacing */
                line-height: 1.6; /* Better line height */
                color: #555;
                font-size: 1.1rem;
            }
            
            .paragraph:last-child {
                margin-bottom: 0;
            }
            
            .spacer { 
                height: 50vh; /* Increased spacer height */
            }
            
            .section:last-child .spacer:last-child {
                height: 80vh; /* Extra space at the end */
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .text-block {
                    margin: 2rem auto;
                    padding: 2rem 1.5rem;
                }
                
                .heading {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .spacer {
                    height: 30vh;
                }
            }
        `;
        document.head.appendChild(style);

        // --- Build data sections ---
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

            // Spacer top (increased)
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

            // Spacer bottom (increased)
            const spacerBottom = document.createElement('div');
            spacerBottom.className = 'spacer';
            sec.appendChild(spacerBottom);

            container.appendChild(sec);
        });

        // --- IntersectionObserver ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-index'));
                    // Fade in the image
                    sectionsData.forEach((section, i) => {
                        section.img.style.opacity = (i === idx) ? "1" : "0";
                    });
                    // Fade in the text
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
