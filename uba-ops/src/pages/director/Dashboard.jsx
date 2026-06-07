import { useState } from 'react'
import { LayoutDashboard, Settings, TrendingUp, Box, Activity, Users, Zap, Calendar, Bell, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Command Centre',  to: '/ops/director',             icon: LayoutDashboard },
  { label: 'Project Config',  to: '/ops/director/config',      icon: Settings },
  { label: 'Financial Reports', to: '/ops/director/financial', icon: TrendingUp },
  { label: 'Digital Twin',    to: '/ops/director/digital-twin', icon: Box },
]

function CircleProgress({ pct, color, size = 120 }) {
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={10} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  )
}

const alerts = [
  { title: 'Supplier Delay — Structural Steel', body: 'Delivery of 80-tonne steel shipment delayed by 3 days due to logistics disruption. New ETA: June 10, 2026.', tag: 'Requires Acknowledgment', tagColor: 'bg-amber-100 text-amber-700' },
  { title: 'Unassigned Tasks: Zone C Roofing', body: '5 roofing membrane tasks in Zone C are pending operative assignment for scheduled completion.', tag: '5 Tasks Pending', tagColor: 'bg-rose-100 text-rose-700' },
]

export default function DirectorDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header role="director" userName="Dr. Priya Sharma" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Operations Command Centre</h1>
              <p className="text-slate-500 mt-1">Real-time project performance and decision intelligence</p>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
              {/* Overall Progress */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex flex-col items-center gap-3">
                <div className="relative">
                  <CircleProgress pct={71} color="#6d28d9" />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold text-violet-700">71%</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900">Overall Progress</p>
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">On Track</span>
                </div>
              </div>

              {/* Active Operatives */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center">
                    <Users className="text-cyan-600" size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-slate-900">38</p>
                    <p className="text-sm text-slate-500 font-medium">Active Operatives</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">6 zones currently staffed</p>
              </div>

              {/* Design Clashes */}
              <div className="bg-amber-50 rounded-3xl shadow-lg border-2 border-amber-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <Zap className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-amber-700">2</p>
                    <p className="text-sm text-amber-700 font-medium">Design Clashes</p>
                  </div>
                </div>
                <p className="text-xs text-amber-600 font-semibold">Requires immediate attention</p>
              </div>

              {/* Days to Milestone */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="text-violet-600" size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-slate-900">11</p>
                    <p className="text-sm text-slate-500 font-medium">Days to Milestone 6</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Milestone 6: Envelope &amp; Cladding</p>
              </div>
            </div>

            {/* Activity & Alerts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Activity feed */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Activity className="text-violet-600" size={18} />
                  <h2 className="font-bold text-slate-900 text-lg">System Activity Feed</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'Digital Twin synced — Zone B design update applied', time: '3 min ago', type: 'sync' },
                    { action: 'Incident NXS-IR-2041 resolved by Compliance Auditor', time: '42 min ago', type: 'resolve' },
                    { action: 'Invoice INV-0043 generated for SteelForm Ltd', time: '1 hr ago', type: 'finance' },
                    { action: 'Milestone 5 sign-off approved by Zone Supervisor', time: '2 hrs ago', type: 'milestone' },
                    { action: 'Predictive maintenance alert — Asset TC-2 (Tower Crane)', time: '3 hrs ago', type: 'alert' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                        a.type === 'alert' ? 'bg-amber-400' : a.type === 'resolve' ? 'bg-emerald-400' : 'bg-violet-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">{a.action}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts requiring attention */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Bell className="text-rose-500" size={18} />
                  <h2 className="font-bold text-slate-900 text-lg">Action Required</h2>
                </div>
                <div className="space-y-4">
                  {alerts.map((alert, i) => (
                    <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="font-bold text-slate-900 text-sm">{alert.title}</p>
                        <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${alert.tagColor}`}>{alert.tag}</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">{alert.body}</p>
                      <button className="text-violet-600 hover:text-violet-800 text-xs font-bold flex items-center gap-1 transition">
                        Take Action <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
