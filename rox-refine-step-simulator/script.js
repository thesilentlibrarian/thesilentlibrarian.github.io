let state = {
  currentLv: 0,
  nUp: 0,
  nDown: 0,
  nBreak: 0,
  nFailed: 0,
  nRefine: 0,
  cost: 0,
  history: [],
}


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
    state.history.push({
      event: 'Upgrade',
      cost: cost,
      fromLv: state.currentLv,
      nextLv: state.currentLv + 1,
    })
    return {
      ...state,
      currentLv: state.currentLv + 1,
      nUp: state.nUp + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost,
    };
  } else if (n < rate.upRate + rate.downRate) {
    state.history.push({
      event: 'Downgrade',
      cost: cost,
      fromLv: state.currentLv,
      nextLv: state.currentLv - 1,
    })
    return {
      ...state,
      currentLv: state.currentLv - 1,
      nDown: state.nDown + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost,
    };
  } else if (n < rate.upRate + rate.downRate + rate.brokeRate) {
    state.history.push({
      event: 'Damage',
      cost: cost,
      fromLv: state.currentLv,
      nextLv: state.currentLv,
    })
    return {
      ...state,
      nBreak: state.nBreak + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost + PRICE.REPAIR,
    };
  } else {
    state.history.push({
      event: 'Failed',
      cost: cost,
      fromLv: state.currentLv,
      nextLv: state.currentLv,
    })
    return {
      ...state,
      nFailed: state.nFailed + 1,
      nRefine: state.nRefine + 1,
      cost: state.cost + cost,
    };
  }
}

function visualise(state) {
  document.getElementById('input-lv').value = state.currentLv;
  document.getElementById('text-upgrade').innerHTML = state.nUp;
  document.getElementById('text-downgrade').innerHTML = state.nDown;
  document.getElementById('text-failed').innerHTML = state.nFailed;
  document.getElementById('text-damage').innerHTML = state.nBreak;
  document.getElementById('text-cost').innerHTML = state.cost;

  const tableHistory = document.getElementById('table-history-tbody');
  tableHistory.innerHTML = "";
  state.history.forEach((h, i) => {
    const row = tableHistory.insertRow(0);
    row.insertCell(0).innerHTML = i + 1;
    row.insertCell(1).innerHTML = h.event;
    row.insertCell(2).innerHTML = h.fromLv;
    row.insertCell(3).innerHTML = h.nextLv;
    row.insertCell(4).innerHTML = h.cost;
  });
}

(() => {
  const inputLv = document.getElementById('input-lv');
  const btnRun = document.getElementById('btn-run');
  const btnReset = document.getElementById('btn-reset');
  
  btnRun.onclick = () => {
    state.currentLv = parseInt(inputLv.value);
    state = refine(state);
    visualise(state);
  }

  btnReset.onclick = () => {
    state = {
      currentLv: 0,
      nUp: 0,
      nDown: 0,
      nBreak: 0,
      nFailed: 0,
      nRefine: 0,
      cost: 0,
      history: [],
    }
    visualise(state);
  }
})();
