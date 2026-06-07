import { useState } from 'react'
import { LayoutDashboard, Settings, TrendingUp, Box, RotateCw, ZoomIn, AlertTriangle, RefreshCw } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import SystemLog from '../../components/SystemLog'

const navItems = [
  { label: 'Command Centre',    to: '/ops/director',              icon: LayoutDashboard },
  { label: 'Project Config',    to: '/ops/director/config',       icon: Settings },
  { label: 'Financial Reports', to: '/ops/director/financial',    icon: TrendingUp },
  { label: 'Digital Twin',      to: '/ops/director/digital-twin', icon: Box },
]

const syncLogs = [
  '[Design Module]: Processing updated BIM model — Revit 2026…',
  '[Clash Detection]: Re-running clash analysis across 1,240 elements…',
  '[Resolution]: HVAC riser re-routed 450mm east — Clash NXS-CLH-008 resolved…',
  '[Task Engine]: 6 dependent operative tasks updated with revised coordinates…',
  '[Notification]: Zone B operative team notified of geometry update…',
  '[Digital Twin]: Spatial model updated — all zones synced to revision 4.1…',
  '✓ Digital Twin synchronisation complete.',
]

export default function DirectorDigitalTwin() {
  const [selectedZone, setSelectedZone] = useState('Zone B')
  const [resolving, setResolving] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [syncLogs2, setSyncLogs2] = useState([])

  function handleResolve() {
    setResolving(true)
    setTimeout(() => { setResolving(false); setResolved(true); setSyncLogs2(syncLogs) }, 800)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="director" userName="Dr. Priya Sharma" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">BIM Digital Twin &amp; Clash Management</h1>
              <p className="text-slate-500 mt-1">Live spatial model, design clash detection and resolution</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* 3D model viewer */}
              <div className="xl:col-span-2 bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-900 text-lg">Live 3D Spatial Model</h2>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition">
                      <RotateCw size={13} /> Rotate
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition">
                      <ZoomIn size={13} /> Zoom
                    </button>
                  </div>
                </div>

                {/* Mock 3D view */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl h-56 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="absolute border border-violet-400 rounded" style={{
                        top: `${10 + i * 10}%`, left: `${5 + i * 11}%`,
                        width: `${30 + i * 3}%`, height: `${20 + i * 2}%`,
                        transform: `perspective(600px) rotateX(${30 - i * 3}deg) rotateY(${i * 5}deg)`,
                      }} />
                    ))}
                  </div>
                  <div className="text-center z-10">
                    <Box className="text-violet-400 mx-auto mb-2" size={48} />
                    <p className="text-white font-bold text-sm">3D Model — {selectedZone}</p>
                    <p className="text-slate-400 text-xs">Revision 4.1 · Last synced 6 min ago</p>
                  </div>
                  {!resolved && (
                    <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
                      <AlertTriangle size={11} /> 2 Clashes
                    </div>
                  )}
                </div>

                {/* Zone selector */}
                <div className="grid grid-cols-4 gap-2">
                  {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map(z => (
                    <button
                      key={z}
                      onClick={() => setSelectedZone(z)}
                      className={`py-2 rounded-xl text-sm font-semibold transition ${
                        selectedZone === z
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/30'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clash panel */}
              <div className="space-y-5">
                {!resolved ? (
                  <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="text-rose-600" size={20} />
                      <h3 className="font-bold text-rose-900">Active Design Clash</h3>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Clash ID</span>
                        <span className="font-mono font-bold text-slate-900">NXS-CLH-009</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Element 1</span>
                        <span className="font-bold text-slate-900">HVAC Riser-04B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Element 2</span>
                        <span className="font-bold text-slate-900">Beam-C19</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Zone</span>
                        <span className="font-bold text-slate-900">Zone C · Level 4</span>
                      </div>
                    </div>
                    <button
                      onClick={handleResolve}
                      disabled={resolving}
                      className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
                    >
                      {resolving ? (
                        <><RefreshCw size={14} className="animate-spin" /> Processing…</>
                      ) : (
                        <><Settings size={14} /> Update Design &amp; Resolve</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center">
                    <p className="text-3xl mb-2">✓</p>
                    <p className="font-bold text-emerald-900">Clash Resolved</p>
                    <p className="text-emerald-600 text-xs mt-1">Digital Twin updated. Zone C synced.</p>
                  </div>
                )}

                <div className="bg-white rounded-3xl shadow border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-3 text-sm">Clash Summary</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: 'Total Clashes Detected', value: '14' },
                      { label: 'Resolved',               value: '12', color: 'text-emerald-600' },
                      { label: 'Active',                  value: resolved ? '0' : '2', color: resolved ? 'text-emerald-600' : 'text-rose-600' },
                    ].map(({ label, value, color = 'text-slate-900' }) => (
                      <div key={label} className="flex justify-between py-1.5 border-b border-slate-100 last:border-0">
                        <span className="text-slate-500">{label}</span>
                        <span className={`font-bold ${color}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {syncLogs2.length > 0 && (
              <SystemLog lines={syncLogs2} title="DIGITAL TWIN SYNC ENGINE" />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
