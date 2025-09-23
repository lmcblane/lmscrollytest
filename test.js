// Inject styles
const style = document.createElement('style');
style.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    overflow-x: hidden;
    /* remove forced color:white here */
  }
  #scroller-container { position: relative; width: 100%; background: #0a0a0a}

  .hero-section {
    height: 100vh; display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    background: radial-gradient(circle at center, rgba(29,78,216,0.15) 0%, transparent 70%);
    text-align: center; padding: 2rem;
    color: white;
  }
  .hero-title {
    font-size: clamp(3rem, 8vw, 6rem); font-weight: 900;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }
  .hero-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.8rem); color: rgba(255,255,255,0.85);
    max-width: 700px; line-height: 1.6; margin: 0 auto;
  }

  .story-section { position: relative; min-height: 250vh; }
  .viz-sticky {
    position: sticky; top: 0; height: 100vh;
    display: flex; align-items: center; justify-content: center;
  }
  .viz-container {
    width: 90%; max-width: 800px; height: 70vh;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px; padding: 2rem;
    opacity: 0; transform: scale(0.8) translateY(50px);
    transition: all 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .viz-container.visible { opacity: 1; transform: scale(1) translateY(0); }
  .viz-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; text-align: center; color: white; }

  .story-content { position: relative; z-index: 2; padding-top: 50vh; }
  .story-step { margin: 50vh 0; display: flex; justify-content: flex-end; padding: 0 5%; }
  .story-step:nth-child(even){ justify-content: flex-start; }
  .step-content {
    max-width: 450px;
    background: rgba(255,255,255,0.08); border-radius: 20px;
    padding: 2rem; opacity: 0; transform: translateX(100px);
    transition: all 1s cubic-bezier(0.4,0,0.2,1);
  }
  .story-step:nth-child(even) .step-content { transform: translateX(-100px); }
  .step-content.visible { opacity: 1; transform: translateX(0); }
  .step-number {
    display: inline-block; width: 40px; height: 40px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%; text-align: center; line-height: 40px;
    font-weight: 700; margin-bottom: 1rem;
  }
  /* ✅ Only body copy text is forced white here */
  .step-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.5rem; color: #fff; }
  .step-text { color: rgba(255,255,255,0.95); line-height: 1.6; font-size: 1.05rem; }

  @media (max-width: 768px){
    .viz-container { width: 95%; padding: 1.5rem; height: 60vh; }
    .story-step { justify-content: center !important; padding: 0 1rem; margin: 30vh 0; }
    .step-content { max-width: 100%; padding: 1.5rem; transform: translateY(50px) !important; }
    .step-content.visible { transform: translateY(0) !important; }
  }
`;
document.head.appendChild(style);

// Data
const storyData = [
  {
    title:"Global Population Surge",
    chartType:'line',
    chartData:{
      labels:['1950','1960','1970','1980','1990','2000','2010','2020','2030'],
      datasets:[{label:'World Population (Billions)', data:[2.5,3.0,3.7,4.4,5.3,6.1,6.9,7.8,8.5], borderColor:'#667eea', backgroundColor:'rgba(102,126,234,0.2)', borderWidth:4, fill:true, tension:0.4, pointBackgroundColor:'#764ba2', pointRadius:5}]
    },
    steps:[
      {title:"The Population Explosion", text:"In 1950, the world population was just 2.5 billion people. Today, we've more than tripled that number, crossing 8 billion in 2022."},
      {title:"Accelerating Growth", text:"The most dramatic growth occurred between 1950-2000, adding nearly 4 billion people in just 50 years."},
      {title:"Future Projections", text:"By 2030, we're expected to reach 8.5 billion. Growth rates are slowing as fertility rates decline."}
    ]
  },
  {
    title:"Carbon Emissions Crisis",
    chartType:'bar',
    chartData:{
      labels:['China','United States','India','Russia','Japan','Germany'],
      datasets:[{label:'CO₂ Emissions (Billion Tons)', data:[10.1,5.4,2.7,1.8,1.2,0.8], backgroundColor:['#ef4444','#f87171','#fca5a5','#fecaca','#fee2e2','#fef2f2'], borderColor:'#dc2626', borderWidth:2, borderRadius:6}]
    },
    steps:[
      {title:"China Leads Emissions", text:"China produces over 10 billion tons of CO₂ annually - nearly double the U.S."},
      {title:"The Big Six", text:"Just six countries account for over 60% of global emissions."},
      {title:"Per Capita Reality", text:"Per capita emissions show Americans produce twice as much CO₂ per person compared to China."}
    ]
  }
];

// Build DOM
const container = document.getElementById('scroller-container');

// Hero
const hero = document.createElement('div');
hero.className = 'hero-section';
hero.innerHTML = `<h1 class="hero-title">The World in Motion</h1>
<p class="hero-subtitle">A data-driven journey through population growth, carbon emissions, and the renewable energy revolution</p>`;
container.appendChild(hero);

// Story sections
storyData.forEach(story=>{
  const section = document.createElement('div');
  section.className = 'story-section';

  const vizSticky = document.createElement('div');
  vizSticky.className = 'viz-sticky';
  vizSticky.innerHTML = `
    <div class="viz-container">
      <div class="viz-title">${story.title}</div>
      <div class="chart-container"><canvas></canvas></div>
    </div>`;
  section.appendChild(vizSticky);

  const storyContent = document.createElement('div');
  storyContent.className = 'story-content';
  story.steps.forEach((step, i)=>{
    const stepDiv = document.createElement('div');
    stepDiv.className = 'story-step';
    stepDiv.innerHTML = `
      <div class="step-content">
        <div class="step-number">${i+1}</div>
        <div class="step-title">${step.title}</div>
        <div class="step-text">${step.text}</div>
      </div>`;
    storyContent.appendChild(stepDiv);
  });
  section.appendChild(storyContent);

  container.appendChild(section);

  // Chart
  const ctx = vizSticky.querySelector('canvas').getContext('2d');
  new Chart(ctx, {
    type: story.chartType,
    data: story.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#fff' } } },
      scales: { x: { ticks: { color: '#fff' } }, y: { ticks: { color: '#fff' } } }
    }
  });
});

// Observers for animation
const vizContainers = document.querySelectorAll('.viz-container');
const steps = document.querySelectorAll('.step-content');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.4});

vizContainers.forEach(vc=>observer.observe(vc));
steps.forEach(st=>observer.observe(st));
