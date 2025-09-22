(function() {
    function initScroller() {
        const container = document.getElementById('scroller-container');
        if (!container) return;

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
                image: "https://www.datawrapper.de/_/2Pq0P/"
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
                image: "https://www.datawrapper.de/_/3Qw8J/"
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
                image: "https://www.datawrapper.de/_/4Xy9Z/"
            }
        ];

        // --- CSS ---
        const style = document.createElement('style');
        style.textContent = `
            .section { position: relative; width: 100%; }
            .sticky-image { position: sticky; top: 0; width: 100%; height: 100vh; object-fit: cover; z-index: -1; transition: opacity 0.5s ease; }
            .text-block { position: relative; margin: 0 auto; max-width: 700px; padding: 2rem; box-sizing: border-box; color: #000; }
            .heading { font-size: 1.8rem; font-weight: bold; margin-bottom: 1rem; color: #fff; background: rgba(0, 0, 0, 0.2); padding: 10px 15px; border-radius: 10px; display: inline-block; }
            .paragraph { margin-bottom: 1rem; }
            .spacer { height: 33vh; } /* initial overlap / pause before text scroll */
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
            img.style.opacity = idx === 0 ? "1" : "0";
            sec.appendChild(img);
            section.img = img;

            // Spacer top
            const spacerTop = document.createElement('div');
            spacerTop.className = 'spacer';
            sec.appendChild(spacerTop);

            // Text block
            const textBlock = document.createElement('div');
            textBlock.className = 'text-block';
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
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-index'));
                    sectionsData.forEach((section, i) => {
                        section.img.style.opacity = (i === idx) ? "1" : "0";
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.text-block').forEach(block => observer.observe(block));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScroller);
    } else {
        initScroller();
    }
})();
