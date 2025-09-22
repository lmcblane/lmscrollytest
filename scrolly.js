(function() {
  // Panel data
  const panelsData = [
    {
      title: "Early Light",
      text: "A quiet, blue morning. The sea is calm and the story begins.",
      color: "#0f1724",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Clouds Gather",
      text: "Movement and color shift. Tension builds as clouds roll in.",
      color: "#1e293b",
      img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Climax",
      text: "Powerful waves crash dramatically — the peak moment.",
      color: "#334155",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Reflection",
      text: "A moment to breathe. The story slows and invites reflection.",
      color: "#0f1724",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Find wrapper
  const wrapper = document.querySelector('.scroller-wrapper');
  if (!wrapper) return;

  // Add panels
  panelsData.forEach(panel => {
    const div = document.createElement('div');
    div.className = 'panel';
    div.setAttribute('data-color', panel.color);
    div.style.backgroundImage = `url('${panel.img}')`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center center';
    div.style.height = '100vh';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.textAlign = 'center';
    div.style.position = 'relative';
    div.style.overflow = 'hidden';

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.background = 'rgba(0,0,0,0.4)';
    overlay.style.padding = '20px';
    overlay.style.borderRadius = '12px';
    overlay.style.maxWidth = '800px';
    overlay.style.opacity = '0';
    overlay.style.transform = 'translateY(20px)';
    overlay.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    overlay.innerHTML = `<h2 style="color:#e6eef6;font-size:2rem;margin-bottom:12px;">${panel.title}</h2>
                         <p style="color:#e6eef6;font-size:1.1rem;line-height:1.4;">${panel.text}</p>`;

    div.appendChild(overlay);
    wrapper.appendChild(div);
  });

  // Fade-in overlays
  const overlays = wrapper.querySelectorAll('.overlay');
  const overlayObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {threshold:0.5});
  overlays.forEach(o=>overlayObserver.observe(o));

  // Change wrapper background color
  const panels = wrapper.querySelectorAll('.panel');
  const colorObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        wrapper.style.backgroundColor = entry.target.getAttribute('data-color');
      }
    });
  }, {threshold:0.5});
  panels.forEach(p=>colorObserver.observe(p));

  // Parallax background
  window.addEventListener('scroll', ()=>{
    panels.forEach(p=>{
      const rect = p.getBoundingClientRect();
      const offset = rect.top * 0.3;
      p.style.backgroundPosition = `center ${offset}px`;
    });
  });
})();
