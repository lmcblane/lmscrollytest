(function() {
  // --- Configuration: text blocks and background URLs ---
  const blocksData = [
    { text: "Early Light — A quiet, blue morning.", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
    { text: "Clouds Gather — Movement and color shift.", bg: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80" },
    { text: "Climax — Powerful waves crash dramatically.", bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" },
    { text: "Reflection — A moment to breathe.", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" }
  ];

  const container = document.getElementById('scroller-container');
  if(!container) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'scroller-wrapper';
  container.appendChild(wrapper);

  // --- Inject CSS ---
  const style = document.createElement('style');
  style.textContent = `
    .scroller-wrapper { position: relative; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #e6eef6; }
    .scroller-wrapper .background { position: absolute; top:0; left:0; width:100%; height:100%; background-size:cover; background-position:center; z-index:-1; opacity:1; transition:opacity 1s ease, background-image 0.6s ease; }
    .scroller-wrapper .text-block { min-height:100vh; display:flex; justify-content:center; align-items:center; text-align:center; padding:2rem; box-sizing:border-box; }
    .scroller-wrapper .text-block p { max-width:700px; font-size:1.2rem; line-height:1.5; background: rgba(0,0,0,0.4); padding:20px; border-radius:12px; margin:0; }
  `;
  document.head.appendChild(style);

  // --- Background div ---
  const bgDiv = document.createElement('div');
  bgDiv.className = 'background';
  bgDiv.style.backgroundImage = `url('${blocksData[0].bg}')`;
  wrapper.appendChild(bgDiv);

  // --- Text blocks ---
  blocksData.forEach(block => {
    const div = document.createElement('div');
    div.className = 'text-block';
    div.setAttribute('data-bg', block.bg);
    const p = document.createElement('p');
    p.textContent = block.text;
    div.appendChild(p);
    wrapper.appendChild(div);
  });

  // --- Helper to normalize background URL ---
  function getCurrentBg() {
    return bgDiv.style.backgroundImage.replace(/url\(["']?|["']?\)/g,'');
  }

  // --- IntersectionObserver for fading ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const newBg = entry.target.getAttribute('data-bg');
        if(newBg && newBg !== getCurrentBg()){
          bgDiv.style.opacity = 0;
          setTimeout(() => {
            bgDiv.style.backgroundImage = `url('${newBg}')`;
            bgDiv.style.opacity = 1;
          }, 200);
        }
      }
    });
  }, { threshold: 0 });

  wrapper.querySelectorAll('.text-block').forEach(block => observer.observe(block));
})();
