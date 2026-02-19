// THE KITCHEN TABLE — brief.js
// Waymaker Brief — Mon/Wed/Sat — STATE.md → Claude → ElevenLabs → audio player

const BRIEF_LABELS = {
  opener: 'Week Opener',
  pulse:  'Mid-Week Pulse',
  wrap:   'Week Wrap',
};

export function initBrief() {
  const mount = document.getElementById('brief-mount');
  if (!mount) return;

  fetch('/api/brief/status')
    .then(r => r.json())
    .then(data => {
      if (data.exists) {
        renderPlayer(mount, data.url, data.week, data.brief_type);
      } else if (data.brief_day) {
        renderGenerateBtn(mount, data.week, data.brief_type);
      } else {
        renderOffDay(mount, data.week);
      }
    })
    .catch(() => {
      mount.style.display = 'none';
    });
}

function renderPlayer(mount, url, week, briefType) {
  const label = BRIEF_LABELS[briefType] || 'Brief';
  mount.innerHTML = `
    <div class="brief-card">
      <div class="brief-header">
        <span class="brief-icon">🔊</span>
        <div class="brief-meta">
          <span class="brief-title">Waymaker ${label}</span>
          <span class="brief-week">${formatWeek(week)}</span>
        </div>
      </div>
      <audio class="brief-audio" controls preload="none">
        <source src="${url}" type="audio/mpeg">
        Your browser does not support audio.
      </audio>
    </div>`;
}

function renderGenerateBtn(mount, week, briefType) {
  const label = BRIEF_LABELS[briefType] || 'Brief';
  mount.innerHTML = `
    <div class="brief-card brief-empty">
      <div class="brief-header">
        <span class="brief-icon">🔊</span>
        <div class="brief-meta">
          <span class="brief-title">Waymaker ${label}</span>
          <span class="brief-week">${formatWeek(week)} — not yet generated</span>
        </div>
      </div>
      <button class="btn btn-ember brief-btn" id="brief-generate-btn">
        Generate ${label}
      </button>
    </div>`;

  document.getElementById('brief-generate-btn').addEventListener('click', () => {
    generateBrief(mount, week, briefType);
  });
}

function renderOffDay(mount, week) {
  const today = new Date().getDay(); // 0=Sun,1=Mon,...6=Sat
  const nextDay = today < 1 ? 'Monday' : today < 3 ? 'Wednesday' : today < 6 ? 'Saturday' : 'Monday';
  mount.innerHTML = `
    <div class="brief-card brief-empty">
      <div class="brief-header">
        <span class="brief-icon">🔊</span>
        <div class="brief-meta">
          <span class="brief-title">Waymaker Brief</span>
          <span class="brief-week">Next brief: ${nextDay} — <button class="brief-link-btn" id="brief-test-btn">generate now for testing</button></span>
        </div>
      </div>
    </div>`;
  document.getElementById('brief-test-btn').addEventListener('click', () => {
    generateBrief(mount, week, 'opener');
  });
}

function generateBrief(mount, week, briefType) {
  const btn = document.getElementById('brief-generate-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Generating… (20–30 secs)';
  }

  fetch('/api/brief', { method: 'POST' })
    .then(r => r.json())
    .then(data => {
      if (data.url) {
        renderPlayer(mount, data.url, data.week || week, data.brief_type || briefType);
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
