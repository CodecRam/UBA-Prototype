import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Network, Search, ChevronDown, LogOut, Shield, User, Copy } from 'lucide-react'

const roleLabels = {
  operative: 'Field Operative',
  supervisor: 'Zone Supervisor',
  director: 'Operations Director',
  coordinator: 'Asset Coordinator',
  auditor: 'Compliance Auditor',
  admin: 'Platform Administrator',
}

const roleColors = {
  operative:  'bg-emerald-600',
  supervisor: 'bg-cyan-600',
  director:   'bg-uba-700',
  coordinator:'bg-amber-600',
  auditor:    'bg-rose-600',
  admin:      'bg-slate-700',
}

export default function Header({ role, userName = 'Alex Morgan' }) {
  const navigate = useNavigate()
  const [dropOpen, setDropOpen] = useState(false)
  const passportId = `NXS-${Math.random().toString(36).slice(2,10).toUpperCase()}`

  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-uba-700 rounded-lg flex items-center justify-center shadow">
            <Network className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">UBA</span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search operations, assets, reports..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-uba-500 focus:border-uba-500 transition"
          />
        </div>

        {/* User dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition"
          >
            <div className={`w-9 h-9 rounded-full ${roleColors[role] || 'bg-uba-700'} flex items-center justify-center text-white text-sm font-bold`}>
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-slate-900 leading-tight">{userName}</p>
              <p className="text-xs text-slate-500">{roleLabels[role] || role}</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>

          {dropOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50">
              <div className="flex flex-col items-center text-center mb-5">
                <div className={`w-20 h-20 rounded-2xl ${roleColors[role] || 'bg-violet-700'} flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg`}>
                  {userName.split(' ').map(n => n[0]).join('')}
                </div>
                <p className="text-lg font-bold text-slate-900">{userName}</p>
                <span className="mt-1.5 px-4 py-1 bg-uba-100 text-uba-700 text-xs font-bold rounded-full">
                  {roleLabels[role] || role}
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-5">
                <p className="text-xs text-slate-500 mb-1 font-medium">Digital Identity Token</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm font-semibold text-slate-700">{passportId}</p>
                  <button className="text-slate-400 hover:text-uba-600 transition">
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => { setDropOpen(false); navigate('/login') }}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
