// scrolly-test.js — minimal hosted JS test
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('scroller-container');
    if(!container) return;

    // Simple wrapper
    const wrapper = document.createElement('div');
    wrapper.style.position = "relative";
    wrapper.style.height = "200vh"; // Make page scrollable
    wrapper.style.backgroundColor = "#222"; // solid background
    container.appendChild(wrapper);

    // Static text block
    const textBlock = document.createElement('div');
    textBlock.style.position = "sticky";
    textBlock.style.top = "50%";
    textBlock.style.transform = "translateY(-50%)";
    textBlock.style.textAlign = "center";
    textBlock.style.color = "#fff";
    textBlock.style.fontSize = "24px";
    textBlock.textContent = "✅ Scrolly JS is running!";
    wrapper.appendChild(textBlock);

    // Simple scroll effect: fade background color
    window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const green = Math.min(255, Math.floor(scrollPercent * 255));
        wrapper.style.backgroundColor = `rgb(34, ${green}, 34)`;
    });

    console.log("✅ Scrolly-test JS executed successfully!");
});
