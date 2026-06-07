import { Shield, Map, FileText, Lock, Unlock } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Incident Queue', to: '/compliance/auditor',        icon: Shield },
  { label: 'Zone Maps',      to: '/compliance/auditor/maps',   icon: Map },
  { label: 'Reports',        to: '/compliance/auditor/reports', icon: FileText },
]

const zones = [
  { id: 'A', status: 'Safe',       access: 'Open',     incidents: 0, workers: 14 },
  { id: 'B', status: 'Safe',       access: 'Open',     incidents: 0, workers: 11 },
  { id: 'C', status: 'RESTRICTED', access: 'Locked',   incidents: 1, workers: 0 },
  { id: 'D', status: 'Safe',       access: 'Open',     incidents: 0, workers: 4 },
  { id: 'E', status: 'Caution',    access: 'Monitored', incidents: 1, workers: 6 },
  { id: 'F', status: 'Safe',       access: 'Open',     incidents: 0, workers: 3 },
]

export default function AuditorMaps() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header role="auditor" userName="Taylor Reid" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Zone Safety Map</h1>
              <p className="text-slate-500 mt-1">Real-time safety status and access control across all zones</p>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
              {zones.map(z => (
                <div key={z.id} className={`bg-white rounded-3xl shadow-lg border-2 p-6 hover:shadow-xl transition ${
                  z.status === 'RESTRICTED' ? 'border-rose-400' :
                  z.status === 'Caution'    ? 'border-amber-400' :
                  'border-emerald-300'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-extrabold text-slate-900">Zone {z.id}</p>
                    {z.access === 'Locked'
                      ? <Lock className="text-rose-600" size={24} />
                      : z.access === 'Monitored'
                        ? <Lock className="text-amber-500" size={24} />
                        : <Unlock className="text-emerald-500" size={24} />
                    }
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block ${
                    z.status === 'RESTRICTED' ? 'bg-rose-500 text-white' :
                    z.status === 'Caution'    ? 'bg-amber-500 text-white' :
                    'bg-emerald-500 text-white'
                  }`}>{z.status}</span>
                  <div className="grid grid-cols-2 gap-3 mt-3 text-center">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500">Active Workers</p>
                      <p className="font-bold text-slate-900 text-lg">{z.workers}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500">Open Incidents</p>
                      <p className={`font-bold text-lg ${z.incidents > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{z.incidents}</p>
                    </div>
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
