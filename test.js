document.addEventListener('DOMContentLoaded', function() {

    const storyData = [
        {
            title:"Global Population Surge",
            chartType:'line',
            chartData:{
                labels:['1950','1960','1970','1980','1990','2000','2010','2020','2030'],
                datasets:[{label:'World Population (Billions)', data:[2.5,3.0,3.7,4.4,5.3,6.1,6.9,7.8,8.5], borderColor:'#667eea', backgroundColor:'rgba(102,126,234,0.1)', borderWidth:4, fill:true, tension:0.4, pointBackgroundColor:'#764ba2', pointBorderWidth:2, pointRadius:6}]
            },
            steps:[
                {title:"The Population Explosion", text:"In 1950, the world population was just 2.5 billion people. Today, we've more than tripled that number, crossing 8 billion in 2022."},
                {title:"Accelerating Growth", text:"The most dramatic growth occurred between 1950-2000, adding nearly 4 billion people in just 50 years - more than had ever existed before."},
                {title:"Future Projections", text:"By 2030, we're expected to reach 8.5 billion. However, growth rates are slowing as fertility rates decline globally."}
            ]
        },
        {
            title:"Carbon Emissions Crisis",
            chartType:'bar',
            chartData:{
                labels:['China','United States','India','Russia','Japan','Germany'],
                datasets:[{label:'CO₂ Emissions (Billion Tons)', data:[10.1,5.4,2.7,1.8,1.2,0.8], backgroundColor:['rgba(239,68,68,0.8)','rgba(245,101,101,0.8)','rgba(252,165,165,0.8)','rgba(254,202,202,0.8)','rgba(254,226,226,0.8)','rgba(255,245,245,0.8)'], borderColor:'#dc2626', borderWidth:2, borderRadius:8}]
            },
            steps:[
                {title:"China Leads Emissions", text:"China produces over 10 billion tons of CO₂ annually - nearly double the United States and more than the next 4 countries combined."},
                {title:"The Big Six", text:"Just six countries account for over 60% of global carbon emissions, highlighting the concentrated nature of this challenge."},
                {title:"Per Capita Reality", text:"While China leads in total emissions, per capita emissions tell a different story - Americans produce twice as much CO₂ per person."}
            ]
        },
        {
            title:"Renewable Energy Revolution",
            chartType:'doughnut',
            chartData:{
                labels:['Solar','Wind','Hydro','Nuclear','Biomass','Geothermal'],
                datasets:[{data:[28,26,16,10,13,7], backgroundColor:['#f59e0b','#06b6d4','#3b82f6','#8b5cf6','#10b981','#ef4444'], borderWidth:3, borderColor:'#1f2937', hoverBorderWidth:5}]
            },
            steps:[
                {title:"Solar Takes the Lead", text:"Solar power now accounts for 28% of new renewable capacity, becoming the fastest-growing energy source in human history."},
                {title:"Wind Power Rising", text:"Wind energy is close behind at 26%, with massive offshore wind farms transforming coastlines around the world."},
                {title:"The Clean Transition", text:"Together, renewables now account for over 30% of global electricity generation, with costs plummeting every year."}
            ]
        }
    ];

    const container = document.getElementById('scroller-container');

    // Hero section
    const hero = document.createElement('div');
    hero.className='hero-section';
    hero.innerHTML=`<h1 class="hero-title">The World in Motion</h1><p class="hero-subtitle">A data-driven journey through population growth, carbon emissions, and the renewable energy revolution</p>`;
    container.appendChild(hero);

    // Generate story sections
    storyData.forEach((story, idx) => {
        const section = document.createElement('div');
        section.className='story-section';

        const sticky = document.createElement('div');
        sticky.className='viz-sticky';
        const viz = document.createElement('div');
        viz.className='viz-container';
        viz.innerHTML = `<div class="viz-title">${story.title}</div><div class="chart-container"><canvas id="chart-${idx}"></canvas></div>`;
        sticky.appendChild(viz);
        section.appendChild(sticky);

        const storyContent = document.createElement('div');
        storyContent.className='story-content';

        story.steps.forEach((step, sIdx) => {
            const stepDiv = document.createElement('div');
            stepDiv.className='story-step';
            stepDiv.innerHTML=`<div class="step-content"><div class="step-number">${sIdx+1}</div><div class="step-title">${step.title}</div><div class="step-text">${step.text}</div></div>`;
            storyContent.appendChild(stepDiv);
        });

        section.appendChild(storyContent);
        container.appendChild(section);

        // Initialize Chart.js
        const ctx = document.getElementById(`chart-${idx}`).getContext('2d');
        new Chart(ctx, story.chartData);
    });

    // Scroll animations for step content
    const steps = document.querySelectorAll('.step-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.5 });
    steps.forEach(step => observer.observe(step));
});
