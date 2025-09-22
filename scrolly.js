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
    transition: opacity 1s ease;
    opacity: 1;
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
  <div class="background" id="background"></div>

  <div class="text-block" data-bg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80">
    <p>Early Light — A quiet, blue morning. The sea is calm and the story begins.</p>
  </div>
  <div class="text-block" data-bg="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80">
    <p>Clouds Gather — Movement and color shift. Tension builds as clouds r
