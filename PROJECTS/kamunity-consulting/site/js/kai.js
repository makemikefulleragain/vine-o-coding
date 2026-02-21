/* kai.js — Kai floating action button, draggable, chat panel */

(function () {
  'use strict';

  var fab   = document.getElementById('kai-fab');
  var panel = document.getElementById('kai-panel');
  var msgs  = document.getElementById('kai-messages');
  var input = document.getElementById('kai-input');
  var sendBtn = document.getElementById('kai-send');
  var closeBtn = document.getElementById('kai-close');
  if (!fab || !panel) return;

  var history   = [];
  var firstCall = true;
  var isOpen    = false;

  /* ── Toggle panel ── */
  function openPanel() {
    isOpen = true;
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    input.focus();
  }
  function closePanel() {
    isOpen = false;
    panel.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  closeBtn.addEventListener('click', closePanel);

  /* Escape key closes panel */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  /* ── Append a message bubble ── */
  function appendBubble(role, text) {
    var div = document.createElement('div');
    div.className = 'kai-bubble kai-bubble-' + role;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  /* ── Send message to Netlify Function ── */
  function sendMessage() {
    var text = input.value.trim();
    if (!text) return;

    appendBubble('user', text);
    history.push({ role: 'user', content: text });
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    var label = firstCall
      ? 'Kai is waking up\u2026 (cold starts happen \u2014 give her a moment)'
      : 'Thinking\u2026';
    var thinking = appendBubble('ai', label);
    thinking.classList.add('kai-thinking');
    firstCall = false;

    fetch('/.netlify/functions/kai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        thinking.remove();
        var reply = data.reply || 'Something went wrong. Try again shortly.';
        appendBubble('ai', reply);
        history.push({ role: 'assistant', content: reply });
      })
      .catch(function () {
        thinking.remove();
        appendBubble('ai', 'Couldn\u2019t reach Kai right now. Try again in a moment.');
      })
      .finally(function () {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
      });
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  /* ── Draggable FAB (Pointer Events) ── */
  var DRAG_THRESHOLD = 6; /* px — prevents mobile tap jitter triggering drag */
  var dragging  = false;
  var moved     = false;
  var ox = 0, oy = 0;
  var startClientX = 0, startClientY = 0;

  fab.addEventListener('pointerdown', function (e) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragging = true;
    moved    = false;
    var r = fab.getBoundingClientRect();
    ox = e.clientX - r.left;
    oy = e.clientY - r.top;
    startClientX = e.clientX;
    startClientY = e.clientY;
    fab.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  fab.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - startClientX;
    var dy = e.clientY - startClientY;
    if (!moved && Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;
    moved = true;
    var nx = e.clientX - ox;
    var ny = e.clientY - oy;
    nx = Math.max(0, Math.min(window.innerWidth  - fab.offsetWidth,  nx));
    ny = Math.max(0, Math.min(window.innerHeight - fab.offsetHeight, ny));
    fab.style.left   = nx + 'px';
    fab.style.top    = ny + 'px';
    fab.style.right  = 'auto';
    fab.style.bottom = 'auto';
  });

  fab.addEventListener('pointerup', function (e) {
    dragging = false;
    if (!moved) {
      /* It was a tap/click, not a drag — toggle panel */
      if (isOpen) { closePanel(); } else { openPanel(); }
    }
    moved = false;
  });

})();
