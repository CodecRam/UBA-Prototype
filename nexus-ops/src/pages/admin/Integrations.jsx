import { useState } from 'react'
import { Server, Key, Settings, Shield, RefreshCw, CheckCircle, Wifi } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'System Health', to: '/platform/admin',              icon: Server },
  { label: 'Access Matrix', to: '/platform/admin/rbac',         icon: Key },
  { label: 'Integrations',  to: '/platform/admin/integrations', icon: Settings },
  { label: 'Audit Logs',    to: '/platform/admin/logs',         icon: Shield },
]

const integrations = [
  { id: 'sap',  name: 'SAP ERP',         desc: 'Enterprise Resource Planning & Finance', uptime: '99.97%', status: 'Online', key: 'SAP-XXXXXXXXXXXXXXXX', freq: '5 min' },
  { id: 'msp',  name: 'MS Project',       desc: 'Schedule Management & Gantt Integration', uptime: '99.82%', status: 'Online', key: 'MSP-XXXXXXXXXXXXXXXX', freq: '15 min' },
  { id: 'bim',  name: 'BIM / CAD System', desc: 'Digital Twin & 3D Model Sync',           uptime: '98.91%', status: 'Online', key: 'BIM-XXXXXXXXXXXXXXXX', freq: '30 min' },
  { id: 'iot',  name: 'IoT Hub',          desc: 'Asset Telemetry & Sensor Streams',        uptime: '99.44%', status: 'Online', key: 'IOT-XXXXXXXXXXXXXXXX', freq: '1 min' },
  { id: 'comp', name: 'Compliance Portal', desc: 'Regulatory Document Submission',         uptime: '97.30%', status: 'Degraded', key: 'CMP-XXXXXXXXXXXXXXXX', freq: '1 hr' },
  { id: 'auth', name: 'Identity Provider', desc: 'OAuth 2.0 / SAML Authentication',        uptime: '99.99%', status: 'Online', key: 'IDP-XXXXXXXXXXXXXXXX', freq: 'Real-time' },
]

export default function AdminIntegrations() {
  const [testing, setTesting] = useState({})
  const [tested, setTested] = useState({})
  const [freqs, setFreqs] = useState(() => Object.fromEntries(integrations.map(i => [i.id, i.freq])))

  function testConnection(id) {
    setTesting(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setTesting(prev => ({ ...prev, [id]: false }))
      setTested(prev => ({ ...prev, [id]: true }))
    }, 1500)
  }

  const online = integrations.filter(i => i.status === 'Online').length
  const avgUptime = (integrations.reduce((s, i) => s + parseFloat(i.uptime), 0) / integrations.length).toFixed(2)

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="admin" userName="Admin: Sys Root" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Integration Hub &amp; API Management</h1>
              <p className="text-slate-500 mt-1">Configure and monitor all third-party platform integrations</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-4 gap-5">
              {[
                { label: 'Online Services', value: online, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
                { label: 'Avg Uptime', value: `${avgUptime}%`, color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200' },
                { label: 'API Calls (24h)', value: '18.2K', color: 'text-cyan-700', bg: 'bg-cyan-50 border-cyan-200' },
                { label: 'Failed Requests', value: '5', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`rounded-2xl p-5 border-2 shadow-sm ${bg}`}>
                  <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Integration cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {integrations.map(intg => (
                <div key={intg.id} className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-slate-900 text-base">{intg.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{intg.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full animate-pulse ${intg.status === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className={`text-xs font-bold ${intg.status === 'Online' ? 'text-emerald-600' : 'text-amber-600'}`}>{intg.status}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                    <p className="text-xs text-slate-500 mb-1">API Key</p>
                    <p className="font-mono text-xs text-slate-700 font-semibold">{intg.key}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Uptime</p>
                      <p className="font-bold text-slate-900">{intg.uptime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Sync Frequency</p>
                      <select
                        value={freqs[intg.id]}
                        onChange={e => setFreqs(prev => ({ ...prev, [intg.id]: e.target.value }))}
                        className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        {['Real-time', '1 min', '5 min', '15 min', '30 min', '1 hr'].map(f => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => testConnection(intg.id)}
                    className={`w-full font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition ${
                      tested[intg.id]
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        : 'bg-violet-100 hover:bg-violet-200 text-violet-700 border border-violet-200'
                    }`}
                  >
                    {testing[intg.id] ? (
                      <><RefreshCw size={14} className="animate-spin" /> Testing…</>
                    ) : tested[intg.id] ? (
                      <><CheckCircle size={14} /> Connection Successful</>
                    ) : (
                      <><Wifi size={14} /> Test Connection</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
