/**
 * SCROLLYTELLING DATA VISUALIZATION SCRIPT
 * =======================================
 * 
 * A dynamic scrollytelling experience featuring data visualizations
 * that animate as users scroll through the story. Built with Chart.js
 * and Intersection Observer API.
 * 
 * Dependencies:
 * - Chart.js (must be loaded before this script)
 * 
 * Required HTML element:
 * - <div id="scroller-container"></div>
 * 
 * @author Your Name
 * @version 1.0
 * @date 2024
 */

// =============================================================================
// STYLE INJECTION
// =============================================================================

/**
 * Injects all necessary CSS styles directly into the document head
 * This approach ensures the styles are always available regardless of external CSS files
 */
const style = document.createElement('style');
style.textContent = `
  /* Global Reset - Ensures consistent baseline across browsers */
  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }
  
  /* Body Setup - Base typography and layout */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    overflow-x: hidden; /* Prevent horizontal scroll during animations */
  }
  
  /* Main Container - Dark theme background */
  #scroller-container { 
    position: relative; 
    width: 100%; 
    background: #0a0a0a;
  }

  /* =================================================================
   * HERO SECTION STYLES
   * ================================================================= */
  
  /* Hero Layout - Full viewport height with centered content */
  .hero-section {
    height: 100vh; 
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    background: radial-gradient(circle at center, rgba(29,78,216,0.15) 0%, transparent 70%);
    text-align: center; 
    padding: 2rem;
    color: white;
  }
  
  /* Hero Title - Gradient text effect with responsive sizing */
  .hero-title {
    font-size: clamp(3rem, 8vw, 6rem); /* Responsive: 3rem minimum, 6rem maximum */
    font-weight: 900;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; /* Creates gradient text effect */
    margin-bottom: 1rem;
  }
  
  /* Hero Subtitle - Secondary text with opacity for hierarchy */
  .hero-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: rgba(255,255,255,0.85);
    max-width: 700px; 
    line-height: 1.6; 
    margin: 0 auto;
  }

  /* =================================================================
   * STORY SECTION STYLES
   * ================================================================= */
  
  /* Story Section Container - Tall height allows for scroll-triggered animations */
  .story-section { 
    position: relative; 
    min-height: 250vh; /* 2.5x viewport height for scroll space */
  }
  
  /* Sticky Visualization - Stays in view while story steps scroll past */
  .viz-sticky {
    position: sticky; 
    top: 0; 
    height: 100vh;
    display: flex; 
    align-items: center; 
    justify-content: center;
  }
  
  /* Visualization Container - Glassmorphism card effect */
  .viz-container {
    width: 90%; 
    max-width: 800px; 
    height: 70vh;
    background: rgba(255,255,255,0.05); /* Semi-transparent background */
    border: 1px solid rgba(255,255,255,0.1); /* Subtle border */
    border-radius: 20px; 
    padding: 2rem;
    /* Initial state for entrance animation */
    opacity: 0; 
    transform: scale(0.8) translateY(50px);
    transition: all 0.8s cubic-bezier(0.4,0,0.2,1); /* Smooth easing curve */
  }
  
  /* Visible state - Triggered by Intersection Observer */
  .viz-container.visible { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
  
  /* Chart Title Styling */
  .viz-title { 
    font-size: 1.5rem; 
    font-weight: 700; 
    margin-bottom: 1rem; 
    text-align: center; 
    color: white; 
  }

  /* =================================================================
   * STORY STEP STYLES
   * ================================================================= */
  
  /* Story Content Container - Positioned to overlay the sticky viz */
  .story-content { 
    position: relative; 
    z-index: 2; /* Above the sticky visualization */
    padding-top: 50vh; /* Start after half viewport to center first step */
  }
  
  /* Individual Story Step - Large vertical margins create scroll space */
  .story-step { 
    margin: 50vh 0; /* Each step takes full viewport height */
    display: flex; 
    justify-content: flex-end; /* Default: align to right */
    padding: 0 5%; 
  }
  
  /* Alternating Layout - Even steps align left for visual variety */
  .story-step:nth-child(even) {
    justify-content: flex-start;
    padding-left: 10%; 
  }
  
  /* Step Content Card - Individual story step container */
  .step-content {
    max-width: 450px;
    background: rgba(255,255,255,0.08); /* Subtle glass effect */
    border-radius: 20px;
    padding: 2rem; 
    /* Initial animation state */
    opacity: 0; 
    transform: translateX(100px); /* Slide in from right */
    transition: all 1s cubic-bezier(0.4,0,0.2,1);
  }
  
  /* Even steps slide in from left */
  .story-step:nth-child(even) .step-content { 
    transform: translateX(-100px); 
  }
  
  /* Visible state for step content */
  .step-content.visible { 
    opacity: 1; 
    transform: translateX(0); 
  }
  
  /* Step Number Badge - Circular numbered indicator */
  .step-number {
    display: inline-block; 
    width: 40px; 
    height: 40px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%; 
    text-align: center; 
    line-height: 40px;
    font-weight: 700; 
    margin-bottom: 1rem;
  }
  
  /* Step Typography */
  .step-title { 
    font-size: 1.4rem; 
    font-weight: 700; 
    margin-bottom: 0.5rem; 
    color: #fff; 
  }
  
  .step-text { 
    color: rgba(255,255,255,0.95); 
    line-height: 1.6; 
    font-size: 1.05rem; 
  }

  /* =================================================================
   * RESPONSIVE DESIGN
   * ================================================================= */
  
  /* Mobile Optimizations - Tablet and below */
  @media (max-width: 768px) {
    .viz-container { 
      width: 95%; 
      padding: 1.5rem; 
      height: 60vh; 
    }
    
    /* Simplified mobile layout - center all steps */
    .story-step { 
      justify-content: center !important; 
      padding: 0 1rem; 
      margin: 30vh 0; /* Reduced scroll space on mobile */
    }
    
    /* Mobile animation - vertical instead of horizontal */
    .step-content { 
      max-width: 100%; 
      padding: 1.5rem; 
      transform: translateY(50px) !important; /* Consistent vertical animation */
    }
    
    .step-content.visible { 
      transform: translateY(0) !important; 
    }
  }
`;
document.head.appendChild(style);

