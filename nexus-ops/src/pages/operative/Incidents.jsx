import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, CheckCircle2, AlertTriangle, BookOpen, User, Upload, CheckCircle, ChevronRight } from 'lucide-react'
import SystemLog from '../../components/SystemLog'

const tabs = [
  { label: 'Home',      icon: Home,          path: '/operative/dashboard' },
  { label: 'Tasks',     icon: CheckCircle2,  path: '/operative/tasks' },
  { label: 'Incidents', icon: AlertTriangle, path: '/operative/incidents' },
  { label: 'Knowledge', icon: BookOpen,      path: '/operative/knowledge' },
  { label: 'Profile',   icon: User,          path: '/operative/profile' },
]

const pastReports = [
  { id: 'IR-2041', title: 'Exposed live cable near Zone B scaffolding', zone: 'Zone B', severity: 'High', status: 'Resolved', date: 'Jun 3, 2026' },
  { id: 'IR-2038', title: 'Spilled hydraulic fluid — equipment bay', zone: 'Zone D', severity: 'Medium', status: 'In Progress', date: 'Jun 1, 2026' },
  { id: 'IR-2031', title: 'Unsecured overhead load — Crane 2', zone: 'Zone A', severity: 'Low', status: 'Closed', date: 'May 28, 2026' },
]

const submittedLogs = [
   '[Incident Module]: Generating Incident Report ID — UBA-IR-2042…',
  '[Digital Twin]: Flagging affected zone and updating spatial model…',
  '[Notification Engine]: Alerting Compliance Auditor and Zone Supervisor…',
  '[Analytics]: Initiating automated root cause analysis workflow…',
  '[Compliance Portal]: Queuing incident data for regulatory submission…',
   '✓ Incident report successfully created — ID: UBA-IR-2042',
]

export default function OperativeIncidents() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('new')
  const [zone, setZone] = useState('')
  const [type, setType] = useState('')
  const [desc, setDesc] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [photo, setPhoto] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-gradient-to-r from-rose-600 to-rose-700 text-white px-5 py-5">
        <h1 className="text-xl font-bold">Incident Reporting Centre</h1>
        <p className="text-rose-200 text-sm mt-0.5">Document hazards and track resolution status</p>
      </header>

      {/* Tabs */}
      <div className="flex bg-white border-b border-slate-200 sticky top-0 z-10">
        {['new', 'past'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-3.5 text-sm font-semibold transition border-b-2 ${
              activeTab === t ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t === 'new' ? 'Report New Incident' : 'Past Reports'}
          </button>
        ))}
      </div>

      <div className="px-4 py-5 max-w-2xl mx-auto">
        {activeTab === 'new' && (
          submitted ? (
            <div className="space-y-5">
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center">
                <CheckCircle className="text-emerald-500 mx-auto mb-3" size={48} />
                <h3 className="font-bold text-emerald-900 text-lg">Incident Report Submitted</h3>
                <p className="text-emerald-700 text-sm mt-1">ID: <span className="font-mono font-bold">NXS-IR-2042</span></p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-amber-800 mb-2">Automated System Actions Triggered:</p>
                <ul className="space-y-1 text-xs text-amber-700">
                  <li>• Zone flagged and digital twin updated with incident metadata</li>
                   <li>• Formal incident record UBA-IR-2042 generated</li>
                  <li>• Compliance Auditor and Zone Supervisor notified</li>
                  <li>• Root cause analysis workflow initiated</li>
                </ul>
              </div>
              <SystemLog lines={submittedLogs} title="INCIDENT PIPELINE — PROCESSING" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-600">Document all safety concerns to protect your team and maintain site compliance.</p>

              {/* Photo upload */}
              <label className="block border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition">
                <input type="file" accept="image/*" className="hidden" onChange={e => setPhoto(e.target.files[0])} />
                <Upload className="text-slate-400 mx-auto mb-2" size={32} />
                <p className="text-sm font-semibold text-slate-700">
                  {photo ? photo.name : 'Upload Evidence Photo'}
                </p>
                <p className="text-xs text-slate-400 mt-1">GPS metadata will be automatically embedded</p>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Affected Zone</label>
                  <select
                    value={zone}
                    onChange={e => setZone(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    <option value="">Select zone…</option>
                    {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map(z => <option key={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Incident Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    <option value="">Select type…</option>
                    {['Electrical Hazard', 'Fire Risk', 'Structural Risk', 'Chemical Spill', 'Equipment Failure', 'Slip / Trip', 'Other'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Incident Description</label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe what you observed, exact location, and any immediate actions taken…"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 mb-1">On Submission, UBA Will Automatically:</p>
                <p>• Flag the affected zone and update the Digital Twin spatial model</p>
                 <p>• Generate formal Incident Record with unique ID (UBA-IR-XXXX)</p>
                <p>• Dispatch notifications to Compliance Auditor and Zone Supervisor</p>
                <p>• Initiate Root Cause Analysis and remediation workflow</p>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-rose-900/30"
              >
                <AlertTriangle size={18} /> Submit Incident Report
              </button>
            </form>
          )
        )}

        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastReports.map(r => (
              <div key={r.id} className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 hover:shadow-xl transition">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-xs text-slate-400 mb-1">{r.id}</p>
                    <p className="font-bold text-slate-900 text-sm leading-snug">{r.title}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${
                    r.severity === 'High' ? 'bg-rose-100 text-rose-700' :
                    r.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>{r.severity}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                  <span>{r.zone}</span>
                  <span>•</span>
                  <span>{r.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                    r.status === 'In Progress' ? 'bg-violet-100 text-violet-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>{r.status}</span>
                  <button className="text-violet-600 hover:text-violet-800 text-xs font-semibold flex items-center gap-1 transition">
                    View Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
