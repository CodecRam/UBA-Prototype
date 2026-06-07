import { useState } from 'react'
import { Users, Network, LayoutDashboard, Key, FileText, Star, AlertCircle } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import SystemLog from '../../components/SystemLog'

const navItems = [
  { label: 'Dashboard',    to: '/zone/supervisor',            icon: LayoutDashboard },
  { label: 'Workforce',    to: '/zone/supervisor/workforce',  icon: Users },
  { label: 'Access Control', to: '/zone/supervisor/access',  icon: Key },
  { label: 'Contracts',    to: '/zone/supervisor/contracts',  icon: FileText },
]

const contractors = [
  { name: 'TechCore Solutions', specialty: 'Electrical Systems', status: 'Available', score: 97 },
  { name: 'AquaFlow Services',  specialty: 'Plumbing & Drainage', status: 'Available', score: 94 },
  { name: 'ClimaTech HVAC',    specialty: 'HVAC Engineering', status: 'On-site', score: 91 },
]

const defectLogs = [
  '[Contract Module]: Initiating payment hold for TechCore Solutions…',
  '[Schedule Engine]: Recalculating dependent task timelines…',
  '[Analytics]: Generating Time-to-Rectification performance report…',
  '[Notification]: Defect ticket dispatched to contractor portal…',
  '✓ Defect workflow successfully initiated — Ticket: DT-0089',
]

export default function SupervisorDashboard() {
  const [defectLog, setDefectLog] = useState([])
  const [milestoneSignedOff, setMilestoneSignedOff] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="supervisor" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />

        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Zone Supervisor Hub</h1>
              <p className="text-slate-500 mt-1">Manage workforce allocation, contractor assignments, and milestone approvals</p>
            </div>

            {/* AI Contractor Matching */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <div className="flex items-center gap-2 mb-5">
                <Star className="text-amber-500" size={20} />
                <h2 className="font-bold text-slate-900 text-lg">AI-Powered Contractor Matching</h2>
              </div>
              <div className="space-y-4">
                {contractors.map(c => (
                  <div key={c.name} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-10 h-10 bg-uba-100 rounded-xl flex items-center justify-center font-bold text-uba-700 text-sm">
                      {c.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.specialty}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      c.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'
                    }`}>{c.status}</span>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-medium">AI Match</p>
                      <p className="font-bold text-uba-700">{c.score}%</p>
                    </div>
                    <button className="bg-uba-600 hover:bg-uba-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow">
                      Assign to Zone
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Defect Ticketing */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="text-amber-500" size={20} />
                  <h2 className="font-bold text-slate-900 text-lg">Defect Ticket System</h2>
                </div>
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-5">
                  <p className="text-sm text-amber-800">
                    Issue a defect ticket to hold contractor payment and trigger automated rectification workflows pending resolution.
                  </p>
                </div>
                <button
                  onClick={() => setDefectLog(defectLogs)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition mb-4"
                >
                  <AlertCircle size={16} /> Issue Defect Ticket
                </button>
                {defectLog.length > 0 && <SystemLog lines={defectLog} title="DEFECT WORKFLOW ENGINE" />}
              </div>

              {/* Milestone sign-off */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
                <h2 className="font-bold text-slate-900 text-lg mb-4">Milestone Sign-Off</h2>
                {milestoneSignedOff ? (
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-center">
                    <div className="text-4xl mb-2">✓</div>
                    <p className="font-bold text-emerald-800 text-base">Milestone 4 — Signed Off</p>
                    <p className="text-emerald-600 text-sm mt-1">Invoice generated and dispatched to Finance</p>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 mb-4">
                    <p className="font-bold text-slate-900 mb-4">Milestone 4: Structural Framework Complete</p>
                    <div className="space-y-2 mb-4">
                      {[
                        { label: 'Quality Inspection', result: 'Passed' },
                        { label: 'Timeline Compliance', result: 'On Schedule' },
                        { label: 'Budget Variance', result: 'Within Threshold' },
                      ].map(({ label, result }) => (
                        <div key={label} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{label}</span>
                          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                            <span className="text-xs">✓</span> {result}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setMilestoneSignedOff(true)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition"
                    >
                      Provide Sign-Off &amp; Generate Invoice
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
