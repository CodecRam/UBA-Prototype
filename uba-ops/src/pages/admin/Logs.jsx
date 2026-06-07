import { Server, Key, Settings, Shield, Download, Terminal } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'System Health', to: '/platform/admin',              icon: Server },
  { label: 'Access Matrix', to: '/platform/admin/rbac',         icon: Key },
  { label: 'Integrations',  to: '/platform/admin/integrations', icon: Settings },
  { label: 'Audit Logs',    to: '/platform/admin/logs',         icon: Shield },
]

const logs = [
  { ts: '2026-06-07 09:12:04', user: 'admin@uba-ops.com',      action: 'RBAC Matrix Configuration Updated',          ip: '203.45.67.89', status: 'Success' },
  { ts: '2026-06-07 08:55:31', user: 'director@uba-ops.com',   action: 'Digital Twin Access — Zone B',               ip: '203.45.67.92', status: 'Success' },
  { ts: '2026-06-07 08:33:18', user: 'supervisor@uba-ops.com', action: 'Zone C Lockdown Enforced',                   ip: '203.45.67.95', status: 'Success' },
  { ts: '2026-06-07 08:19:44', user: 'admin@uba-ops.com',      action: 'Integration Test — SAP ERP Connector',       ip: '203.45.67.89', status: 'Success' },
  { ts: '2026-06-07 07:55:02', user: 'auditor@uba-ops.com',    action: 'Incident Resolution — UBA-IR-2041',          ip: '203.45.67.98', status: 'Success' },
  { ts: '2026-06-07 07:34:21', user: 'unknown',                   action: 'Failed Authentication Attempt',              ip: '192.168.1.100', status: 'Failed' },
  { ts: '2026-06-07 07:12:09', user: 'coordinator@uba-ops.com', action: 'Asset Booking — Tower Crane TC-1',          ip: '203.45.67.101', status: 'Success' },
  { ts: '2026-06-07 06:58:47', user: 'supervisor@uba-ops.com', action: 'Contractor Assigned — Zone B',               ip: '203.45.67.95', status: 'Success' },
]

const ruleButtons = [
  { label: 'Configure SWMS Rules',           color: 'bg-uba-700 hover:bg-uba-800' },
  { label: 'Configure Zone Access Rules',     color: 'bg-cyan-600 hover:bg-cyan-700' },
  { label: 'Configure Notification Triggers', color: 'bg-amber-600 hover:bg-amber-700' },
]

export default function AdminLogs() {
  const total    = logs.length
  const success  = logs.filter(l => l.status === 'Success').length
  const failed   = logs.filter(l => l.status === 'Failed').length
  const unique   = new Set(logs.map(l => l.user)).size

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="admin" userName="Admin: Sys Root" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Security Logs &amp; Audit Trail</h1>
              <p className="text-slate-500 mt-1">Immutable audit log of all platform actions and security events</p>
            </div>

            {/* System rule buttons */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Terminal className="text-uba-600" size={18} /> System Rule Configuration
              </h2>
              <div className="flex flex-wrap gap-3">
                {ruleButtons.map(({ label, color }) => (
                  <button key={label} className={`${color} text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-5">
              {[
                { label: 'Total Events (24h)', value: total,   color: 'text-slate-700' },
                { label: 'Successful',         value: success, color: 'text-emerald-700' },
                { label: 'Failed / Blocked',   value: failed,  color: 'text-rose-700' },
                { label: 'Unique Operators',   value: unique,  color: 'text-uba-700' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Logs table */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-uba-700 flex items-center justify-between">
                <h2 className="font-bold text-white">Infrastructure Security &amp; Access Logs</h2>
                <button className="bg-white/20 hover:bg-white/30 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition">
                  <Download size={14} /> Export Logs
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {['Timestamp', 'Operator / User', 'Action Performed', 'IP Address', 'Status'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((l, i) => (
                      <tr key={i} className={`border-b border-slate-100 hover:bg-slate-50 transition ${i % 2 ? 'bg-slate-50/50' : ''}`}>
                        <td className="px-5 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{l.ts}</td>
                        <td className="px-5 py-4 text-sm text-slate-700 font-medium">{l.user}</td>
                        <td className="px-5 py-4 text-sm text-slate-900 font-semibold">{l.action}</td>
                        <td className="px-5 py-4 font-mono text-xs text-slate-500">{l.ip}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            l.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}>{l.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
