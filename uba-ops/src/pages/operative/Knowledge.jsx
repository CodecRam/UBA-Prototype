import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, CheckCircle2, AlertTriangle, BookOpen, User, Scan, FileText, Box, Play, Cpu, X, ChevronRight, Download } from 'lucide-react'

const tabs = [
  { label: 'Home',      icon: Home,          path: '/operative/dashboard' },
  { label: 'Tasks',     icon: CheckCircle2,  path: '/operative/tasks' },
  { label: 'Incidents', icon: AlertTriangle, path: '/operative/incidents' },
  { label: 'Knowledge', icon: BookOpen,      path: '/operative/knowledge' },
  { label: 'Profile',   icon: User,          path: '/operative/profile' },
]

const guides = [
  { icon: FileText, label: 'PDF Document Viewer', desc: 'Access technical manuals and compliance documents', color: 'bg-blue-50 border-blue-200', icon_c: 'text-blue-600' },
  { icon: Box, label: '3D Interactive Model', desc: 'Rotate and inspect equipment assemblies in 3D', color: 'bg-cyan-50 border-cyan-200', icon_c: 'text-cyan-600' },
  { icon: Play, label: 'Video Tutorial', desc: 'Step-by-step installation walkthroughs', color: 'bg-emerald-50 border-emerald-200', icon_c: 'text-emerald-600' },
  { icon: Cpu, label: 'Augmented Reality Guide', desc: 'Live AR overlay on physical equipment', color: 'bg-amber-50 border-amber-200', icon_c: 'text-amber-600' },
]

export default function OperativeKnowledge() {
  const navigate = useNavigate()
  const [arActive, setArActive] = useState(false)
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-5 py-5">
        <h1 className="text-xl font-bold">Knowledge Base &amp; AR Guides</h1>
        <p className="text-cyan-200 text-sm mt-0.5">Access installation manuals, guides and AR overlays</p>
      </header>

      <div className="px-4 py-5 max-w-2xl mx-auto space-y-5">
        {/* Scan prompt */}
        <div className="bg-slate-900 rounded-3xl p-6 text-center border border-slate-700">
          <Scan className="text-cyan-400 mx-auto mb-3" size={48} />
          <p className="text-white font-bold text-base mb-1">Scan Equipment QR Code</p>
          <p className="text-slate-400 text-sm">Point camera at any equipment marker or QR code — UBA will automatically load the relevant guide</p>
          <button
            onClick={() => setArActive(true)}
            className="mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 mx-auto transition"
          >
            <Cpu size={16} /> Launch AR Mode
          </button>
        </div>

        {/* AR Mode overlay */}
        {arActive && (
          <div className="bg-slate-950 rounded-3xl border-2 border-cyan-600 p-6 space-y-4 relative">
            <button
              onClick={() => setArActive(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-cyan-400 font-bold text-sm">AR Mode Active — Tracking Equipment</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">STEP {step} OF 5</span>
                <span className="text-xs text-emerald-400 font-mono">Tracking: ACTIVE</span>
              </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-600 rounded-full transition-all" style={{ width: `${(step / 5) * 100}%` }} />
              </div>
            </div>
            <div className="bg-slate-900 rounded-xl p-4 space-y-2">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Current Step</p>
              <p className="text-white font-semibold text-sm">
                {step === 1 && 'Align base plate with floor anchor markers'}
                {step === 2 && 'Secure base plate using 4× M10 hex bolts'}
                {step === 3 && 'Attach vertical column — torque to 45 Nm'}
                {step === 4 && 'Connect hydraulic line — blue fitting to port A'}
                {step === 5 && 'Run diagnostic check via UBA app — confirm green status'}
              </p>
              <p className="text-xs text-slate-500">
                Next: {step < 5 ? `Step ${step + 1}` : 'Assembly complete'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl text-sm transition"
              >
                Previous
              </button>
              <button
                onClick={() => setStep(Math.min(5, step + 1))}
                disabled={step === 5}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl text-sm transition"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Guide types */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3">Available Guide Formats</h2>
          <div className="space-y-3">
            {guides.map(({ icon: Icon, label, desc, color, icon_c }) => (
              <div key={label} className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${color} cursor-pointer hover:shadow-md transition-all`}>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Icon className={icon_c} size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-2xl text-sm transition">
          <Download size={16} /> Download All Guides for Offline Use
        </button>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-50">
        <div className="flex max-w-2xl mx-auto">
          {tabs.map(({ label, icon: Icon, path }) => {
            const active = window.location.pathname === path
            return (
              <button key={label} onClick={() => navigate(path)} className="flex-1 flex flex-col items-center gap-1 py-3">
                <Icon size={20} className={active ? 'text-cyan-600' : 'text-slate-400'} />
                <span className={`text-xs font-semibold ${active ? 'text-cyan-600' : 'text-slate-400'}`}>{label}</span>
                {active && <span className="w-8 h-0.5 bg-cyan-600 rounded-full" />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
