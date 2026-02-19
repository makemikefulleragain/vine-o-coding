// Kitchen Table — Simple password gate
// Change KT_PASSWORD to whatever you want. This runs before page content renders.

const KT_PASSWORD = 'kamunity2026';
const SESSION_KEY = 'kt-auth';

(function () {
  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  // Inject overlay
  const overlay = document.createElement('div');
  overlay.id = 'kt-auth-overlay';
  overlay.innerHTML = `
    <div class="kt-auth-box">
      <div class="kt-auth-logo">🔥</div>
      <h1 class="kt-auth-title">The Kitchen Table</h1>
      <p class="kt-auth-sub">Internal ops — authorised access only</p>
      <form id="kt-auth-form" autocomplete="off">
        <input
          id="kt-auth-input"
          type="password"
          placeholder="Enter password"
          autocomplete="current-password"
          spellcheck="false"
        />
        <button type="submit">Enter</button>
        <p id="kt-auth-err" class="kt-auth-err" style="display:none">Incorrect password</p>
      </form>
    </div>
  `;

  // Hide the page immediately — documentElement is always available in <head>
  document.documentElement.style.visibility = 'hidden';

  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
      #kt-auth-overlay {
        position: fixed; inset: 0; z-index: 9999;
        background: #1a1714;
        display: flex; align-items: center; justify-content: center;
      }
      .kt-auth-box {
        text-align: center; max-width: 320px; width: 90%; padding: 2rem;
      }
      .kt-auth-logo { font-size: 2.5rem; margin-bottom: 0.5rem; }
      .kt-auth-title {
        font-family: 'Fraunces', Georgia, serif;
        color: #f5f0e8; font-size: 1.5rem; font-weight: 500;
        margin: 0 0 0.25rem;
      }
      .kt-auth-sub {
        color: #8a7f72; font-size: 0.8rem; margin: 0 0 1.5rem;
        font-family: 'DM Sans', sans-serif;
      }
      #kt-auth-form { display: flex; flex-direction: column; gap: 0.75rem; }
      #kt-auth-input {
        background: #2a2522; border: 1px solid #3a3330; border-radius: 6px;
        color: #f5f0e8; font-size: 1rem; padding: 0.6rem 0.9rem;
        text-align: center; outline: none; font-family: 'DM Sans', sans-serif;
      }
      #kt-auth-input:focus { border-color: #7c6d5a; }
      #kt-auth-form button {
        background: #7c6d5a; color: #f5f0e8; border: none; border-radius: 6px;
        padding: 0.6rem; font-size: 0.95rem; cursor: pointer;
        font-family: 'DM Sans', sans-serif;
      }
      #kt-auth-form button:hover { background: #8a7c6a; }
      .kt-auth-err { color: #c0392b; font-size: 0.8rem; margin: 0; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    document.documentElement.style.visibility = 'visible';
    document.getElementById('kt-auth-input').focus();

    document.getElementById('kt-auth-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('kt-auth-input').value;
      if (val === KT_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.remove();
      } else {
        document.getElementById('kt-auth-err').style.display = 'block';
        document.getElementById('kt-auth-input').value = '';
        document.getElementById('kt-auth-input').focus();
      }
    });
  });
})();
