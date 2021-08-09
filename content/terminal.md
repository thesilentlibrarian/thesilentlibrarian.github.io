---
title: "Terminal"
date: 2021-08-04T20:31:07+08:00
draft: false
---

<div id="terminal" style="margin-top: 40px;"></div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.css" integrity="sha512-iLYuqv+v/P4u9erpk+KM83Ioe/l7SEmr7wB6g+Kg1qmEit8EShDKnKtLHlv2QXUp7GGJhmqDI+1PhJYLTsfb8w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js" integrity="sha512-2PRgAav8Os8vLcOAh1gSaDoNLe1fAyq8/G3QSdyjFFD+OqNjLeHE/8q4+S4MEZgPsuo+itHopj+hJvqS8XUQ8A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
  const term = new Terminal();
  term.open(document.getElementById('terminal'));
  term.write('This console is not working yet. Please use the chrome console.')
</script>

<script src="/terminal/rox-enchant.js"></script>
