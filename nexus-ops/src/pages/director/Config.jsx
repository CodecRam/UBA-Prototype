import { useState } from 'react'
import { LayoutDashboard, Settings, TrendingUp, Box, Upload, Plus, Trash2 } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import SystemLog from '../../components/SystemLog'

const navItems = [
  { label: 'Command Centre',    to: '/ops/director',              icon: LayoutDashboard },
  { label: 'Project Config',    to: '/ops/director/config',       icon: Settings },
  { label: 'Financial Reports', to: '/ops/director/financial',    icon: TrendingUp },
  { label: 'Digital Twin',      to: '/ops/director/digital-twin', icon: Box },
]

const initLogs = [
  '[Config Module]: Parsing uploaded project manifest…',
  '[Task Engine]: Generating 87 operative task assignments from scope…',
  '[Scheduler]: Building delivery schedule — integrating supplier APIs…',
  '[Digital Twin]: Initialising spatial model from BIM data…',
  '[SAP ERP]: Syncing resource allocation to project cost centre…',
  '✓ Project configuration complete — UBA-PRJ-0024 is live.',
]

export default function DirectorConfig() {
  const [logs, setLogs] = useState([])
  const [uploaded, setUploaded] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="director" userName="Dr. Priya Sharma" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Project Configuration</h1>
              <p className="text-slate-500 mt-1">Upload project data, assign resources, and initialise digital twin</p>
            </div>

            {/* Upload project */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                <Upload className="text-violet-600" size={20} /> Project Manifest Upload
              </h2>
              <label className={`block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                uploaded ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-violet-400 hover:bg-violet-50'
              }`}>
                <input type="file" className="hidden" onChange={() => { setUploaded(true); setLogs(initLogs) }} />
                <Upload className={`mx-auto mb-3 ${uploaded ? 'text-emerald-500' : 'text-slate-400'}`} size={40} />
                <p className="font-bold text-slate-900">{uploaded ? 'Project Manifest Uploaded' : 'Upload Project Scope Document'}</p>
                <p className="text-sm text-slate-500 mt-1">.xlsx, .csv, .xml, .json — includes tasks, zones, resources, timelines</p>
              </label>
              {logs.length > 0 && <div className="mt-5"><SystemLog lines={logs} title="CONFIG PIPELINE — PROCESSING" /></div>}
            </div>

            {/* Integration settings */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <h2 className="font-bold text-slate-900 text-lg mb-5">Integration Sync Settings</h2>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'MS Project / Primavera Sync', value: 'Auto — Every 15 min' },
                  { label: 'SAP ERP Cost Centre', value: 'UBA-CC-4021' },
                  { label: 'BIM/CAD Model Source', value: 'Revit 2026 — Cloud Link' },
                  { label: 'Baseline Schedule Version', value: 'Rev 3.2 — Jun 1, 2026' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold mb-1">{label}</p>
                    <p className="text-sm font-bold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone manager */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-900 text-lg">Zone Configuration</h2>
                <button className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition">
                  <Plus size={16} /> Add Zone
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Zone A: Foundation', 'Zone B: Superstructure', 'Zone C: Envelope', 'Zone D: Services'].map(z => (
                  <div key={z} className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4 flex items-center justify-between">
                    <p className="text-sm font-bold text-violet-900">{z}</p>
                    <button className="text-slate-400 hover:text-rose-500 transition"><Trash2 size={14} /></button>
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
