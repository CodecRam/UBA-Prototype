// ─── Shared UBA Platform UI Components ─────────────────────────────────────

const UBA = {
  roleLabels: {
    operative:   'Field Operative',
    supervisor:  'Zone Supervisor',
    director:    'Operations Director',
    coordinator: 'Asset Coordinator',
    auditor:     'Compliance Auditor',
    admin:       'Platform Administrator',
  },
  roleColors: {
    operative:   'bg-emerald-600',
    supervisor:  'bg-cyan-600',
    director:    'bg-cyan-700',
    coordinator: 'bg-amber-600',
    auditor:     'bg-rose-600',
    admin:       'bg-slate-700',
  },
  roleRingColors: {
    operative:   '#059669',
    supervisor:  '#0891b2',
    director:    '#0ea5b4',
    coordinator: '#d97706',
    auditor:     '#e11d48',
    admin:       '#475569',
  },

  createHeader(role, userName) {
    const initials = userName.split(' ').map(n => n[0]).join('').slice(0,2)
    const label = this.roleLabels[role] || role
    const passportId = 'UBA-' + Math.random().toString(36).slice(2,10).toUpperCase()
    return `
    <header class="h-16 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div class="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-6">
        <div class="flex items-center gap-3 shrink-0">
              <div class="w-9 h-9 bg-cyan-700 rounded-lg flex items-center justify-center shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          </div>
                <span class="text-lg font-bold text-slate-900 tracking-tight">UBA</span>
        </div>
        <div class="relative flex-1 max-w-xl">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search operations, assets, reports..." class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
        </div>
            <div class="relative shrink-0">
          <button onclick="toggleDropdown()" class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition" id="userBtn">
            <div class="w-9 h-9 rounded-full ${this.roleColors[role] || 'bg-cyan-700'} flex items-center justify-center text-white text-sm font-bold">${initials}</div>
            <div class="text-left hidden md:block">
              <p class="text-sm font-semibold text-slate-900 leading-tight">${userName}</p>
              <p class="text-xs text-slate-500">${label}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div id="userDropdown" class="hidden absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50">
            <div class="flex flex-col items-center text-center mb-5">
              <div class="w-20 h-20 rounded-2xl ${this.roleColors[role] || 'bg-cyan-700'} flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">${initials}</div>
                <p class="text-lg font-bold text-slate-900">${userName}</p>
                <span class="mt-1.5 px-4 py-1 bg-cyan-100 text-cyan-700 text-xs font-bold rounded-full">${label}</span>
            </div>
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-5">
              <p class="text-xs text-slate-500 mb-1 font-medium">Digital Identity Token</p>
              <p class="font-mono text-sm font-semibold text-slate-700">${passportId}</p>
            </div>
            <a href="../index.html" class="block w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-center transition shadow text-sm">Sign Out</a>
          </div>
        </div>
      </div>
    </header>`
  },

  createSidebar(items, currentPath) {
    const links = items.map(({ label, href, iconSvg }) => {
      const active = currentPath.endsWith(href) || currentPath.endsWith(href.replace('.html',''))
      return `<a href="${href}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}">
        ${iconSvg}
        ${label}
      </a>`
    }).join('')
    return `
    <aside class="w-60 shrink-0 bg-slate-900 min-h-[calc(100vh-4rem)] flex flex-col">
      <nav class="flex-1 px-3 py-4 space-y-1">${links}</nav>
      <div class="px-3 pb-4"><div class="border-t border-slate-800 pt-3"><p class="text-xs text-slate-600 text-center px-2">UBA Ops v1.0</p></div></div>
    </aside>`
  },

  createSystemLog(lines, title = 'UBA SYSTEM LOG') {
    const lineHtml = lines.map(l => `<p class="font-mono text-xs text-slate-300 leading-relaxed"><span class="text-cyan-400 mr-2">▶</span>${l}</p>`).join('')
    return `
    <div class="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
      <div class="flex items-center gap-2 px-5 py-3 border-b border-slate-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3fb3dd" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
        <span class="text-xs font-bold text-cyan-400 tracking-widest">${title}</span>
        <span class="ml-auto flex items-center gap-1.5">
          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span class="text-xs text-emerald-400 font-mono">LIVE</span>
        </span>
      </div>
      <div class="p-5 space-y-1.5">${lineHtml}</div>
    </div>`
  },

  icons: {
    dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    users:    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    key:      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    file:     '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    settings: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>',
    trending: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    box:      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    cpu:      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    truck:    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    package:  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    map:      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    shield:   '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    server:   '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    logs:     '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  }
}

function toggleDropdown() {
  const d = document.getElementById('userDropdown')
  d.classList.toggle('hidden')
}

document.addEventListener('click', e => {
  const btn = document.getElementById('userBtn')
  const drop = document.getElementById('userDropdown')
  if (drop && btn && !btn.contains(e.target) && !drop.contains(e.target)) {
    drop.classList.add('hidden')
  }
})
