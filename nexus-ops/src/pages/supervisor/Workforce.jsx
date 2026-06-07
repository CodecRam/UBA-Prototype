import { useState } from 'react'
import { Users, LayoutDashboard, Key, FileText, UserCheck, ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Dashboard',    to: '/zone/supervisor',           icon: LayoutDashboard },
  { label: 'Workforce',    to: '/zone/supervisor/workforce', icon: Users },
  { label: 'Access Control', to: '/zone/supervisor/access', icon: Key },
  { label: 'Contracts',    to: '/zone/supervisor/contracts', icon: FileText },
]

const operatives = [
  { id: 'OP-001', name: 'Alex Morgan',    specialty: 'HVAC & Electrical',    zone: 'Zone B' },
  { id: 'OP-002', name: 'Jordan Liu',     specialty: 'Plumbing',             zone: 'Zone A' },
  { id: 'OP-003', name: 'Sam Okafor',     specialty: 'Structural Steel',     zone: 'Zone C' },
  { id: 'OP-004', name: 'Riley Torres',   specialty: 'Concrete Works',       zone: 'Zone A' },
  { id: 'OP-005', name: 'Casey Nguyen',   specialty: 'Scaffolding',          zone: 'Unassigned' },
  { id: 'OP-006', name: 'Morgan Patel',   specialty: 'Electrical Systems',   zone: 'Zone D' },
]

const openTasks = [
  { id: 'T-081', title: 'Foundation Drainage Install',     zone: 'Zone A', specialty: 'Plumbing' },
  { id: 'T-082', title: 'Steel Beam Welding — Block C',    zone: 'Zone C', specialty: 'Structural Steel' },
  { id: 'T-083', title: 'Electrical Conduit Routing',       zone: 'Zone B', specialty: 'Electrical Systems' },
  { id: 'T-084', title: 'HVAC Riser Installation',          zone: 'Zone D', specialty: 'HVAC & Electrical' },
  { id: 'T-085', title: 'Subfloor Concrete Pour',           zone: 'Zone A', specialty: 'Concrete Works' },
]

export default function SupervisorWorkforce() {
  const [assignments, setAssignments] = useState({})

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="supervisor" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Workforce Management</h1>
              <p className="text-slate-500 mt-1">Assign field operatives to tasks and manage zone allocations</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Operative roster */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <Users className="text-uba-600" size={20} /> Operative Roster
                </h2>
                <div className="space-y-3">
                  {operatives.map(op => (
                    <div key={op.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-uba-100 flex items-center justify-center text-uba-700 text-xs font-bold">
                        {op.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{op.name}</p>
                        <p className="text-xs text-slate-500 truncate">{op.specialty}</p>
                      </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        op.zone === 'Unassigned' ? 'bg-slate-100 text-slate-600' : 'bg-cyan-100 text-cyan-700'
                      }`}>{op.zone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task assignment */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <UserCheck className="text-emerald-600" size={20} /> Open Task Assignments
                </h2>
                <div className="space-y-3">
                  {openTasks.map(task => (
                    <div key={task.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs font-mono text-slate-400">{task.id}</p>
                          <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                        </div>
                        <span className="text-xs bg-uba-100 text-uba-700 font-bold px-2 py-0.5 rounded-full">{task.zone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <select
                          value={assignments[task.id] || ''}
                          onChange={e => setAssignments({ ...assignments, [task.id]: e.target.value })}
                          className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-uba-500 bg-white text-slate-700"
                        >
                          <option value="">Assign operative…</option>
                          {operatives.filter(op => op.specialty === task.specialty || true).map(op => (
                            <option key={op.id} value={op.id}>{op.name}</option>
                          ))}
                        </select>
                        <button
                          disabled={!assignments[task.id]}
                          className="bg-uba-600 hover:bg-uba-700 disabled:opacity-40 text-white text-xs font-bold px-3 py-2 rounded-lg transition flex items-center gap-1"
                        >
                          Assign <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Union contract info */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 text-lg mb-4">Active Union Agreement</h2>
              <div className="grid grid-cols-3 gap-6 text-sm">
                {[
                  { label: 'Contract ID',  value: 'UAG-2026-112' },
                  { label: 'Union Body',   value: 'Infrastructure Workers Federation' },
                  { label: 'Valid Until',  value: '31 December 2026' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold mb-1">{label}</p>
                    <p className="font-bold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
