import { useState } from 'react'
import { Server, Users, Shield, Key, Settings, Lock, Phone, AlertTriangle, X } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'System Health',  to: '/platform/admin',              icon: Server },
  { label: 'Access Matrix',  to: '/platform/admin/rbac',         icon: Key },
  { label: 'Integrations',   to: '/platform/admin/integrations', icon: Settings },
  { label: 'Audit Logs',     to: '/platform/admin/logs',         icon: Shield },
]

const loadBars = [18,23,20,25,22,19,24,21,25,23,20,22,24,23,21,19,22,24,22,23]

export default function AdminDashboard() {
  const [showOverride, setShowOverride] = useState(false)
  const [overridePwd, setOverridePwd] = useState('')
  const [overrideApplied, setOverrideApplied] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="admin" userName="Admin: Sys Root" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">System Health &amp; Infrastructure Monitor</h1>
              <p className="text-slate-500 mt-1">Live platform metrics, session management, and access controls</p>
            </div>

            {/* Health stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Active sessions */}
              <div className="bg-violet-50 border-2 border-violet-200 rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="text-violet-600" size={22} />
                  <p className="text-sm font-semibold text-slate-600">Active Sessions</p>
                </div>
                <p className="text-6xl font-extrabold text-violet-700 leading-none">312</p>
                <p className="text-emerald-600 font-semibold text-sm mt-3">↑ 8% from last hour</p>
              </div>

              {/* System load */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="text-emerald-600" size={22} />
                  <p className="text-sm font-semibold text-slate-600">System Load</p>
                </div>
                <p className="text-6xl font-extrabold text-emerald-700 leading-none">19<span className="text-3xl">%</span></p>
                <div className="flex items-end gap-0.5 mt-3 h-8">
                  {loadBars.map((v, i) => (
                    <div key={i} className="flex-1 bg-emerald-400 rounded-sm transition-all" style={{ height: `${(v / 30) * 100}%` }} />
                  ))}
                </div>
              </div>

              {/* Security events */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-slate-600" size={22} />
                  <p className="text-sm font-semibold text-slate-600">Security Events (24h)</p>
                </div>
                <p className="text-6xl font-extrabold text-emerald-600 leading-none">0</p>
                <p className="text-emerald-600 font-semibold text-sm mt-3 flex items-center gap-1">
                  <span>✓</span> No security incidents detected
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Manual Override */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="text-rose-600" size={20} />
                  <h2 className="font-bold text-slate-900 text-lg">Manual Access Override</h2>
                </div>
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-5">
                  <p className="text-sm text-amber-800">
                    Bypass all automated access restrictions and grant immediate site-wide entry. This action is logged and requires administrator authentication.
                  </p>
                </div>
                <button
                  onClick={() => setShowOverride(true)}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Initiate Manual Override
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  ⚠ This action will be permanently logged in the Audit Trail
                </p>

                {/* Override modal */}
                {showOverride && !overrideApplied && (
                  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold text-slate-900 text-lg">Confirm Override</h3>
                        <button onClick={() => setShowOverride(false)}><X size={20} className="text-slate-400" /></button>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">Enter your administrator passphrase to proceed.</p>
                      <input
                        type="password"
                        value={overridePwd}
                        onChange={e => setOverridePwd(e.target.value)}
                        placeholder="Administrator passphrase"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <div className="flex gap-3">
                        <button onClick={() => setShowOverride(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition">Cancel</button>
                        <button
                          onClick={() => { setOverrideApplied(true); setShowOverride(false) }}
                          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition"
                        >
                          Confirm Override
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {overrideApplied && (
                  <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-3 text-sm text-rose-800 font-semibold">
                    ✓ Override applied. Event logged to Audit Trail.
                  </div>
                )}
              </div>

              {/* Emergency contacts */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
                <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <Phone className="text-emerald-600" size={20} /> Emergency Contacts
                </h2>
                <div className="space-y-3">
                  {[
                    { role: 'Emergency Coordinator',  phone: '+61 400 123 456', color: 'bg-violet-50 border-violet-200' },
                    { role: 'Site Compliance Auditor', phone: '+61 400 789 012', color: 'bg-rose-50 border-rose-200' },
                    { role: 'Platform Security Lead',  phone: '+61 400 345 678', color: 'bg-cyan-50 border-cyan-200' },
                    { role: 'Emergency Services (AU)', phone: '000',            color: 'bg-amber-50 border-amber-200' },
                  ].map(({ role, phone, color }) => (
                    <div key={role} className={`flex items-center justify-between p-4 rounded-xl border-2 ${color}`}>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">{role}</p>
                        <p className="font-mono font-bold text-slate-900 text-sm">{phone}</p>
                      </div>
                      <button className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg transition">
                        Call
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
