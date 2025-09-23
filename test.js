// A comment to remind you to include the annotation plugin in your HTML!
// <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/2.2.1/chartjs-plugin-annotation.min.js"></script>

// Inject styles
const style = document.createElement('style');
style.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    overflow-x: hidden;
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

// Data sections
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
      {title:"Accelerating Growth", text:"The most dramatic growth occurred between 1950 and 2000, where the population nearly doubled in just 50 years."},
      {title:"Future Projections", text:"By 2030, we're expected to reach 8.5 billion. While still growing, the rate is slowing as global fertility rates decline."}
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
      {title:"The Emitters", text:"Just a handful of countries are responsible for the vast majority of global CO₂ emissions, with industrial activity being the primary driver."},
      {title:"The Big Two", text:"China and the United States alone account for over 40% of the world's carbon emissions, producing a combined 15.5 billion tons annually."},
      {title:"A Glimmer of Hope", text:"Many developed nations, including Germany and Japan, have seen their emissions peak and are now on a downward trend due to policy changes and a shift to renewables."}
    ]
  },
  {
    title:"The Rise of Renewable Energy",
    chartType:'bar',
    chartData:{
      labels: ['2010', '2015', '2020', '2025 (Est)'],
      datasets:[
        { label: 'Solar', data: [32, 140, 480, 1200], backgroundColor: '#facc15' },
        { label: 'Wind', data: [180, 415, 740, 1500], backgroundColor: '#38bdf8' },
        { label: 'Hydro', data: [945, 1100, 1250, 1400], backgroundColor: '#4f46e5' }
      ]
    },
    steps:[
      {title:"A New Energy Era", text:"Renewable energy generation has exploded in the last decade, driven by falling costs and climate initiatives. This chart shows global capacity in gigawatts."},
      {title:"Solar and Wind Dominate", text:"While hydropower has been a stable source, the most explosive growth has come from solar and wind power, which have become the cheapest forms of new electricity in many parts of the world."},
      {title:"Exponential Growth", text:"Projections show this trend accelerating dramatically. By 2025, solar and wind are expected to have more than tripled their 2020 capacity, leading the charge against fossil fuels."}
    ]
  },
  {
    title:"Megacities: The Urban Future",
    chartType:'doughnut',
    chartData:{
      labels: ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mumbai', 'Mexico City', 'Rest of World'],
      datasets: [{
        label: 'Population in Millions (2023)',
        data: [37.2, 32.9, 29.2, 22.6, 21.3, 22.1, 7944.7],
        backgroundColor: ['#d946ef','#c026d3','#a21caf','#86198f','#701a75','#581c87', '#1e1b4b'],
        borderColor: '#0a0a0a',
        borderWidth: 3
      }]
    },
    steps:[
        {title:"The Urban Migration", text:"More than half of the world's population now lives in urban areas. This trend is dominated by the rise of 'megacities'—urban areas with more than 10 million inhabitants."},
        {title:"Asia's Urban Centers", text:"As of 2023, the world's three largest megacities—Tokyo, Delhi, and Shanghai—are all located in Asia, reflecting the continent's rapid economic and population growth."},
        {title:"A Planet of Cities", text:"While these megacities are enormous, they represent just a fraction of the total global population, highlighting the vast and diverse distribution of humanity across the planet."}
    ]
  },
  {
    title:"The Global Digital Divide",
    chartType:'line',
    chartData: {
        labels: ['2005', '2010', '2015', '2020', '2025 (Est)'],
        datasets: [
            {
                label: 'Europe',
                data: [50, 67, 76, 87, 92],
                borderColor: '#22c55e',
                tension: 0.1,
                fill: false
            },
            {
                label: 'The Americas',
                data: [36, 49, 65, 80, 88],
                borderColor: '#3b82f6',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Asia & Pacific',
                data: [9, 23, 39, 57, 70],
                borderColor: '#ef4444',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Africa',
                data: [2, 10, 20, 39, 55],
                borderColor: '#f97316',
                tension: 0.1,
                fill: false
            }
        ]
    },
    steps: [
        {title:"Connecting the World", text:"Internet penetration has surged globally, but access remains highly unequal across different regions. This chart shows the percentage of the population using the internet."},
        {title:"The Persistent Divide", text:"In 2020, while 87% of Europeans were online, only 39% of Africans had internet access. This 'digital divide' impacts economic opportunity, education, and access to information."},
        {title:"Closing the Gap", text:"Despite the gap, growth is fastest in developing regions like Africa and Asia. Initiatives to expand mobile broadband are rapidly bringing millions online for the first time each year."}
    ]
  }
];

// Build DOM
const container = document.getElementById('scroller-container');
const charts = []; // Store chart instances here

// Hero
const hero = document.createElement('div');
hero.className = 'hero-section';
hero.innerHTML = `<h1 class="hero-title">The World in Motion</h1>
<p class="hero-subtitle">A data-driven journey through our changing planet, from population and emissions to energy and the digital age.</p>`;
container.appendChild(hero);

