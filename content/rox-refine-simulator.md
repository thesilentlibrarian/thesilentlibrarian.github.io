---
title: "ROX Refine Simulator"
date: 2021-07-28T15:32:21+08:00
draft: false
---

## Summary

This page contains the refinement simulator for Ragnarok X.
In this game, refining equipment has a variable chance to upgrade, failed, damage, and even downgrade.
This simulator helps conduct a controlled experiment on this refinement mechanism,
producing a report that may or may not be valuable for making refinement decisions inside the game.


## Simulator

### Input Parameters

To use the simulator, please input the experiment parameters.
Then click the "Run Simulation" button.

<div class="_rox_refine_simulator">
  <div class="input-group">
    <label>Base Level</label>
    <input id="input-base-lv" type="number" placeholder="base level" value="0">
  </div>
  <div class="input-group">
    <label>Target Level</label>
    <input id="input-target-lv" type="number" placeholder="target level" value="6">
  </div>
  <div class="input-group">
    <label>Total Experiment</label>
    <input id="input-total-experiment" type="number" placeholder="total experiment" value="100000">
  </div>
  <div class="input-group">
    <button id="btn-run">Run Simulation</button>
  </div>
</div>


### Simulation Result

<div class="_rox_refine_simulator">
  <div id="result-placeholder">
    Please run the simulation to view the result.
  </div>
  <div id="result-placeholder-running">
    Running the simulation, please wait...
  </div>
  <div id="result">
    <div>
      <h4>Simulation Report Table</h4>
      <table>
        <tr>
          <td>Base Lv</td>
          <td class="text-base-lv"></td>
        </tr>
        <tr>
          <td>Target Lv</td>
          <td class="text-target-lv"></td>
        </tr>
        <tr>
          <td>Total Experiment</td>
          <td class="text-n-experiment"></td>
        </tr>
        <tr>
          <td>P50 refine times</td>
          <td class="text-p50"></td>
        </tr>
        <tr>
          <td>P75 refine times</td>
          <td class="text-p75"></td>
        </tr>
        <tr>
          <td>P95 refine times</td>
          <td class="text-p95"></td>
        </tr>
        <tr>
          <td>P50 Crystal cost <small>(2h white)</small></td>
          <td class="text-price"></td>
        </tr>
        <tr>
          <td>Mode</td>
          <td class="text-mode"></td>
        </tr>
        <tr>
          <td>Average</td>
          <td class="text-average"></td>
        </tr>
      </table>
    </div>
    <div>
      <h4>Required Refinements Frequency Charts</h4>
      <canvas id="chart-result" width="400" height="400"></canvas>
    </div>
    <div>
      <h4>How many times should you refine to reach the target level?</h4>
      <p>From the simulation, we can conclude the following statements:</p>
      <ul>
        <li>
          Most of the experiment need <b class="text-mode">X</b> refinements to reach the target level. (see <code>mode</code>)
        </li>
        <li>
          If you are the average guy with normal luck, you can see the <code>p50</code>.
          During the simulation, 50% of the experiment reach the target level after <b class="text-p50">X</b> refinements.
        </li>
        <li>
          If you have a tendency with slightly bad luck, you can see the <code>p75</code>.
          During the simulation, 75% of the experiment reach the target level after <b class="text-p75">X</b> refinements.
        </li>
        <li>
          If you are pessimistic and have super horrible bad luck, you can see the <code>p95</code>.
          During the simulation, 95% of the experiment reach the target level after <b class="text-p95">X</b> refinements.
        </li>
      </ul>
    </div>
  </div>
</div>


<style>
  ._rox_refine_simulator {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  ._rox_refine_simulator .input-group {
    margin-bottom: 20px;
  }

  ._rox_refine_simulator label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ._rox_refine_simulator input {
    font-size: 20px;
    border-radius: 4px;
    border: 2px solid #333;
    padding: 4px 8px;
  }

  ._rox_refine_simulator button {
    padding: 8px 20px;
    font-size: 20px;
    border-radius: 4px;
    border: 2px solid #333;
    cursor: pointer;
  }

  ._rox_refine_simulator button:active {
    background-color: #999;
  }

  ._rox_refine_simulator table {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  ._rox_refine_simulator table td {
    font-size: 14px;
  }

  ._rox_refine_simulator table td:first-child {
    font-weight: bold;
  }

  #result, #result-placeholder-running {
    display: none;
  }
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js@3.4.1/dist/chart.min.js"></script>
<script src="/rox-refine-simulator/script.js"></script>
