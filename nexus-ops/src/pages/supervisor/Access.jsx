import { useState } from 'react'
import { Users, LayoutDashboard, Key, FileText, ShieldAlert } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Toggle from '../../components/Toggle'

const navItems = [
  { label: 'Dashboard',     to: '/zone/supervisor',           icon: LayoutDashboard },
  { label: 'Workforce',     to: '/zone/supervisor/workforce', icon: Users },
  { label: 'Access Control', to: '/zone/supervisor/access',  icon: Key },
  { label: 'Contracts',     to: '/zone/supervisor/contracts', icon: FileText },
]

const initWorkers = [
  { id: 'OP-001', name: 'Alex Morgan',  role: 'HVAC Technician',  access: true },
  { id: 'OP-002', name: 'Jordan Liu',   role: 'Plumber',          access: true },
  { id: 'OP-003', name: 'Sam Okafor',   role: 'Structural Steel', access: true },
  { id: 'OP-004', name: 'Riley Torres', role: 'Concrete Specialist', access: false },
  { id: 'OP-005', name: 'Casey Nguyen', role: 'Scaffolder',       access: true },
  { id: 'OP-006', name: 'Morgan Patel', role: 'Electrician',      access: true },
]

export default function SupervisorAccess() {
  const [workers, setWorkers] = useState(initWorkers)

  function toggle(id) {
    setWorkers(prev => prev.map(w => w.id === id ? { ...w, access: !w.access } : w))
  }

  function revokeAll() {
    setWorkers(prev => prev.map(w => ({ ...w, access: false })))
  }

  const active = workers.filter(w => w.access).length

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="supervisor" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Zone Access Control</h1>
                <p className="text-slate-500 mt-1">Manage site entry permissions for all operatives</p>
              </div>
              <button
                onClick={revokeAll}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow"
              >
                <ShieldAlert size={16} /> Bulk Revoke All
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: 'Total Operatives', value: workers.length, color: 'text-slate-700', bg: 'bg-white' },
                { label: 'Access Granted',   value: active,          color: 'text-emerald-700', bg: 'bg-emerald-50' },
                { label: 'Access Revoked',   value: workers.length - active, color: 'text-rose-700', bg: 'bg-rose-50' },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`${bg} rounded-2xl p-5 border border-slate-200 shadow-sm`}>
                  <p className={`text-3xl font-bold ${color}`}>{value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Worker access table */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-uba-700">
                <h2 className="font-bold text-white text-base">Operative Access Matrix</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Operator ID', 'Name', 'Role / Specialty', 'Site Access', 'Status'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workers.map((w, i) => (
                    <tr key={w.id} className={`border-b border-slate-100 hover:bg-slate-50 transition ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{w.id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900 text-sm">{w.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{w.role}</td>
                      <td className="px-6 py-4">
                        <Toggle value={w.access} onChange={() => toggle(w.id)} />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          w.access ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {w.access ? 'Active' : 'Revoked'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
