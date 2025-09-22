(function() {
  const panelsData = [
    {
      title: "Early Light",
      text: "A quiet, blue morning. The sea is calm and the story begins.",
      bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Clouds Gather",
      text: "Movement and color shift. Tension builds as clouds roll in.",
      bg: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Climax",
      text: "Powerful waves crash dramatically — the peak moment.",
      bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Reflection",
      text: "A moment to breathe. The story slows and invites reflection.",
      bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Find wrapper
  const wrapper = document.querySelector('.scroller-wrapper');
  if(!wrapper) return;

  // Add CSS for sticky effect
  const style = document.createElement('style');
  style.innerHTML = `
    .panel { position: relative; height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding: 0 20px; box-sizing: border-box; }
    .panel-text { max-width: 800px; background: rgba(0,0,0,0.4); padding: 20px; border-radius: 12px; margin-top: 50vh; opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .panel-text.show { opacity: 1; transform: translateY(0); }
    .sticky-image { position: sticky; top: 0; height: 100vh; width: 100%; background-size: cover; background-position: center center; transition: opacity 0.6s ease; }
    .sticky-image.fade-out { opacity: 0; }
    body { margin: 0; padding: 0; background-color: #0f1724; color: #e6eef6; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
  `;
  document.head.appendChild(style);

  // Build panels
  panelsData.forEach(p => {
    const panel = document.createElement('div');
    panel.className = 'panel';

    const img = document.createElement('div');
    img.className = 'sticky-image';
    img.style.backgroundImage = `url('${p.bg}')`;
    panel.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'panel-text';
    overlay.innerHTML = `<h2>${p.title}</h2><p>${p.text}</p>`;
    panel.appendChild(overlay);

    wrapper.appendChild(panel);
  });

  // Observe text for fade-in
  const overlays = wrapper.querySelectorAll('.panel-text');
  const overlayObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.5 });
  overlays.forEach(o => overlayObserver.observe(o));

  // Observe panels for image fade
  const panels = wrapper.querySelectorAll('.panel');
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const img = entry.target.querySelector('.sticky-image');
      if(!entry.isIntersecting) img.classList.add('fade-out');
      else img.classList.remove('fade-out');
    });
  }, { threshold: 0 });
  panels.forEach(p => imageObserver.observe(p));
})();
