import { Shield, Map, FileText, Download, Plus } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Incident Queue', to: '/compliance/auditor',        icon: Shield },
  { label: 'Zone Maps',      to: '/compliance/auditor/maps',   icon: Map },
  { label: 'Reports',        to: '/compliance/auditor/reports', icon: FileText },
]

const reports = [
  { id: 'RPT-081', title: 'Monthly Safety Performance Report — May 2026', type: 'Safety',     date: 'Jun 1, 2026',  status: 'Published' },
  { id: 'RPT-082', title: 'Incident Resolution Report — NXS-IR-2038',     type: 'Incident',   date: 'Jun 2, 2026',  status: 'Published' },
  { id: 'RPT-083', title: 'Zone C Compliance Audit — Q2 2026',             type: 'Compliance', date: 'Jun 3, 2026',  status: 'Draft' },
  { id: 'RPT-084', title: 'Electrical Hazard Root Cause Analysis',         type: 'Incident',   date: 'Jun 4, 2026',  status: 'Published' },
  { id: 'RPT-085', title: 'Safe Work Method Statement Review — June 2026', type: 'SWMS',       date: 'Jun 5, 2026',  status: 'Pending Review' },
  { id: 'RPT-086', title: 'Emergency Evacuation Drill Report',             type: 'Safety',     date: 'Jun 6, 2026',  status: 'Published' },
]

const typeBadge = {
  'Safety':       'bg-blue-100 text-blue-700',
  'Incident':     'bg-rose-100 text-rose-700',
  'Compliance':   'bg-violet-100 text-violet-700',
  'SWMS':         'bg-amber-100 text-amber-700',
}

const statusBadge = {
  'Published':     'bg-emerald-100 text-emerald-700',
  'Draft':         'bg-slate-100 text-slate-600',
  'Pending Review':'bg-amber-100 text-amber-700',
}

export default function AuditorReports() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header role="auditor" userName="Taylor Reid" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Compliance &amp; Safety Reports</h1>
                <p className="text-slate-500 mt-1">Generate, review, and archive all compliance documentation</p>
              </div>
              <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow">
                <Plus size={16} /> Generate Report
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-5">
              {[
                { label: 'Total Reports',    value: reports.length, color: 'text-slate-700' },
                { label: 'This Month',       value: 6, color: 'text-violet-700' },
                { label: 'Incident Reports', value: reports.filter(r => r.type === 'Incident').length, color: 'text-rose-700' },
                { label: 'Published',        value: reports.filter(r => r.status === 'Published').length, color: 'text-emerald-700' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Reports table */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-rose-700">
                <h2 className="font-bold text-white">Report Archive</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Report ID', 'Title', 'Type', 'Generated', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r, i) => (
                    <tr key={r.id} className={`border-b border-slate-100 hover:bg-slate-50 transition ${i % 2 ? 'bg-slate-50/50' : ''}`}>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">{r.id}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900 max-w-xs">{r.title}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${typeBadge[r.type] || 'bg-slate-100 text-slate-600'}`}>{r.type}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">{r.date}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusBadge[r.status]}`}>{r.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1 transition">
                          <Download size={13} /> Download
                        </button>
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
