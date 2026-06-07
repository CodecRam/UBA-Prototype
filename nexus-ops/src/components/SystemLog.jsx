import { useEffect, useRef } from 'react'
import { Terminal } from 'lucide-react'

export default function SystemLog({ lines, title = 'UBA SYSTEM LOG' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [lines])

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800">
        <Terminal size={14} className="text-uba-400" />
        <span className="text-xs font-bold text-uba-400 tracking-widest">{title}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-400 font-mono">LIVE</span>
        </span>
      </div>
      <div ref={ref} className="p-5 max-h-52 overflow-y-auto scrollbar-thin space-y-1.5">
        {lines.map((line, i) => (
          <p key={i} className="font-mono text-xs text-slate-300 leading-relaxed">
            <span className="text-uba-400 mr-2">▶</span>{line}
          </p>
        ))}
      </div>
    </div>
  )
}