// =============================================================================
// DATA CONFIGURATION
// =============================================================================

/**
 * Story data structure containing all visualization content
 * Each story object contains:
 * - title: Display name for the visualization
 * - chartType: Chart.js chart type ('line', 'bar', 'pie', etc.)
 * - chartData: Chart.js compatible data object
 * - steps: Array of story steps with title/text for each scroll point
 */
const storyData = [
  {
    title: "Global Population Surge",
    chartType: 'line',
    chartData: {
      labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2030'],
      datasets: [{
        label: 'World Population (Billions)', 
        data: [2.5, 3.0, 3.7, 4.4, 5.3, 6.1, 6.9, 7.8, 8.5], 
        borderColor: '#667eea', 
        backgroundColor: 'rgba(102,126,234,0.2)', 
        borderWidth: 4, 
        fill: true, 
        tension: 0.4, // Smooth curve
        pointBackgroundColor: '#764ba2', 
        pointRadius: 5
      }]
    },
    steps: [
      {
        title: "The Population Explosion", 
        text: "In 1950, the world population was just 2.5 billion people. Today, we've more than tripled that number, crossing 8 billion in 2022."
      },
      {
        title: "Accelerating Growth", 
        text: "The most dramatic growth occurred between 1950-2000, adding nearly 4 billion people in just 50 years."
      },
      {
        title: "Future Projections", 
        text: "By 2030, we're expected to reach 8.5 billion. Growth rates are slowing as fertility rates decline."
      }
    ]
  },
  {
    title: "Carbon Emissions Crisis",
    chartType: 'bar',
    chartData: {
      labels: ['China', 'United States', 'India', 'Russia', 'Japan', 'Germany'],
      datasets: [{
        label: 'CO₂ Emissions (Billion Tons)', 
        data: [10.1, 5.4, 2.7, 1.8, 1.2, 0.8], 
        backgroundColor: ['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2', '#fef2f2'], 
        borderColor: '#dc2626', 
        borderWidth: 2, 
        borderRadius: 6 // Rounded bar corners
      }]
    },
    steps: [
      {
        title: "China Leads Emissions", 
        text: "China produces over 10 billion tons of CO₂ annually - nearly double the U.S."
      },
      {
        title: "The Big Six", 
        text: "Just six countries account for over 60% of global emissions."
      },
      {
        title: "Per Capita Reality", 
        text: "Per capita emissions show Americans produce twice as much CO₂ per person compared to China."
      }
    ]
  }
];

// =============================================================================
// DOM CONSTRUCTION
// =============================================================================

/**
 * Main container element - must exist in HTML
 * This script will populate it with all story content
 */
const container = document.getElementById('scroller-container');

// =============================================================================
// HERO SECTION CREATION
// =============================================================================

/**
 * Creates and inserts the hero section with title and subtitle
 * This serves as the introduction to the scrollytelling experience
 */
const hero = document.createElement('div');
hero.className = 'hero-section';
hero.innerHTML = `
  <h1 class="hero-title">The World in Motion</h1>
  <p class="hero-subtitle">A data-driven journey through population growth, carbon emissions, and the renewable energy revolution</p>
`;
container.appendChild(hero);

