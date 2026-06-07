import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, CheckCircle2, AlertTriangle, BookOpen, User, Home, Wifi, WifiOff, RefreshCw, Activity, Clock } from 'lucide-react'
import SystemLog from '../../components/SystemLog'

const tabs = [
  { label: 'Home',       icon: Home,          path: '/operative/dashboard' },
  { label: 'Tasks',      icon: CheckCircle2,  path: '/operative/tasks' },
  { label: 'Incidents',  icon: AlertTriangle, path: '/operative/incidents' },
  { label: 'Knowledge',  icon: BookOpen,      path: '/operative/knowledge' },
  { label: 'Profile',    icon: User,          path: '/operative/profile' },
]

const initLogs = [
  '[Identity Module]: Validating operator token against UBA Auth Service…',
  '[Geofence Engine]: GPS coordinates received — triangulating zone boundary…',
  '[Integration]: Cross-referencing SAP ERP workforce registry…',
  '[Access Control]: Operator clearance level verified — Tier 2 Access granted.',
  '[System]: Digital Twin sync complete. Zone data up to date.',
]

export default function OperativeDashboard() {
  const navigate = useNavigate()
  const [checkedIn, setCheckedIn] = useState(true)
  const [insideZone, setInsideZone] = useState(true)
  const [logs, setLogs] = useState(initLogs)

  function toggleLocation() {
    const next = !insideZone
    setInsideZone(next)
    setCheckedIn(false)
    setLogs(prev => [
      ...prev,
      `[Geofence Engine]: Location toggled — operator is ${next ? 'inside' : 'outside'} Zone Boundary.`,
      next
        ? '[Access Control]: Zone perimeter confirmed. Check-in available.'
        : '[Access Control]: Operator outside designated zone. Check-in suspended.',
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Top bar */}
      <header className="bg-gradient-to-r from-violet-700 to-violet-800 text-white px-5 py-4 shadow-xl shadow-violet-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-lg">AM</div>
            <div>
              <p className="font-bold text-lg leading-tight">Welcome back, Alex</p>
              <p className="text-violet-200 text-sm flex items-center gap-1">
                <Clock size={12} />
                {new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-xl">
            <Activity size={14} />
            <span className="text-xs font-semibold">Shift Active</span>
          </div>
        </div>
      </header>

      <div className="px-4 py-5 space-y-5 max-w-2xl mx-auto">
        {/* GPS Geofencing Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2 px-6 pt-5 pb-3">
            <MapPin size={18} className="text-violet-600" />
            <h2 className="font-bold text-slate-900">GPS Geofencing &amp; Zone Access</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
            {/* Map simulation */}
            <div className={`rounded-2xl p-6 border-2 flex flex-col items-center justify-center gap-3 min-h-36 transition-all ${
              insideZone
                ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-400'
                : 'bg-gradient-to-br from-rose-50 to-rose-100 border-rose-400'
            }`}>
              <MapPin size={40} className={insideZone ? 'text-emerald-600' : 'text-rose-500'} />
              <p className="text-xs font-bold tracking-widest uppercase text-slate-600">Zone Boundary</p>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                insideZone ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {insideZone ? 'Inside Zone' : 'Outside Zone'}
              </span>
            </div>

            {/* Control panel */}
            <div className="space-y-3">
              <div className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${
                checkedIn
                  ? 'bg-emerald-50 border-emerald-300'
                  : insideZone
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-rose-50 border-rose-300'
              }`}>
                {checkedIn
                  ? <CheckCircle2 className="text-emerald-600 shrink-0" size={22} />
                  : insideZone
                    ? <Wifi className="text-amber-600 shrink-0" size={22} />
                    : <WifiOff className="text-rose-600 shrink-0" size={22} />
                }
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {checkedIn ? 'Checked In Successfully' : insideZone ? 'Ready to Check In' : 'Access Suspended'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {checkedIn ? 'Zone A · Main Facility' : insideZone ? 'GPS confirmed within perimeter' : 'Re-enter zone to check in'}
                  </p>
                </div>
              </div>

              {!checkedIn && insideZone && (
                <button
                  onClick={() => setCheckedIn(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow"
                >
                  <CheckCircle2 size={16} /> Check In Now
                </button>
              )}

              <button
                onClick={toggleLocation}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
              >
                <RefreshCw size={14} /> Demo: Toggle GPS Location
              </button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: AlertTriangle, label: 'Report Incident', sub: 'Flag safety risks', color: 'bg-rose-50 border-rose-200', icon_c: 'text-rose-600', path: '/operative/incidents' },
            { icon: CheckCircle2, label: 'My Tasks', sub: 'View assignments', color: 'bg-violet-50 border-violet-200', icon_c: 'text-violet-600', path: '/operative/tasks' },
            { icon: BookOpen, label: 'Knowledge Base', sub: 'AR guides & docs', color: 'bg-cyan-50 border-cyan-200', icon_c: 'text-cyan-600', path: '/operative/knowledge' },
          ].map(({ icon: Icon, label, sub, color, icon_c, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl border-2 ${color} hover:shadow-md transition-all`}
            >
              <Icon className={icon_c} size={28} />
              <div>
                <p className="text-xs font-bold text-slate-900">{label}</p>
                <p className="text-xs text-slate-500 hidden sm:block">{sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* System Log */}
        <SystemLog lines={logs} title="UBA GEOFENCE ENGINE — LIVE" />
      </div>

      {/* Bottom Tab Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-50">
        <div className="flex max-w-2xl mx-auto">
          {tabs.map(({ label, icon: Icon, path }) => {
            const active = window.location.pathname === path
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex-1 flex flex-col items-center gap-1 py-3 transition"
              >
                <Icon size={20} className={active ? 'text-violet-600' : 'text-slate-400'} />
                <span className={`text-xs font-semibold ${active ? 'text-violet-600' : 'text-slate-400'}`}>{label}</span>
                {active && <span className="w-8 h-0.5 bg-violet-600 rounded-full" />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
