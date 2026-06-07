import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Network, Mail, Lock, ChevronDown, LogIn, Zap } from 'lucide-react'

const roles = [
  { value: 'operative',   label: 'Field Operative',       route: '/operative/dashboard' },
  { value: 'supervisor',  label: 'Zone Supervisor',        route: '/zone/supervisor' },
  { value: 'director',    label: 'Operations Director',    route: '/ops/director' },
  { value: 'coordinator', label: 'Asset Coordinator',      route: '/asset/coordinator' },
  { value: 'auditor',     label: 'Compliance Auditor',     route: '/compliance/auditor' },
  { value: 'admin',       label: 'Platform Administrator', route: '/platform/admin' },
]

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole]         = useState('')
  const [loading, setLoading]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const found = roles.find(r => r.value === role)
    if (!found) return
    setLoading(true)
    setTimeout(() => navigate(found.route), 900)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-uba-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.04%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-uba-600 to-uba-800 rounded-3xl shadow-2xl shadow-uba-900/60 mb-4">
            <Network className="text-white" size={40} />
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight leading-none">UBA</h1>
          <p className="text-uba-300 mt-2 text-base font-medium">Urban Build AI Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={18} className="text-uba-400" />
            <h2 className="text-lg font-bold text-white">Secure Access Portal</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-violet-200 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="operator@uba-ops.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-uba-400 text-sm focus:outline-none focus:ring-2 focus:ring-uba-500 focus:border-uba-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-violet-200 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-violet-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-violet-200 mb-1.5">
                Select Role <span className="text-violet-400 font-normal">(Demo Mode)</span>
              </label>
              <div className="relative">
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-uba-400 pointer-events-none" size={16} />
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-uba-500 transition cursor-pointer"
                >
                  <option value="" className="bg-slate-900">— Choose Your Role —</option>
                  {roles.map(r => (
                    <option key={r.value} value={r.value} className="bg-slate-900">{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!role || loading}
              className="w-full mt-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-900/50 hover:shadow-violet-900/70"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <>
                  <LogIn size={18} />
                  Authenticate &amp; Enter
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-violet-400 mt-5">
            New operator?{' '}
            <Link to="/register" className="text-violet-300 font-semibold hover:text-white transition">
              Register Identity Token
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Demo: Select any role to explore the full operations platform
        </p>
      </div>
    </div>
  )
}
