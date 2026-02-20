// THE KITCHEN TABLE — nav.js
// Shared navigation component

const PAGES = [
  { href: 'index.html',     label: '🔥 Today',     id: 'today' },
  { href: 'tasks.html',     label: '📋 Tasks',      id: 'tasks' },
  { href: 'phases.html',    label: '🗺️ Phases',    id: 'phases' },
  { href: 'ecosystem.html',     label: '🌿 Ecosystem',  id: 'ecosystem' },
  { href: 'ecosystem-map.html', label: '🗺️ Map',        id: 'ecosystem-map' },
  { href: 'allies.html',    label: '⭐ Allies',     id: 'allies' },
  { href: 'money.html',     label: '💰 Money',      id: 'money' },
  { href: 'safety.html',    label: '🛡️ Safety',    id: 'safety' },
  { href: 'gaps.html',      label: '❓ Gaps',       id: 'gaps' },
  { href: 'source.html',   label: '✏️ Source',    id: 'source' },
];

export function initNav(currentId) {
  const mount = document.getElementById('nav-mount');
  if (!mount) return;
  mount.innerHTML = `
    <header class="header">
      <div class="header-top">
        <h1>🔥 The Kitchen Table <span>/ Kamunity</span></h1>
        <span class="ver">v3</span>
      </div>
      <nav class="tabs" role="navigation" aria-label="Main navigation">
        ${PAGES.map(p =>
          `<a href="${p.href}" class="tab${p.id === currentId ? ' active' : ''}" aria-current="${p.id === currentId ? 'page' : 'false'}">${p.label}</a>`
        ).join('')}
      </nav>
    </header>
  `;
}
