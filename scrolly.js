<style>
  body, html {
    margin: 0;
    padding: 0;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    color: #e6eef6;
    background-color: #0f1724;
  }

  .scroller-wrapper {
    position: relative;
    overflow: hidden;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: opacity 1s ease;
    z-index: -1;
  }

  .text-block {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
  }

  .text-block p {
    max-width: 700px;
    font-size: 1.2rem;
    line-height: 1.5;
    background: rgba(0,0,0,0.4);
    padding: 20px;
    border-radius: 12px;
  }
</style>

<div class="scroller-wrapper">
  <div class="background" id="bg1" style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'); opacity: 1;"></div>
  <div class="background" id="bg2" style="background-image: url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80'); opacity: 0;"></div>
  <div class="background" id="bg3" style="background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'); opacity: 0;"></div>

  <div class="text-block" data-bg="bg1">
    <p>Early Light — A quiet, blue morning. The sea is calm and the story begins.</p>
  </div>
  <div class="text-block" data-bg="bg2">
    <p>Clouds Gather — Movement and color shift. Tension builds as clouds roll in.</p>
  </div>
  <div class="text-block" data-bg="bg3">
    <p>Climax — Powerful waves crash dramatically — the peak moment.</p>
  </div>
</div>

<script>
  const blocks = document.querySelectorAll('.text-block');
  const backgrounds = document.querySelectorAll('.background');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const bgId = entry.target.getAttribute('data-bg');
        backgrounds.forEach(bg => {
          if(bg.id === bgId) {
            bg.style.opacity = 1;
          } else {
            bg.style.opacity = 0;
          }
        });
      }
    });
  }, {threshold: 0.5});

  blocks.forEach(block => observer.observe(block));
</script>