// Story sections
storyData.forEach((story, sectionIndex)=>{
  const section = document.createElement('div');
  section.className = 'story-section';
  section.dataset.sectionId = sectionIndex;

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
  story.steps.forEach((step, stepIndex)=>{
    const stepDiv = document.createElement('div');
    stepDiv.className = 'story-step';
    stepDiv.dataset.sectionId = sectionIndex;
    stepDiv.dataset.stepId = stepIndex;
    stepDiv.innerHTML = `
      <div class="step-content">
        <div class="step-number">${stepIndex+1}</div>
        <div class="step-title">${step.title}</div>
        <div class="step-text">${step.text}</div>
      </div>`;
    storyContent.appendChild(stepDiv);
  });
  section.appendChild(storyContent);

  container.appendChild(section);

  // Chart
  const ctx = vizSticky.querySelector('canvas').getContext('2d');

  // --- CORRECTED CHART CONFIGURATION ---
  const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: { labels: { color: '#fff' } },
          annotation: { annotations: {} }
      }
  };

  // Conditionally add scales only for charts that use them (i.e., not doughnut/pie)
  if (story.chartType !== 'doughnut' && story.chartType !== 'pie') {
      chartOptions.scales = {
          x: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255,255,255,0.1)' }
          },
          y: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255,255,255,0.1)' }
          }
      };
      // Add stacking logic specifically for the stacked bar chart
      if (story.title === "The Rise of Renewable Energy") {
          chartOptions.scales.x.stacked = true;
          chartOptions.scales.y.stacked = true;
      }
  }

  const chart = new Chart(ctx, {
      type: story.chartType,
      data: story.chartData,
      options: chartOptions
  });
  charts.push(chart);
});


// --- INTERACTIVE LOGIC ---

// A function to update charts based on the visible step
function updateChart(sectionId, stepId) {
    const chart = charts[sectionId];
    if (!chart) return;

    // Reset all charts in the section to a default state first
    const defaultAnnotation = {};
    chart.options.plugins.annotation.annotations = defaultAnnotation;

    // Default styles (can be useful for resetting)
    const originalBgColors = storyData[sectionId].chartData.datasets[0].backgroundColor;

    // Specific updates based on section and step
    switch (parseInt(sectionId)) {
        case 0: // Population
            if (stepId == 1) { // Highlight rapid growth
                const box = { type: 'box', xMin: '1950', xMax: '2000', backgroundColor: 'rgba(255, 231, 128, 0.2)', borderColor: 'rgba(255, 231, 128, 1)', borderWidth: 1, label: { content: "Rapid Growth", display: true, position: "start" }};
                chart.options.plugins.annotation.annotations = { box };
            } else if (stepId == 2) { // Add future projection line
                const line = { type: 'line', xMin: '2020', xMax: '2030', yMin: 7.8, yMax: 8.5, borderColor: 'rgb(255, 99, 132)', borderWidth: 2, label: { content: "Projection", display: true }};
                chart.options.plugins.annotation.annotations = { line };
            }
            break;
        case 1: // Emissions
            const defaultColors = [...originalBgColors];
            chart.data.datasets[0].backgroundColor = defaultColors;
            if (stepId == 1) { // Highlight China & US
                chart.data.datasets[0].backgroundColor[0] = '#ff0000'; // China
                chart.data.datasets[0].backgroundColor[1] = '#ff6384'; // US
            } else if (stepId == 2) { // Highlight Germany & Japan
                chart.data.datasets[0].backgroundColor[4] = '#4bc0c0'; // Japan
                chart.data.datasets[0].backgroundColor[5] = '#36a2eb'; // Germany
            }
            break;
        case 2: // Renewables
             if (stepId == 2) { // Add a growth trend line
                const line = { type: 'line', scaleID: 'y', value: 1500, endValue: 1500, borderColor: '#facc15', borderWidth: 3, label: { content: 'Explosive Growth', display: true, position: 'end', color: '#facc15' } };
                chart.options.plugins.annotation.annotations = { line };
             }
             break;
        case 3: // Megacities
             // No specific annotations for this one, but you could add them!
             break;
        case 4: // Digital Divide
            if (stepId == 1) { // Add annotation showing the gap
                 const box = { type: 'box', xMin: '2020', xMax: '2020', yMin: 39, yMax: 87, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'white', borderWidth: 1, label: { content: "48% Gap", display: true } };
                 chart.options.plugins.annotation.annotations = { box };
            }
            break;
    }
    chart.update(); // Crucial: This re-renders the chart with new data/options
}

// Observers for animation
const vizContainers = document.querySelectorAll('.viz-container');
const steps = document.querySelectorAll('.story-step');

// Observer for general fade-in animations
const animationObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) {
        entry.target.classList.add('visible');
    }
  });
},{threshold:0.4});

vizContainers.forEach(vc=>animationObserver.observe(vc.parentElement));
document.querySelectorAll('.step-content').forEach(st=>animationObserver.observe(st));


// Observer for chart updates
let lastVisibleStep = null;
const chartUpdateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.dataset.sectionId;
            const stepId = entry.target.dataset.stepId;
            const currentStepId = `s${sectionId}-p${stepId}`;

            // Only update if the step has changed
            if (currentStepId !== lastVisibleStep) {
                updateChart(sectionId, stepId);
                lastVisibleStep = currentStepId;
            }
        }
    });
}, {
    rootMargin: '-50% 0px -50% 0px', // Trigger when a step is in the vertical center
    threshold: 0
});

steps.forEach(step => chartUpdateObserver.observe(step));
