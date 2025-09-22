// Wrap everything to ensure it runs after DOM is ready
window.addEventListener('DOMContentLoaded', () => {

  // --- Inject CSS ---
  const style = document.createElement('style');
  style.innerHTML = `
    .scroller-wrapper {
      position: relative;
      font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      z-index: -1;
      transition: opacity 1s ease, background-image 0.6s ease;
      opacity: 1;
    }
    .text-block {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
      box-sizing: border-box;
    }
    .text-block p {
      max-width: 700px;
      font-size: 1.2rem;
      line-height: 1.5;
      background: rgba(0,0,0,0.4);
      padding: 20px;
      border-radius: 12px;
      color: #e6eef6;
    }
  `;
  document.head.appendChild(style);

  // --- Create wrapper if missing ---
  let wrapper = document.querySelector('.scroller-wrapper');
  if(!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'scroller-wrapper';
    document.body.appendChild(wrapper);
  }

  // --- Background div ---
  let bg = wrapper.querySelector('.background');
  if(!bg) {
    bg = document.createElement('div');
    bg.className = 'background';
    wrapper.insertBefore(bg, wrapper.firstChild);
  }

  // --- Define content blocks ---
  const contentBlocks = [
    {
      text: "Early Light — A quiet, blue morning. The sea is calm and the story begins.",
      bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      text: "Clouds Gather — Movement and color shift. Tension builds as clouds roll in.",
      bg: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80"
    },
    {
      text: "Climax — Powerful waves crash dramatically — the peak moment.",
      bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    },
    {
      text: "Reflection — A moment to breathe. The story slows and invites reflection.",
      bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // --- Create text blocks ---
  contentBlocks.forEach(block => {
    const div = document.createElement('div');
    div.className = 'text-block';
    div.setAttribute('data-bg', block.bg);
    div.innerHTML = `<p>${block.text}</p>`;
    wrapper.appendChild(div);
  });

  // --- Set initial background ---
  if(contentBlocks.length > 0) bg.style.backgroundImage = `url('${contentBlocks[0].bg}')`;

  // --- IntersectionObserver to change background ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const newBg = entry.target.getAttribute('data-bg');
        if(newBg){
          bg.style.opacity = 0;
          setTimeout(() => {
            bg.style.backgroundImage = `url('${newBg}')`;
            bg.style.opacity = 1;
          }, 200);
        }
      }
    });
  }, { threshold: 0 }); // triggers immediately when block enters view

  const blocks = wrapper.querySelectorAll('.text-block');
  blocks.forEach(block => observer.observe(block));
});
