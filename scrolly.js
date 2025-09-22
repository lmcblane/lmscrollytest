// Simple test script
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('scroller-container');
    if(!container) return;

    const p = document.createElement('p');
    p.textContent = "Hello! JS is running correctly.";
    p.style.fontSize = "24px";
    p.style.color = "green";
    container.appendChild(p);
});
