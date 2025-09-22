// test.js — simple script to verify JS fetching and execution
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('scroller-container');
    if(!container) return;

    const p = document.createElement('p');
    p.textContent = "✅ JS is running from GitHub-hosted file!";
    p.style.fontSize = "24px";
    p.style.color = "green";
    container.appendChild(p);
});
