import { useState } from 'react'
import { Shield, Map, FileText, Lock, Unlock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import SystemLog from '../../components/SystemLog'
import Toggle from '../../components/Toggle'

const navItems = [
  { label: 'Incident Queue', to: '/compliance/auditor',        icon: Shield },
  { label: 'Zone Maps',      to: '/compliance/auditor/maps',   icon: Map },
  { label: 'Reports',        to: '/compliance/auditor/reports', icon: FileText },
]

const resolutionLogs = [
  '[Compliance Module]: Incident UBA-IR-2041 status → Resolved. Generating Incident Resolution Packet…',
  '[Documentation]: Compiling evidence, photos, and GPS data for IRP-2041…',
  '[Digital Twin]: Updating spatial model — Zone B cleared of hazard marker…',
  '[Zone Control]: Zone B access restriction lifted — status reset to Safe…',
  '[Portal Integration]: Pushing resolution packet to UBA Compliance Portal…',
  '✓ Incident Resolution Packet IRP-2041 generated and archived.',
]

export default function AuditorDashboard() {
  const [zones, setZones] = useState({
    A: { status: 'Safe', locked: false },
    B: { status: 'Safe', locked: false },
    C: { status: 'RESTRICTED', locked: true },
    D: { status: 'Safe', locked: false },
  })
  const [digitalLock, setDigitalLock] = useState(true)
  const [lockNotified, setLockNotified] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [resLogs, setResLogs] = useState([])

  function handleLockToggle(v) {
    setDigitalLock(v)
    setLockNotified(true)
  }

  function handleResolve() {
    setResolved(true)
    setResLogs(resolutionLogs)
    setZones(prev => ({ ...prev, C: { status: 'Safe', locked: false } }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="auditor" userName="Taylor Reid" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Compliance Command Centre</h1>
              <p className="text-slate-500 mt-1">Incident resolution, zone lockdown control, and compliance reporting</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Zone access control */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
                <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <Lock className="text-rose-600" size={20} /> Zone Lockdown Control
                </h2>

                {/* Zone grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {Object.entries(zones).map(([id, z]) => (
                    <div key={id} className={`rounded-2xl p-4 border-2 ${
                      z.status === 'RESTRICTED'
                        ? 'bg-rose-50 border-rose-400'
                        : 'bg-emerald-50 border-emerald-300'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-slate-900">Zone {id}</p>
                        {z.locked ? <Lock className="text-rose-600" size={16} /> : <Unlock className="text-emerald-600" size={16} />}
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        z.status === 'RESTRICTED' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                      }`}>{z.status}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    Zone C has an active high-severity incident. Enforce digital lockdown to restrict all access pending resolution.
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Enforce Digital Lock — Zone C</p>
                    <p className="text-xs text-slate-500">All zone entry points will be restricted</p>
                  </div>
                  <Toggle value={digitalLock} onChange={handleLockToggle} />
                </div>

                {lockNotified && (
                  <p className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle size={14} /> Lockdown notification dispatched to all site operatives
                  </p>
                )}
              </div>

              {/* Active incident */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
                <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <AlertTriangle className="text-rose-500" size={20} /> Active Incident
                </h2>

                {resolved ? (
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center">
                    <CheckCircle className="text-emerald-500 mx-auto mb-3" size={40} />
                    <p className="font-bold text-emerald-900 text-base">Incident Resolved</p>
                    <p className="text-emerald-700 text-sm mt-1">Digital Twin updated. Zone C access restored. IRP-2041 archived.</p>
                  </div>
                ) : (
                  <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-mono text-sm font-bold text-slate-900">UBA-IR-2041</p>
                      <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">HIGH SEVERITY</span>
                    </div>
                    <p className="font-bold text-slate-900 text-base mb-1">Exposed Live Electrical Wiring</p>
                    <div className="space-y-1 text-sm text-slate-600 mb-4">
                      <p><span className="font-semibold">Zone:</span> Zone C · Building 2 · Level 3</p>
                      <p><span className="font-semibold">Reported by:</span> Alex Morgan (Field Operative)</p>
                      <p><span className="font-semibold">Date &amp; Time:</span> Jun 3, 2026 — 10:45 AM</p>
                    </div>
                    <p className="text-xs text-slate-600 bg-white rounded-xl p-3 border border-slate-200 mb-4">
                      Field operative identified exposed high-voltage wiring adjacent to active scaffolding. Immediate area cordoned off. Risk of serious electrical injury. Requires urgent Safety Officer inspection and remediation.
                    </p>
                    <div className="flex gap-2 text-xs mb-4">
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full">Photo Evidence (3)</span>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full">GPS Tagged</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-1.5">
                        Begin Remediation <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={handleResolve}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {resLogs.length > 0 && (
              <SystemLog lines={resLogs} title="COMPLIANCE RESOLUTION PIPELINE" />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
