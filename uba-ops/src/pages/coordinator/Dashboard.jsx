import { useState } from 'react'
import { Cpu, Truck, Package, Map, Activity, AlertTriangle, Gauge, Zap } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import SystemLog from '../../components/SystemLog'

const navItems = [
  { label: 'Asset Tracking', to: '/asset/coordinator',            icon: Cpu },
  { label: 'Deliveries',     to: '/asset/coordinator/deliveries', icon: Truck },
  { label: 'Inventory',      to: '/asset/coordinator/inventory',  icon: Package },
  { label: 'Utilisation Map', to: '/asset/coordinator/maps',     icon: Map },
]

const downtimeLogs = [
  '[Impact Engine]: Calculating downstream effect of Tower Crane TC-1 downtime…',
  '[Critical Path]: Crane offline will delay Phase 3B steel erection by 2.1 days…',
  '[Schedule]: Adjusting 14 dependent task timelines across Zone B and Zone C…',
  '[Notification]: Crisis Impact Report dispatched to Operations Director…',
  '[Predictive AI]: Estimated repair window: 6–8 hours — scheduling maintenance crew…',
  '✓ Downtime impact analysis complete — report available in Financial Analytics.',
]

export default function CoordinatorDashboard() {
  const [impactLog, setImpactLog] = useState([])
  const [calcDone, setCalcDone] = useState(false)

  function calcDowntime() {
    setImpactLog(downtimeLogs)
    setCalcDone(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="coordinator" userName="Jamie Kowalski" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Asset Tracking &amp; Telemetry</h1>
              <p className="text-slate-500 mt-1">Real-time IoT data, predictive maintenance, and fleet management</p>
            </div>

            {/* Fleet KPIs */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                { label: 'Active Assets', value: '24', color: 'text-cyan-700', bg: 'bg-cyan-50', icon: Cpu },
                { label: 'Maintenance Due', value: '3', color: 'text-amber-700', bg: 'bg-amber-50', icon: AlertTriangle },
                { label: 'Utilisation Rate', value: '84%', color: 'text-violet-700', bg: 'bg-violet-50', icon: Gauge },
                { label: 'Active Alerts', value: '2', color: 'text-rose-700', bg: 'bg-rose-50', icon: Zap },
              ].map(({ label, value, color, bg, icon: Icon }) => (
                <div key={label} className={`${bg} rounded-3xl shadow-lg border border-slate-200 p-6`}>
                  <Icon className={`${color} mb-3`} size={28} />
                  <p className={`text-4xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Featured asset */}
            <div className="bg-gradient-to-br from-cyan-50 to-indigo-50 rounded-3xl shadow-lg border-2 border-cyan-200 p-7">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">PREDICTIVE ALERT</span>
                  <h2 className="font-bold text-slate-900 text-xl mt-2">Tower Crane TC-1 — Zone B</h2>
                  <p className="text-slate-500 text-sm">Abnormal vibration signature detected in slewing mechanism</p>
                </div>
                <span className="text-xs font-mono bg-slate-900 text-emerald-400 px-3 py-1 rounded-lg">ONLINE</span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Fuel gauge */}
                {[
                  { label: 'Fuel Level', pct: 74, color: '#0891b2', stroke: '#cffafe' },
                  { label: 'Engine Hours', pct: 61, color: '#6d28d9', stroke: '#ede9fe' },
                ].map(({ label, pct, color, stroke }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <svg width="80" height="80" className="-rotate-90">
                        <circle cx="40" cy="40" r="32" fill="none" stroke={stroke} strokeWidth="10" />
                        <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="10"
                          strokeDasharray={201} strokeDashoffset={201 * (1 - pct / 100)} strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-slate-900">{pct}%</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">{label}</p>
                      <p className="font-bold text-slate-900">{label === 'Engine Hours' ? '512 hrs' : '74% full'}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-5">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Predictive Maintenance Alert</p>
                    <p className="text-xs text-amber-700 mt-0.5">Abnormal vibration index: 4.7g (threshold: 3.0g). Schedule inspection within 18 hours to prevent failure.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={calcDowntime}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition shadow"
              >
                <Activity size={16} /> Calculate Downtime Impact
              </button>
            </div>

            {impactLog.length > 0 && (
              <SystemLog lines={impactLog} title="IMPACT ANALYSIS ENGINE — PROCESSING" />
            )}

            {/* Recent activity */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 text-lg mb-4">Recent Asset Activity</h2>
              <div className="space-y-3">
                {[
                  { asset: 'Excavator EX-03', action: 'Scheduled service completed — Zone A', time: '1 hr ago', type: 'ok' },
                  { asset: 'Forklift FL-07',  action: 'Fuel replenishment — Yard B', time: '2 hrs ago', type: 'ok' },
                  { asset: 'Tower Crane TC-1', action: 'Predictive alert generated', time: '3 hrs ago', type: 'alert' },
                  { asset: 'Concrete Mixer CM-02', action: 'Booking confirmed — Zone A pour', time: '4 hrs ago', type: 'ok' },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${a.type === 'alert' ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                      <Cpu className={a.type === 'alert' ? 'text-amber-600' : 'text-emerald-600'} size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{a.asset}</p>
                      <p className="text-xs text-slate-500">{a.action}</p>
                    </div>
                    <p className="text-xs text-slate-400">{a.time}</p>
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
