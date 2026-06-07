import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, CheckCircle2, AlertTriangle, BookOpen, User, ChevronRight, Clock, MapPin } from 'lucide-react'

const tabs = [
  { label: 'Home',      icon: Home,          path: '/operative/dashboard' },
  { label: 'Tasks',     icon: CheckCircle2,  path: '/operative/tasks' },
  { label: 'Incidents', icon: AlertTriangle, path: '/operative/incidents' },
  { label: 'Knowledge', icon: BookOpen,      path: '/operative/knowledge' },
  { label: 'Profile',   icon: User,          path: '/operative/profile' },
]

const statusStyles = {
  'To-Do':       'bg-slate-100 text-slate-700 border-slate-300',
  'In Progress': 'bg-violet-100 text-violet-700 border-violet-300',
  'Completed':   'bg-emerald-100 text-emerald-700 border-emerald-300',
}

const initialTasks = [
  { id: 'T-001', title: 'HVAC Duct Inspection — Section 3B', zone: 'Zone B · Floor 3', status: 'In Progress', priority: 'High', due: 'Today 14:00' },
  { id: 'T-002', title: 'Conduit Cable Routing — East Wing', zone: 'Zone A · Basement', status: 'To-Do', priority: 'Medium', due: 'Jun 8' },
  { id: 'T-003', title: 'Scaffolding Structural Check', zone: 'Zone C · Exterior', status: 'Completed', priority: 'Low', due: 'Jun 5' },
  { id: 'T-004', title: 'Emergency Generator Test', zone: 'Zone D · Plant Room', status: 'To-Do', priority: 'High', due: 'Jun 9' },
]

export default function OperativeTasks() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(initialTasks)

  function updateStatus(id, status) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-gradient-to-r from-violet-700 to-violet-800 text-white px-5 py-5">
        <h1 className="text-xl font-bold">Assigned Tasks</h1>
        <p className="text-violet-300 text-sm mt-0.5">Your active work assignments</p>
      </header>

      <div className="px-4 py-5 space-y-4 max-w-2xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total', count: tasks.length, color: 'text-slate-700', bg: 'bg-white' },
            { label: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length, color: 'text-violet-700', bg: 'bg-violet-50' },
            { label: 'Completed', count: tasks.filter(t => t.status === 'Completed').length, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          ].map(({ label, count, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-4 border border-slate-200 text-center shadow-sm`}>
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Task cards */}
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">{task.id}</p>
                <h3 className="font-bold text-slate-900 leading-snug">{task.title}</h3>
              </div>
              <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold border ${
                task.priority === 'High' ? 'bg-rose-100 text-rose-700 border-rose-300' :
                task.priority === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                'bg-slate-100 text-slate-600 border-slate-300'
              }`}>{task.priority}</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><MapPin size={12} />{task.zone}</span>
              <span className="flex items-center gap-1"><Clock size={12} />Due: {task.due}</span>
            </div>

            <div className="flex items-center justify-between">
              <select
                value={task.status}
                onChange={e => updateStatus(task.id, e.target.value)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${statusStyles[task.status]}`}
              >
                {Object.keys(statusStyles).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className="text-violet-600 hover:text-violet-800 transition flex items-center gap-1 text-xs font-semibold">
                View Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-50">
        <div className="flex max-w-2xl mx-auto">
          {tabs.map(({ label, icon: Icon, path }) => {
            const active = window.location.pathname === path
            return (
              <button key={label} onClick={() => navigate(path)} className="flex-1 flex flex-col items-center gap-1 py-3">
                <Icon size={20} className={active ? 'text-violet-600' : 'text-slate-400'} />
                <span className={`text-xs font-semibold ${active ? 'text-violet-600' : 'text-slate-400'}`}>{label}</span>
                {active && <span className="w-8 h-0.5 bg-violet-600 rounded-full" />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
