import { Cpu, Truck, Package, Map, Plus, Check } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Asset Tracking',  to: '/asset/coordinator',            icon: Cpu },
  { label: 'Deliveries',      to: '/asset/coordinator/deliveries', icon: Truck },
  { label: 'Inventory',       to: '/asset/coordinator/inventory',  icon: Package },
  { label: 'Utilisation Map', to: '/asset/coordinator/maps',      icon: Map },
]

const deliveries = [
  { id: 'DEL-081', material: 'Structural Steel Beams (120 units)', vendor: 'MetalFab Pty Ltd',    date: 'Jun 10, 2026', time: '07:30 AM', status: 'Scheduled' },
  { id: 'DEL-082', material: 'Ready-Mix Concrete (400 m³)',        vendor: 'ConcretePro NSW',     date: 'Jun 11, 2026', time: '05:00 AM', status: 'Scheduled' },
  { id: 'DEL-083', material: 'Electrical Cable Reels (80 reels)',  vendor: 'CableMaster Group',  date: 'Jun 11, 2026', time: '09:00 AM', status: 'Pending Confirmation' },
  { id: 'DEL-084', material: 'HVAC Ductwork Sections',             vendor: 'ClimaTech HVAC',     date: 'Jun 12, 2026', time: '11:00 AM', status: 'Confirmed' },
  { id: 'DEL-085', material: 'Scaffold Boards (500 pcs)',           vendor: 'SafeScaffold Ltd',   date: 'Jun 13, 2026', time: '06:30 AM', status: 'Scheduled' },
]

const statusStyle = {
  'Scheduled':           'bg-cyan-100 text-cyan-700',
  'Confirmed':           'bg-emerald-100 text-emerald-700',
  'Pending Confirmation':'bg-amber-100 text-amber-700',
  'Delivered':           'bg-slate-100 text-slate-600',
}

export default function CoordinatorDeliveries() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header role="coordinator" userName="Jamie Kowalski" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">JIT Delivery Management</h1>
                <p className="text-slate-500 mt-1">Schedule and track just-in-time material deliveries</p>
              </div>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow">
                <Plus size={16} /> Schedule Delivery
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-4 gap-5">
              {[
                { label: 'Total Scheduled', value: deliveries.length, color: 'text-slate-700' },
                { label: 'Confirmed',       value: deliveries.filter(d => d.status === 'Confirmed').length, color: 'text-emerald-700' },
                { label: 'Pending Confirm', value: deliveries.filter(d => d.status === 'Pending Confirmation').length, color: 'text-amber-700' },
                { label: 'This Week',       value: 5, color: 'text-cyan-700' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-cyan-600">
                <h2 className="font-bold text-white text-base">Delivery Schedule</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['ID', 'Material', 'Vendor', 'Delivery Date', 'Time', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((d, i) => (
                    <tr key={d.id} className={`border-b border-slate-100 hover:bg-slate-50 transition ${i % 2 ? 'bg-slate-50/50' : ''}`}>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">{d.id}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900 max-w-xs">{d.material}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{d.vendor}</td>
                      <td className="px-5 py-4 text-sm text-slate-700">{d.date}</td>
                      <td className="px-5 py-4 text-sm text-slate-700">{d.time}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyle[d.status]}`}>{d.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-cyan-600 hover:text-cyan-800 text-xs font-semibold transition">Manage</button>
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
