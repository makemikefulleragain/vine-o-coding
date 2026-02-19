// THE KITCHEN TABLE — brief.js
// Monday Morning Brief — STATE.md → Claude → ElevenLabs → audio player

export function initBrief() {
  const mount = document.getElementById('brief-mount');
  if (!mount) return;

  fetch('/api/brief/status')
    .then(r => r.json())
    .then(data => {
      if (data.exists) {
        renderPlayer(mount, data.url, data.week);
      } else {
        renderGenerateBtn(mount, data.week);
      }
    })
    .catch(() => {
      // Server not running with brief support — hide silently
      mount.style.display = 'none';
    });
}

function renderPlayer(mount, url, week) {
  mount.innerHTML = `
    <div class="brief-card">
      <div class="brief-header">
        <span class="brief-icon">🔊</span>
        <div class="brief-meta">
          <span class="brief-title">Monday Brief</span>
          <span class="brief-week">${formatWeek(week)}</span>
        </div>
      </div>
      <audio class="brief-audio" controls preload="none">
        <source src="${url}" type="audio/mpeg">
        Your browser does not support audio.
      </audio>
    </div>`;
}

function renderGenerateBtn(mount, week) {
  mount.innerHTML = `
    <div class="brief-card brief-empty">
      <div class="brief-header">
        <span class="brief-icon">🔊</span>
        <div class="brief-meta">
          <span class="brief-title">Monday Brief</span>
          <span class="brief-week">${formatWeek(week)} — not yet generated</span>
        </div>
      </div>
      <button class="btn btn-ember brief-btn" id="brief-generate-btn">
        Generate this week's brief
      </button>
    </div>`;

  document.getElementById('brief-generate-btn').addEventListener('click', () => {
    generateBrief(mount, week);
  });
}

function generateBrief(mount, week) {
  const btn = document.getElementById('brief-generate-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Generating… (20–30 secs)';
  }

  fetch('/api/brief', { method: 'POST' })
    .then(r => r.json())
    .then(data => {
      if (data.url) {
        renderPlayer(mount, data.url, week);
      } else {
        if (btn) { btn.disabled = false; btn.textContent = 'Try again'; }
        console.error('Brief error:', data.error);
        const errEl = document.createElement('p');
        errEl.className = 'brief-error';
        errEl.textContent = `Error: ${data.error || 'Unknown error'}`;
        mount.querySelector('.brief-card').appendChild(errEl);
      }
    })
    .catch(err => {
      if (btn) { btn.disabled = false; btn.textContent = 'Try again'; }
      console.error('Brief fetch error:', err);
    });
}

function formatWeek(week) {
  const [year, w] = week.split('-W');
  return `Week ${parseInt(w, 10)}, ${year}`;
}
