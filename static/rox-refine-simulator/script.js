const PRICE = {
  MATERIAL1: 2000,   // Phracon 1
  MATERIAL2: 8000,   // Phracon 2
  MATERIAL3: 32000,  // Phracon 3
  REPAIR: 50000,     // Weapon Lv50
}

// For white 2-handed weapon
const REFINEMENT_COST = [
  6  * PRICE.MATERIAL1,
  6  * PRICE.MATERIAL1,
  12 * PRICE.MATERIAL1,
  12 * PRICE.MATERIAL1,
  6  * PRICE.MATERIAL2,
  6  * PRICE.MATERIAL2,
  12 * PRICE.MATERIAL2,
  12 * PRICE.MATERIAL2,
  6  * PRICE.MATERIAL3,
  6  * PRICE.MATERIAL3,
  12 * PRICE.MATERIAL3,
  12 * PRICE.MATERIAL3,
]

const REFINEMENT_RATE = [
	{ upRate: 1.00, downRate: 0.00, brokeRate: 0.00 },
	{ upRate: 0.50, downRate: 0.00, brokeRate: 0.00 },
	{ upRate: 0.33, downRate: 0.00, brokeRate: 0.00 },
	{ upRate: 0.25, downRate: 0.00, brokeRate: 0.00 },
	{ upRate: 0.25, downRate: 0.25, brokeRate: 0.00 },
	{ upRate: 0.25, downRate: 0.25, brokeRate: 0.10	},
	{ upRate: 0.20, downRate: 0.25, brokeRate: 0.15	},
	{ upRate: 0.20, downRate: 0.25, brokeRate: 0.15	},
	{ upRate: 0.20, downRate: 0.30, brokeRate: 0.15	},
	{ upRate: 0.20, downRate: 0.30, brokeRate: 0.15	},
	{ upRate: 0.20, downRate: 0.30, brokeRate: 0.20	},
	{ upRate: 0.20, downRate: 0.30, brokeRate: 0.20	},
]


// refine return the next state
function refine(state) {
  const rate = REFINEMENT_RATE[state.currentLv]
  const cost = REFINEMENT_COST[state.currentLv]
  const n = Math.random();
  if (n < rate.upRate) {
    return {
      ...state,
      currentLv: state.currentLv + 1,
      nUp: state.nUp + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost,
    };
  } else if (n < rate.upRate + rate.downRate) {
    return {
      ...state,
      currentLv: state.currentLv - 1,
      nDown: state.nDown + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost,
    };
  } else if (n < rate.upRate + rate.downRate + rate.brokeRate) {
    return {
      ...state,
      nBreak: state.nBreak + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost + PRICE.REPAIR,
    };
  } else {
    return {
      ...state,
      nFailed: state.nFailed + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost,
    };
  }
}

// refineUntilLv return the first state reaching targetLv
function refineUntilLv(currentLv, targetLv) {
  let state = {
    currentLv,
    nUp: 0,
    nDown: 0,
    nBreak: 0,
    nFailed: 0,
    nRefine: 0,
    cost: 0,
  }
  while (state.currentLv != targetLv) {
    state = refine(state);
  }
  return state;
}

function runSimulation(baseLv, targetLv, totalExperiment) {
  const states = [];
  for (let i = 0; i < totalExperiment; i += 1) {
    const state = refineUntilLv(baseLv, targetLv);
    states.push(state);
  }
  return states;
}

let chartResult = null;

function setText(className, value) {
  Array.from(document.getElementsByClassName(className)).forEach(e => e.innerText = value);
}

function writeReport(states, options) {
  const ctx = document.getElementById('chart-result').getContext('2d');
  const maxNRefine = Math.max(...states.map(s => s.nRefine));

  // i: nRefine, v: freq
  const data = new Array(maxNRefine + 1).fill(0);
  states.forEach(s => {
    data[s.nRefine] += 1;
  });

  // calculate mode
  const maxFreq = Math.max(...data)
  const mode = data.findIndex((v) => v == maxFreq)
  setText('text-mode', mode);

  // calculate average
  const avg = states.map(s => s.nRefine).reduce((a, b) => a + b, 0) / states.length;
  setText('text-average', avg.toFixed(2));

  // calculate percentiles
  const sortedNRefine = states.map(s => s.nRefine).sort((a, b) => a - b);
  const p50 = sortedNRefine[Math.floor(sortedNRefine.length * 0.50)]
  const p75 = sortedNRefine[Math.floor(sortedNRefine.length * 0.75)]
  const p95 = sortedNRefine[Math.floor(sortedNRefine.length * 0.90)]
  setText('text-p50', p50);
  setText('text-p75', p75);
  setText('text-p95', p95);

  const sortedPrice = states.map(s => s.cost).sort((a, b) => a - b);
  const p50price = sortedPrice[Math.floor(sortedPrice.length * 0.50)];
  console.log(sortedPrice)
  console.log(p50price)
  setText('text-price', p50price);

  setText('text-base-lv', options.baseLv);
  setText('text-target-lv', options.targetLv);
  setText('text-n-experiment', options.totalExperiment);

  if (chartResult != null) {
    chartResult.destroy();
  }

  chartResult = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...data.keys()],
          datasets: [{
            label: 'Frequency',
            data,
            backgroundColor: 'rgba(173, 216, 230, 0.9)',
          }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Frequency over required refinement times'
          }
        },
        scales: {
              y: {
                  beginAtZero: true,
              }
          },
          layout: {
            padding: 0,
          }
      }
  });

  document.getElementById('result-placeholder-running').style['display'] = 'none';
  document.getElementById('result').style['display'] = 'block';
}

(() => {
  const inputBaseLv = document.getElementById('input-base-lv');
  const inputTargetLv = document.getElementById('input-target-lv');
  const inputTotalExperiment = document.getElementById('input-total-experiment');
  const btnRun = document.getElementById('btn-run');
  
  btnRun.onclick = () => {
    const baseLv = parseInt(inputBaseLv.value);
    const targetLv = parseInt(inputTargetLv.value);
    const totalExperiment = parseInt(inputTotalExperiment.value);

    document.getElementById('result-placeholder').style['display'] = 'none';
    document.getElementById('result-placeholder-running').style['display'] = 'block';

    setTimeout(() => {
      const states = runSimulation(baseLv, targetLv, totalExperiment);
      writeReport(states, { baseLv, targetLv, totalExperiment });        
    }, 100);
  }
})();