// =============================================================================
// STORY SECTIONS GENERATION
// =============================================================================

/**
 * Dynamically creates story sections for each dataset
 * Each section contains:
 * 1. A sticky visualization container with Chart.js chart
 * 2. Scrollable story steps that trigger as user scrolls
 */
storyData.forEach((story, storyIndex) => {
  // Create main section container
  const section = document.createElement('div');
  section.className = 'story-section';

  // Create sticky visualization area
  const vizSticky = document.createElement('div');
  vizSticky.className = 'viz-sticky';
  vizSticky.innerHTML = `
    <div class="viz-container">
      <div class="viz-title">${story.title}</div>
      <div class="chart-container">
        <canvas></canvas>
      </div>
    </div>
  `;
  section.appendChild(vizSticky);

  // Create scrollable story content
  const storyContent = document.createElement('div');
  storyContent.className = 'story-content';
  
  // Generate individual story steps
  story.steps.forEach((step, stepIndex) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'story-step';
    stepDiv.innerHTML = `
      <div class="step-content">
        <div class="step-number">${stepIndex + 1}</div>
        <div class="step-title">${step.title}</div>
        <div class="step-text">${step.text}</div>
      </div>
    `;
    storyContent.appendChild(stepDiv);
  });
  
  section.appendChild(storyContent);
  container.appendChild(section);

  // ==========================================================================
  // CHART.JS INITIALIZATION
  // ==========================================================================
  
  /**
   * Initialize Chart.js visualization for this story section
   * Uses the canvas element created above
   */
  const ctx = vizSticky.querySelector('canvas').getContext('2d');
  const chartInstance = new Chart(ctx, {
    type: story.chartType,
    data: story.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { 
          labels: { 
            color: '#fff' // White text for dark theme
          } 
        } 
      },
      scales: { 
        x: { 
          ticks: { 
            color: '#fff' // White axis labels
          } 
        }, 
        y: { 
          ticks: { 
            color: '#fff' 
          } 
        } 
      }
    }
  });

  // Store chart reference for potential future manipulation
  // Uncomment if you need to access charts later:
  // window.charts = window.charts || [];
  // window.charts[storyIndex] = chartInstance;
});

// =============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// =============================================================================

/**
 * Intersection Observer setup for scroll-triggered animations
 * Watches for when elements enter the viewport and adds 'visible' class
 */

// Get all elements that need animation
const vizContainers = document.querySelectorAll('.viz-container');
const steps = document.querySelectorAll('.step-content');

/**
 * Intersection Observer configuration
 * @param {Array} entries - Array of observed elements that changed visibility
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // When element enters viewport (40% visible), trigger animation
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
    
    // Optional: Remove 'visible' class when element leaves viewport
    // Uncomment below for repeat animations:
    // else {
    //   entry.target.classList.remove('visible');
    // }
  });
}, {
  threshold: 0.4, // Trigger when 40% of element is visible
  // rootMargin: '0px 0px -10% 0px' // Optional: Adjust trigger point
});

// Start observing all animation targets
vizContainers.forEach(container => observer.observe(container));
steps.forEach(step => observer.observe(step));

// =============================================================================
// UTILITY FUNCTIONS (Optional - for future enhancements)
// =============================================================================

/**
 * Optional utility function to update chart data dynamically
 * @param {number} storyIndex - Index of story to update
 * @param {Object} newData - New Chart.js data object
 */
function updateStoryData(storyIndex, newData) {
  if (window.charts && window.charts[storyIndex]) {
    window.charts[storyIndex].data = newData;
    window.charts[storyIndex].update();
  }
}

/**
 * Optional function to scroll to specific story section
 * @param {number} storyIndex - Index of story to scroll to
 */
function scrollToStory(storyIndex) {
  const sections = document.querySelectorAll('.story-section');
  if (sections[storyIndex]) {
    sections[storyIndex].scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// =============================================================================
// ERROR HANDLING & DEBUGGING
// =============================================================================

/**
 * Check for required dependencies on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Verify Chart.js is loaded
  if (typeof Chart === 'undefined') {
    console.error('Chart.js is not loaded. Please include Chart.js before this script.');
    return;
  }
  
  // Verify container exists
  if (!container) {
    console.error('Container element with id "scroller-container" not found.');
    return;
  }
  
  console.log('Scrollytelling script initialized successfully');
  console.log(`Generated ${storyData.length} story sections`);
});

/**
 * Optional: Add performance monitoring
 */
if ('performance' in window) {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Scrollytelling loaded in ${Math.round(loadTime)}ms`);
  });
}
