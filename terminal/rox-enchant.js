const ENCHANTMENT_RATE = [
  { upgrade: 1.00, downgrade: 0.00, cost: 2 },
  { upgrade: 0.50, downgrade: 0.00, cost: 2 },
  { upgrade: 0.33, downgrade: 0.22, cost: 2 },
  { upgrade: 0.25, downgrade: 0.25, cost: 2 },
  { upgrade: 0.25, downgrade: 0.25, cost: 4 },
  { upgrade: 0.17, downgrade: 0.28, cost: 4 },
  { upgrade: 0.13, downgrade: 0.29, cost: 4 },
  { upgrade: 0.10, downgrade: 0.30, cost: 4 },
  { upgrade: 0.10, downgrade: 0.30, cost: 6 },
  { upgrade: 0.08, downgrade: 0.31, cost: 6 },
  { upgrade: 0.00, downgrade: 0.31, cost: 6 },  // in SEA, upgrade to Lv 11 is not implemented yet
]

const EnchantAttributes = {
  prontera: ['STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK'],
}

const EnchantResult = {
  UPGRADE: 'UPGRADE',
  DOWNGRADE: 'DOWNGRADE',
  STAY: 'STAY',
}

function rngEnchantAttribute(city) {
  const poolAttrs = EnchantAttributes[city]
  return poolAttrs[Math.floor(Math.random() * poolAttrs.length)];
}

function rngEnchantResult(lv) {
  const n = Math.random()
  if (n < ENCHANTMENT_RATE[lv].upgrade) {
    return EnchantResult.UPGRADE;
  } else if (n < ENCHANTMENT_RATE[lv].upgrade + ENCHANTMENT_RATE[lv].downgrade) {
    return EnchantResult.DOWNGRADE;
  } else {
    return EnchantResult.STAY;
  }
}

function doEnchant(state) {
  const { 
    currentLv,
    history,
    currentAttr,
    targetAttribute,
    city,
    cost,
  } = state;

  const attr = rngEnchantAttribute(city);
  const result = rngEnchantResult(currentLv);
  const enchantCost = ENCHANTMENT_RATE[currentLv].cost;

  if (result == EnchantResult.UPGRADE) {
    return {
      ...state,
      currentLv: currentLv + 1,
      currentAttr: attr,
      history: history.concat(result),
      cost: cost + enchantCost,
    }
  } else if (result == EnchantResult.DOWNGRADE) {
    return {
      ...state,
      history: history.concat(result),
      cost: cost + enchantCost,
    }
  } else if (result == EnchantResult.STAY) {
    const nextAttr = attr == targetAttribute ? attr : currentAttr;
    return {
      ...state,
      currentLv: currentLv,
      currentAttr: nextAttr,
      history: history.concat(result),
      cost: cost + enchantCost,
    }
  } else {
    console.error('wtf? ' + result);
  }
}

function doEnchantUntilTarget(initialState) {
  let state = initialState;
  while (state.currentLv < initialState.targetLv || state.currentAttr != initialState.targetAttribute) {
    state = doEnchant(state);
  }
  return state;
}

function simulateEnchant({
  currentLv = 0,
  currentAttr = null,
  history = [],
  city = 'prontera',
  targetLv = 6,
  targetAttribute = 'DEX',
  n = 10000
}) {

  const initialState = {
    currentLv,
    currentAttr,
    history,
    city,
    targetLv,
    targetAttribute,
    cost: 0,
  }
  const states = [];
  for (let i = 0; i < n; i += 1) {
    const state = doEnchantUntilTarget(initialState);
    states.push(state);
  }

  const nEnchants = states.map(s => s.history.length);
  const nEnchantsSorted = nEnchants.sort((a, b) => a - b);
  const p50 = nEnchantsSorted[Math.floor(nEnchantsSorted.length * 0.50)]
  const p75 = nEnchantsSorted[Math.floor(nEnchantsSorted.length * 0.75)]
  const p95 = nEnchantsSorted[Math.floor(nEnchantsSorted.length * 0.90)]

  const costs = states.map(s => s.cost);
  const costsSorted = costs.sort((a, b) => a - b);
  const p50cost = costsSorted[Math.floor(costsSorted.length * 0.50)]
  const p75cost = costsSorted[Math.floor(costsSorted.length * 0.75)]
  const p95cost = costsSorted[Math.floor(costsSorted.length * 0.90)]

  const result = {
    nEnchant: {
      p50,
      p75,
      p95,  
    },
    cost: {
      p50: p50cost,
      p75: p75cost,
      p95: p95cost,
    }
  }

  console.log(JSON.stringify(result, null, 2));
  return result;
}
