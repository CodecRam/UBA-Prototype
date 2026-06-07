import { LayoutDashboard, Settings, TrendingUp, Box, DollarSign, TrendingDown } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const navItems = [
  { label: 'Command Centre',    to: '/ops/director',              icon: LayoutDashboard },
  { label: 'Project Config',    to: '/ops/director/config',       icon: Settings },
  { label: 'Financial Reports', to: '/ops/director/financial',    icon: TrendingUp },
  { label: 'Digital Twin',      to: '/ops/director/digital-twin', icon: Box },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const actual  = [220, 310, 380, 470, 540, 620]
const planned = [250, 330, 420, 510, 590, 680]
const maxVal  = 700

function Bar({ val, maxVal, color }) {
  const pct = (val / maxVal) * 100
  return (
    <div className="w-full bg-slate-100 rounded-full overflow-hidden" style={{ height: 160 }}>
      <div
        className={`w-full ${color} rounded-t-full transition-all duration-700`}
        style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
      />
    </div>
  )
}

const milestones = [
  { phase: 'Phase 1: Earthworks & Foundation', variance: '+3 days', status: 'Ahead', progress: 100, original: 'May 15, 2026', revised: 'May 12, 2026' },
  { phase: 'Phase 2: Substructure',            variance: '-2 days', status: 'Delayed', progress: 85, original: 'Jun 8, 2026',  revised: 'Jun 10, 2026' },
  { phase: 'Phase 3: Superstructure',          variance: '0 days',  status: 'On Track', progress: 52, original: 'Jul 14, 2026', revised: 'Jul 14, 2026' },
]

export default function DirectorFinancial() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header role="director" userName="Dr. Priya Sharma" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Financial Reports &amp; Variance Analysis</h1>
              <p className="text-slate-500 mt-1">Burn-rate tracking, budget performance, and milestone deviation</p>
            </div>

            {/* Budget KPIs */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: 'Total Project Budget', value: '$2.4M', sub: 'Approved Q1 2026', color: 'text-slate-900', bg: 'bg-white' },
                { label: 'Expenditure to Date',  value: '$1.38M', sub: '57.5% utilised', color: 'text-violet-700', bg: 'bg-violet-50' },
                { label: 'Remaining Budget',     value: '$1.02M', sub: '$88k under forecast', color: 'text-emerald-700', bg: 'bg-emerald-50' },
              ].map(({ label, value, sub, color, bg }) => (
                <div key={label} className={`${bg} rounded-3xl shadow-lg border border-slate-200 p-6`}>
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="text-slate-400" size={18} />
                    <p className="text-sm text-slate-500 font-semibold">{label}</p>
                  </div>
                  <p className={`text-4xl font-extrabold ${color}`}>{value}</p>
                  <p className="text-xs text-slate-400 mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* Burn-rate chart */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <h2 className="font-bold text-slate-900 text-lg mb-6">Monthly Burn-Rate vs. Planned Budget</h2>
              <div className="flex items-end gap-4 h-44 mb-4">
                {months.map((m, i) => (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 items-end h-40">
                      <Bar val={actual[i]} maxVal={maxVal} color="bg-violet-500" />
                      <Bar val={planned[i]} maxVal={maxVal} color="bg-slate-200" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{m}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-violet-500" /> Actual Burn-Rate ($K)</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-slate-200" /> Planned Budget ($K)</div>
              </div>
            </div>

            {/* Milestone variance */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                <TrendingDown className="text-rose-500" size={20} /> Milestone Schedule Variance Analysis
              </h2>
              <div className="space-y-5">
                {milestones.map(m => (
                  <div key={m.phase} className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="font-bold text-slate-900 text-sm">{m.phase}</p>
                      <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                        m.status === 'Ahead'    ? 'bg-emerald-100 text-emerald-700' :
                        m.status === 'Delayed'  ? 'bg-rose-100 text-rose-700' :
                        'bg-cyan-100 text-cyan-700'
                      }`}>{m.variance} ({m.status})</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden mb-3">
                      <div className={`h-full rounded-full ${m.status === 'Delayed' ? 'bg-rose-500' : 'bg-violet-600'}`}
                        style={{ width: `${m.progress}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs text-slate-500">
                      <div><span className="font-semibold">Progress:</span> {m.progress}%</div>
                      <div><span className="font-semibold">Original:</span> {m.original}</div>
                      <div><span className="font-semibold">Revised:</span> {m.revised}</div>
                    </div>
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
