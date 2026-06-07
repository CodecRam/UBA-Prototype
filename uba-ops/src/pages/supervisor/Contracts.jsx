import { useState } from 'react'
import { Users, LayoutDashboard, Key, FileText, CheckCircle, DollarSign } from 'lucide-react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import SystemLog from '../../components/SystemLog'

const navItems = [
  { label: 'Dashboard',     to: '/zone/supervisor',           icon: LayoutDashboard },
  { label: 'Workforce',     to: '/zone/supervisor/workforce', icon: Users },
  { label: 'Access Control', to: '/zone/supervisor/access',  icon: Key },
  { label: 'Contracts',     to: '/zone/supervisor/contracts', icon: FileText },
]

const invoices = [
  { id: 'INV-0041', milestone: 'Phase 3: MEP Rough-In', contractor: 'TechCore Solutions', amount: '$48,200', date: 'Jun 5, 2026', status: 'Paid' },
  { id: 'INV-0042', milestone: 'Phase 3: MEP Rough-In', contractor: 'AquaFlow Services',  amount: '$31,500', date: 'Jun 5, 2026', status: 'Pending' },
  { id: 'INV-0043', milestone: 'Phase 4: Structural Frame', contractor: 'SteelForm Ltd',  amount: '$94,800', date: 'Jun 7, 2026', status: 'Pending' },
]

const invoiceLogs = [
  '[Finance Module]: Generating invoice via SAP FICO connector…',
  '[Payment Gateway]: Configuring payment terms — Net 30…',
  '[Notification]: Invoice dispatched to contractor payment portal…',
  '[Audit Log]: Invoice record signed and archived…',
  '✓ Invoice generation complete — ID: INV-0044',
]

export default function SupervisorContracts() {
  const [invLog, setInvLog] = useState([])
  const [generated, setGenerated] = useState(false)

  function generateInvoice() {
    setInvLog(invoiceLogs)
    setGenerated(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header role="supervisor" />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Contract &amp; Invoicing</h1>
              <p className="text-slate-500 mt-1">Manage milestone sign-offs and generate contractor invoices</p>
            </div>

            {/* Pending sign-offs */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
              <h2 className="font-bold text-slate-900 text-lg mb-5">Pending Milestone Sign-Off</h2>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mb-2 inline-block">VERIFIED</span>
                  <p className="font-bold text-slate-900">Milestone 5: Building Envelope Completion</p>
                  <p className="text-sm text-slate-500 mt-0.5">All quality, schedule, and budget criteria met</p>
                </div>
                <button
                  onClick={generateInvoice}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition shadow shrink-0"
                >
                  Sign Off &amp; Generate Invoice
                </button>
              </div>
              {generated && <div className="mt-4"><SystemLog lines={invLog} title="INVOICE GENERATION PIPELINE" /></div>}
            </div>

            {/* Invoice ledger */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-uba-700">
                <h2 className="font-bold text-white text-base">Invoice Ledger</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Invoice #', 'Milestone', 'Contractor', 'Amount', 'Date', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, i) => (
                    <tr key={inv.id} className={`border-b border-slate-100 hover:bg-slate-50 transition ${i % 2 ? 'bg-slate-50/50' : ''}`}>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">{inv.id}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">{inv.milestone}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{inv.contractor}</td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-900">{inv.amount}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">{inv.date}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{inv.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-uba-600 hover:text-uba-800 text-xs font-semibold transition">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <div className="flex gap-8 text-sm">
                  <div><span className="text-slate-500">Total Invoices:</span> <span className="font-bold text-slate-900">{invoices.length}</span></div>
                  <div><span className="text-slate-500">Paid:</span> <span className="font-bold text-emerald-700">{invoices.filter(i => i.status === 'Paid').length}</span></div>
                  <div><span className="text-slate-500">Pending:</span> <span className="font-bold text-amber-600">{invoices.filter(i => i.status === 'Pending').length}</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
