import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, CheckCircle2, AlertTriangle, BookOpen, User, Award, Clock, Edit2, Save } from 'lucide-react'

const tabs = [
  { label: 'Home',      icon: Home,          path: '/operative/dashboard' },
  { label: 'Tasks',     icon: CheckCircle2,  path: '/operative/tasks' },
  { label: 'Incidents', icon: AlertTriangle, path: '/operative/incidents' },
  { label: 'Knowledge', icon: BookOpen,      path: '/operative/knowledge' },
  { label: 'Profile',   icon: User,          path: '/operative/profile' },
]

const certifications = [
  { name: 'Electrical Safety Certificate', expiry: 'Dec 2027', valid: true },
  { name: 'Working at Heights', expiry: 'Jun 2027', valid: true },
  { name: 'Confined Spaces Entry', expiry: 'Jan 2027', valid: true },
  { name: 'First Aid Certificate Level 2', expiry: 'Mar 2026', valid: false },
  { name: 'Elevated Work Platform', expiry: 'Aug 2027', valid: true },
]

const recentActivity = [
  { action: 'Completed Task: HVAC Duct Inspection', sub: 'Zone B · Floor 3', time: '2 hours ago' },
  { action: 'Checked In at Site', sub: 'Zone A · Main Facility', time: '4 hours ago' },
  { action: 'Submitted Incident Report — UBA-IR-2041', sub: 'Zone B', time: 'Yesterday' },
  { action: 'Accessed AR Guide: Conduit Installation', sub: 'Knowledge Base', time: '2 days ago' },
]

export default function OperativeProfile() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@uba-ops.com',
    phone: '+61 412 345 678',
    license: 'OL-78432',
    clearance: 'CL-2-UBA',
    specialty: 'HVAC & Electrical Systems',
    since: '2024-03-10',
  })

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-gradient-to-r from-violet-700 to-violet-800 text-white px-5 py-5">
        <h1 className="text-xl font-bold">Operator Profile</h1>
        <p className="text-violet-300 text-sm mt-0.5">Your identity token and credentials</p>
      </header>

      <div className="px-4 py-5 max-w-2xl mx-auto space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Tasks Done', value: '61', color: 'text-violet-700' },
            { label: 'Hours Logged', value: '204', color: 'text-cyan-600' },
            { label: 'Incidents', value: '4', color: 'text-rose-600' },
            { label: 'Certifications', value: '5', color: 'text-emerald-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-3 border border-slate-200 text-center shadow-sm">
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Profile details */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-900">Identity Details</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-800 transition"
            >
              {editing ? <><Save size={15} /> Save</> : <><Edit2 size={15} /> Edit</>}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries({
              'Full Name': 'name',
              'Email': 'email',
              'Phone': 'phone',
              'Operator License': 'license',
              'Site Clearance': 'clearance',
              'Specialty': 'specialty',
            }).map(([label, key]) => (
              <div key={key}>
                <p className="text-xs text-slate-500 font-semibold mb-1">{label}</p>
                {editing ? (
                  <input
                    value={profile[key]}
                    onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-violet-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900">{profile[key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="text-violet-600" size={18} /> Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map(cert => (
              <div key={cert.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cert.valid ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                    <Award size={16} className={cert.valid ? 'text-emerald-600' : 'text-rose-600'} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-xs text-slate-500">Expires: {cert.expiry}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cert.valid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {cert.valid ? 'Valid' : 'Expired'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Identity Status */}
        <div className="bg-violet-50 rounded-2xl border-2 border-violet-200 p-5">
          <p className="text-sm font-bold text-violet-900 mb-2">Digital Identity Token Status</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-700 font-semibold">Verified &amp; Active</span>
          </div>
          <p className="font-mono text-sm text-cyan-700 font-bold">UBA-OP-{Math.random().toString(36).slice(2,10).toUpperCase()}</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="text-violet-600" size={18} /> Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{a.action}</p>
                  <p className="text-xs text-slate-500">{a.sub} • {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-50">
        <div className="flex max-w-2xl mx-auto">
          {tabs.map(({ label, icon: Icon, path }) => {
            const active = window.location.pathname === path
            return (
              <button key={label} onClick={() => navigate(path)} className="flex-1 flex flex-col items-center gap-1 py-3">
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
