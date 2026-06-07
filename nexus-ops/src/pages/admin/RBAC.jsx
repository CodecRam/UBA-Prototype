import { useState } from 'react'
import { Server, Key, Settings, Shield, Save } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Toggle from '../../components/Toggle'

const navItems = [
  { label: 'System Health', to: '/platform/admin',              icon: Server },
  { label: 'Access Matrix', to: '/platform/admin/rbac',         icon: Key },
  { label: 'Integrations',  to: '/platform/admin/integrations', icon: Settings },
  { label: 'Audit Logs',    to: '/platform/admin/logs',         icon: Shield },
]

const roles = [
  'Field Operative', 'Zone Supervisor', 'Operations Director', 'Asset Coordinator',
  'Compliance Auditor', 'Platform Administrator', 'Contractor', 'Subcontractor',
  'Finance Manager', 'BIM Specialist', 'Quality Inspector', 'Environmental Officer', 'Security Officer',
]

const permissions = [
  'View Telemetry', 'Approve Invoices', 'Control Zone Locks', 'Manage Operatives',
  'Generate Reports', 'Configure RBAC', 'Access Digital Twin', 'Modify Schedules',
]

const defaultMatrix = {
  'Platform Administrator': [true, true, true, true, true, true, true, true],
  'Operations Director':    [true, false, false, true, true, false, true, true],
  'Zone Supervisor':        [true, true, true, true, false, false, false, true],
  'Compliance Auditor':     [true, false, true, false, true, false, false, false],
  'Asset Coordinator':      [true, false, false, false, true, false, false, true],
  'Field Operative':        [true, false, false, false, false, false, false, false],
}

function getDefault(role, permIdx) {
  return defaultMatrix[role]?.[permIdx] ?? false
}

export default function AdminRBAC() {
  const [matrix, setMatrix] = useState(() => {
    const m = {}
    roles.forEach(r => {
      m[r] = permissions.map((_, pi) => getDefault(r, pi))
    })
    return m
  })
  const [saved, setSaved] = useState(false)

  function toggle(role, permIdx) {
    setMatrix(prev => ({
      ...prev,
      [role]: prev[role].map((v, i) => i === permIdx ? !v : v),
    }))
    setSaved(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="admin" userName="Admin: Sys Root" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-full mx-auto space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Role-Based Access Control Matrix</h1>
                <p className="text-slate-500 mt-1">Configure granular permissions for all platform roles</p>
              </div>
              <button
                onClick={() => setSaved(true)}
                className="bg-violet-700 hover:bg-violet-800 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow"
              >
                <Save size={16} />
                {saved ? 'Configuration Saved ✓' : 'Save RBAC Configuration'}
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr>
                    <th className="bg-violet-700 text-white text-left px-6 py-4 text-sm font-bold sticky left-0 z-10">Role</th>
                    {permissions.map(p => (
                      <th key={p} className="bg-violet-700 text-white px-4 py-4 text-xs font-bold text-center">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, ri) => (
                    <tr key={role} className={`border-b border-slate-100 hover:bg-violet-50/30 transition ${ri % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-4 font-semibold text-slate-900 text-sm sticky left-0 bg-white border-r border-slate-100">{role}</td>
                      {permissions.map((_, pi) => (
                        <td key={pi} className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <Toggle value={matrix[role][pi]} onChange={() => toggle(role, pi)} />
                          </div>
                        </td>
                      ))}
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
