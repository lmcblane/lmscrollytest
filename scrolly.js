<style>
  .scroller-wrapper {
    background-color: #0f1724;
    color: #e6eef6;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  }

  .panel {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .panel-text {
    max-width: 800px;
    background: rgba(0,0,0,0.4);
    padding: 20px;
    border-radius: 12px;
    margin-top: 50vh;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .panel-text.show {
    opacity: 1;
    transform: translateY(0);
  }

  .sticky-image {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    transition: opacity 0.6s ease;
  }

  .sticky-image.fade-out {
    opacity: 0;
  }
</style>

<div class="scroller-wrapper">

  <div class="panel" data-bg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80">
    <div class="sticky-image"></div>
    <div class="panel-text">
      <h2>Early Light</h2>
      <p>A quiet, blue morning. The sea is calm and the story begins.</p>
    </div>
  </div>

  <div class="panel" data-bg="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80">
    <div class="sticky-image"></div>
    <div class="panel-text">
      <h2>Clouds Gather</h2>
      <p>Movement and color shift. Tension builds as clouds roll in.</p>
    </div>
  </div>

  <div class="panel" data-bg="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80">
    <div class="sticky-image"></div>
    <div class="panel-text">
      <h2>Climax</h2>
      <p>Powerful waves crash dramatically — the peak moment.</p>
    </div>
  </div>

  <div class="panel" data-bg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80">
    <div class="sticky-image"></div>
    <div class="panel-text">
      <h2>Reflection</h2>
      <p>A moment to breathe. The story slows and invites reflection.</p>
    </div>
  </div>

</div>

<script>
  const panels = document.querySelectorAll('.panel');

  // Set background images
  panels.forEach(panel => {
    const imgDiv = panel.querySelector('.sticky-image');
    const bg = panel.getAttribute('data-bg');
    imgDiv.style.backgroundImage = `url('${bg}')`;
  });

  // IntersectionObserver for text fade-in
  const textObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.panel-text').forEach(text => textObserver.observe(text));

  // Fade between sticky images
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const img = entry.target.querySelector('.sticky-image');
      if(!entry.isIntersecting) {
        img.classList.add('fade-out');
      } else {
        img.classList.remove('fade-out');
      }
    });
  }, { threshold: 0 });

  panels.forEach(panel => imageObserver.observe(panel));
</script>
