import { NavLink } from 'react-router-dom'
import { Network } from 'lucide-react'

export default function Sidebar({ items }) {
  return (
    <aside className="w-60 shrink-0 bg-slate-900 min-h-[calc(100vh-4rem)] flex flex-col">
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to.split('/').length <= 3}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-uba-600 text-white shadow-lg shadow-uba-900/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-4">
        <div className="border-t border-slate-800 pt-3">
          <p className="text-xs text-slate-600 text-center px-2">UBA Ops v1.0</p>
        </div>
      </div>
    </aside>
  )
}
