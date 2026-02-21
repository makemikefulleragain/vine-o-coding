/* version.js — URL parameter copy routing
   Reads ?v=priya to serve Version 3 copy.
   Default (no param / ?v=ceo) serves Version 4 copy.
   Copy is locked in CONSTITUTION.md — do not modify text here without Mike's approval. */

(function () {
  const COPY = {
    v3: [
      "Good work is possible. Even here. Especially here.",
      "We've sat in those meetings. We know what you're carrying.",
      "And we know the thing you haven't said out loud yet."
    ],
    v4: [
      "Cutting hours. Reducing services. Doing it anyway.",
      "The WA community sector is carrying more than it should have to.",
      "You don't need another framework. You need someone who's been inside it."
    ]
  };

  function getVersion() {
    const params = new URLSearchParams(window.location.search);
    const v = (params.get('v') || '').toLowerCase().trim();
    return v === 'priya' ? 'v3' : 'v4';
  }

  function renderHook(lines) {
    return lines.map(function (line) {
      return '<p>' + line + '</p>';
    }).join('\n');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const hookEl = document.getElementById('hook-copy');
    if (!hookEl) return;

    const version = getVersion();
    hookEl.innerHTML = renderHook(COPY[version]);

    const bodyEl = document.body;
    bodyEl.setAttribute('data-version', version);
  });
})();
