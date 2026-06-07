import { Cpu, Truck, Package, Map } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Asset Tracking',  to: '/asset/coordinator',            icon: Cpu },
  { label: 'Deliveries',      to: '/asset/coordinator/deliveries', icon: Truck },
  { label: 'Inventory',       to: '/asset/coordinator/inventory',  icon: Package },
  { label: 'Utilisation Map', to: '/asset/coordinator/maps',      icon: Map },
]

const zones = [
  { id: 'A', name: 'Zone A', usage: 92, level: 'High',   workers: 14, assets: 8 },
  { id: 'B', name: 'Zone B', usage: 78, level: 'Medium', workers: 11, assets: 6 },
  { id: 'C', name: 'Zone C', usage: 45, level: 'Medium', workers: 7,  assets: 4 },
  { id: 'D', name: 'Zone D', usage: 21, level: 'Low',    workers: 4,  assets: 3 },
  { id: 'E', name: 'Zone E', usage: 88, level: 'High',   workers: 10, assets: 5 },
  { id: 'F', name: 'Zone F', usage: 33, level: 'Low',    workers: 3,  assets: 2 },
]

const levelColor = {
  High:   'bg-rose-500 border-rose-600',
  Medium: 'bg-amber-400 border-amber-500',
  Low:    'bg-emerald-400 border-emerald-500',
}

const levelBadge = {
  High:   'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low:    'bg-emerald-100 text-emerald-700',
}

export default function CoordinatorMaps() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header role="coordinator" userName="Jamie Kowalski" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Site Utilisation Heat Map</h1>
              <p className="text-slate-500 mt-1">Real-time capacity and resource density across all zones</p>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap gap-6">
              {[
                { level: 'High', desc: '80–100% capacity', color: 'bg-rose-500' },
                { level: 'Medium', desc: '40–79% capacity', color: 'bg-amber-400' },
                { level: 'Low', desc: '0–39% capacity', color: 'bg-emerald-400' },
              ].map(({ level, desc, color }) => (
                <div key={level} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${color}`} />
                  <div>
                    <span className="text-sm font-bold text-slate-900">{level} Usage</span>
                    <span className="text-xs text-slate-500 ml-2">{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Heat map grid */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <h2 className="font-bold text-slate-900 text-lg mb-5">UBA Core Construction Complex — Live View</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {zones.map(z => {
                  const opacity = z.usage / 100
                  return (
                    <div
                      key={z.id}
                      className={`relative rounded-2xl border-2 p-5 overflow-hidden transition hover:scale-105 cursor-default ${levelColor[z.level]}`}
                      style={{ opacity: 0.3 + opacity * 0.7 }}
                    >
                      <div className="absolute inset-0 bg-white opacity-60 pointer-events-none" />
                      <div className="relative z-10">
                        <p className="font-extrabold text-slate-900 text-lg">{z.name}</p>
                        <p className={`text-2xl font-bold mt-1 ${
                          z.level === 'High' ? 'text-rose-700' : z.level === 'Medium' ? 'text-amber-700' : 'text-emerald-700'
                        }`}>{z.usage}%</p>
                        <div className="flex gap-3 mt-2 text-xs text-slate-600">
                          <span>{z.workers} workers</span>
                          <span>·</span>
                          <span>{z.assets} assets</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'High Utilisation Zones',   value: zones.filter(z => z.level === 'High').length,   color: 'text-rose-700' },
                  { label: 'Medium Utilisation Zones',  value: zones.filter(z => z.level === 'Medium').length, color: 'text-amber-700' },
                  { label: 'Low Utilisation Zones',     value: zones.filter(z => z.level === 'Low').length,    color: 'text-emerald-700' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                    <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
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
