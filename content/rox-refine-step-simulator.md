---
title: "ROX Refine Step Simulator"
date: 2021-07-28T22:31:15+08:00
draft: false
---

## Summary

This page contains the step-by-step refinement simulator for Ragnarok X.
You may use this for reference before conducting real refinement inside the game, or just for fun.

--
<small>
Note: the crystal cost is only estimation for white 2h weapon, excluding repair cost.
For blue weapon, multiply with 2. For gold weapon, multiply with 4.
</small>

## Refine Step Simulator

<div class="_main">
  <div>
    <div class="input-group">
      <label>Current Level</label>
      <input id="input-lv" type="number" placeholder="base level" value="0">
    </div>
    <div class="input-group">
      <button id="btn-run">Refine</button>
      <button id="btn-reset">Reset</button>
    </div>
  </div>
  <div>
    <h4>History</h4>
    <table class="bold-first-td">
      <tr>
        <td>count upgrade:</td>
        <td id="text-upgrade">0</td>
      </tr>
      <tr>
        <td>count downgrade:</td>
        <td id="text-downgrade">0</td>
      </tr>
      <tr>
        <td>count failed:</td>
        <td id="text-failed">0</td>
      </tr>
      <tr>
        <td>count damage:</td>
        <td id="text-damage">0</td>
      </tr>
      <tr>
        <td>total cost:</td>
        <td id="text-cost">0</td>
      </tr>
    </table>
    <table id="table-history">
      <thead>
        <tr>
          <th>#</th>
          <th>Result</th>
          <th>From Lv</th>
          <th>To Lv</th>
          <th>Crystal Cost</th>
        </tr>
      </thead>
      <tbody id="table-history-tbody"></tbody>
    </table>
  </div>
</div>

<style>
  ._main {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  ._main .input-group {
    margin-bottom: 20px;
  }

  ._main label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ._main input {
    font-size: 20px;
    border-radius: 4px;
    border: 2px solid #333;
    padding: 4px 8px;
  }

  ._main button {
    padding: 8px 20px;
    font-size: 20px;
    border-radius: 4px;
    border: 2px solid #333;
    cursor: pointer;
  }

  ._main button:active {
    background-color: #999;
  }

  ._main table {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  ._main table td, th {
    font-size: 14px;
  }

  ._main table.bold-first-td td:first-child {
    font-weight: bold;
    background: rgba(0, 0, 0, 0.025);
  }

  #result, #result-placeholder-running {
    display: none;
  }
</style>

<script src="/rox-refine-step-simulator/script.js"></script>
