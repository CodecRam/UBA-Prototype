import { Cpu, Truck, Package, Map, Calendar } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Asset Tracking',  to: '/asset/coordinator',            icon: Cpu },
  { label: 'Deliveries',      to: '/asset/coordinator/deliveries', icon: Truck },
  { label: 'Inventory',       to: '/asset/coordinator/inventory',  icon: Package },
  { label: 'Utilisation Map', to: '/asset/coordinator/maps',      icon: Map },
]

const equipment = [
  { id: 'EX-03', name: 'Excavator 3',      type: 'Heavy Machinery',   status: 'Available', location: 'Zone A', utilPct: 0 },
  { id: 'FL-07', name: 'Forklift 7',       type: 'Material Handling', status: 'In Use',    location: 'Zone C', utilPct: 72 },
  { id: 'TC-01', name: 'Tower Crane TC-1', type: 'Heavy Lift',        status: 'Alert',     location: 'Zone B', utilPct: 91 },
  { id: 'CM-02', name: 'Concrete Mixer 2', type: 'Mixing Equipment',  status: 'Available', location: 'Yard',   utilPct: 0 },
  { id: 'SL-04', name: 'Scissor Lift 4',   type: 'Access Equipment',  status: 'In Use',    location: 'Zone D', utilPct: 55 },
  { id: 'BD-01', name: 'Bulldozer 1',      type: 'Heavy Machinery',   status: 'Available', location: 'Zone A', utilPct: 0 },
  { id: 'DT-03', name: 'Dump Truck 3',     type: 'Transport',         status: 'Available', location: 'Yard',   utilPct: 0 },
  { id: 'CP-02', name: 'Compactor 2',      type: 'Compaction',        status: 'In Use',    location: 'Zone B', utilPct: 44 },
]

const statusBadge = {
  'Available': 'bg-emerald-100 text-emerald-700 border-emerald-300',
  'In Use':    'bg-amber-100 text-amber-700 border-amber-300',
  'Alert':     'bg-rose-100 text-rose-700 border-rose-300',
}

export default function CoordinatorInventory() {
  const available = equipment.filter(e => e.status === 'Available').length
  const inUse     = equipment.filter(e => e.status === 'In Use').length

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="coordinator" userName="Jamie Kowalski" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Equipment Inventory &amp; Booking</h1>
              <p className="text-slate-500 mt-1">Track fleet status and soft-book machinery for upcoming tasks</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-5">
              {[
                { label: 'Total Fleet',  value: equipment.length, color: 'text-slate-700', bg: 'bg-white' },
                { label: 'Available',    value: available,        color: 'text-emerald-700', bg: 'bg-emerald-50' },
                { label: 'In Use',       value: inUse,            color: 'text-amber-700', bg: 'bg-amber-50' },
                { label: 'Utilisation',  value: `${Math.round((inUse / equipment.length) * 100)}%`, color: 'text-cyan-700', bg: 'bg-cyan-50' },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`${bg} rounded-2xl p-5 border border-slate-200 shadow-sm`}>
                  <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Equipment grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
              {equipment.map(eq => (
                <div key={eq.id} className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition">
                  {/* Card header */}
                  <div className={`px-5 py-4 flex items-center justify-between ${
                    eq.status === 'Alert' ? 'bg-gradient-to-r from-rose-700 to-rose-600' :
                    eq.status === 'In Use' ? 'bg-gradient-to-r from-slate-700 to-slate-600' :
                    'bg-gradient-to-r from-cyan-700 to-cyan-600'
                  }`}>
                    <Cpu className="text-white/80" size={24} />
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusBadge[eq.status]}`}>{eq.status}</span>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs text-slate-400 mb-1">{eq.id}</p>
                    <p className="font-bold text-slate-900 text-sm mb-1">{eq.name}</p>
                    <p className="text-xs text-slate-500 mb-3">{eq.type}</p>
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="text-slate-500">Location</span>
                      <span className="font-semibold text-slate-900">{eq.location}</span>
                    </div>
                    {eq.status === 'Available' ? (
                      <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition">
                        <Calendar size={13} /> Soft Book
                      </button>
                    ) : (
                      <button className="w-full bg-slate-100 text-slate-600 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-not-allowed">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
