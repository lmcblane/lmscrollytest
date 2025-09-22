// scrollytelling.js

// Create a container for the story
const container = document.createElement('div');
container.style.width = '100%';
container.style.maxWidth = '800px';
container.style.margin = '0 auto';
container.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(container);

// Define the scrollytelling sections
const sections = [
    { text: 'Welcome to our scrollytelling example!', color: '#ffadad' },
    { text: 'As you scroll, content will change dynamically.', color: '#ffd6a5' },
    { text: 'You can highlight important points this way.', color: '#fdffb6' },
    { text: 'End of the story. Thanks for scrolling!', color: '#caffbf' }
];

// Create content and attach to DOM
sections.forEach((section, index) => {
    const div = document.createElement('div');
    div.textContent = section.text;
    div.style.height = '100vh'; // Full viewport height for scroll effect
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.fontSize = '2em';
    div.style.transition = 'background-color 0.5s';
    div.style.backgroundColor = '#ffffff';
    div.dataset.color = section.color;
    container.appendChild(div);
});

// Intersection Observer for scrollytelling effect
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundColor = entry.target.dataset.color;
            } else {
                entry.target.style.backgroundColor = '#ffffff';
            }
        });
    },
    { threshold: 0.5 } // Trigger when 50% of section is visible
);

// Observe all sections
document.querySelectorAll('div[data-color]').forEach(section => observer.observe(section));
