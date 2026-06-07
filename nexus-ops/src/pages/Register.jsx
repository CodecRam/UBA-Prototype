import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Network, User, Mail, Phone, Upload, CheckCircle, ArrowLeft } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '' })
  const [license, setLicense]   = useState(null)
  const [clearance, setClearance] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => navigate('/login'), 2500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-uba-950 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-900/50">
            <CheckCircle className="text-white" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Identity Token Submitted</h2>
          <p className="text-uba-300 text-base">Your registration is pending verification. Redirecting to login…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-uba-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/login" className="text-uba-400 hover:text-white transition">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-uba-600 to-uba-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Network size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Register Identity Token</h1>
              <p className="text-uba-400 text-sm">Establish your UBA operator credentials</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-uba-200 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-uba-400" size={16} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Alex Morgan"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-uba-400 text-sm focus:outline-none focus:ring-2 focus:ring-uba-500 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-uba-200 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-uba-400" size={16} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@uba-ops.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-uba-400 text-sm focus:outline-none focus:ring-2 focus:ring-uba-500 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-uba-200 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-uba-400" size={16} />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+61 412 000 000"
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-uba-400 text-sm focus:outline-none focus:ring-2 focus:ring-uba-500 transition"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-uba-200 mb-1.5">Department</label>
                <select
                  value={form.department}
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-uba-500 transition"
                >
                  <option value="" className="bg-slate-900">Select department…</option>
                  <option className="bg-slate-900">Field Operations</option>
                  <option className="bg-slate-900">Zone Management</option>
                  <option className="bg-slate-900">Project Direction</option>
                  <option className="bg-slate-900">Asset Coordination</option>
                  <option className="bg-slate-900">Compliance &amp; Safety</option>
                  <option className="bg-slate-900">Platform Administration</option>
                </select>
              </div>
            </div>

            {/* Credential uploads */}
            <div className="border-t border-white/10 pt-5">
              <p className="text-sm font-semibold text-uba-200 mb-4">Upload Credentials</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UploadZone label="Operator License" file={license} onChange={setLicense} />
                <UploadZone label="Site Clearance Certificate" file={clearance} onChange={setClearance} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40"
            >
              <CheckCircle size={18} />
              Submit Identity Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function UploadZone({ label, file, onChange }) {
  return (
    <label className={`block border-2 border-dashed rounded-xl p-5 cursor-pointer transition ${
      file ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/20 hover:border-uba-500 hover:bg-white/5'
    }`}>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={e => onChange(e.target.files[0])}
      />
      <div className="flex flex-col items-center text-center gap-2">
        {file ? (
          <CheckCircle className="text-emerald-400" size={28} />
        ) : (
          <Upload className="text-uba-400" size={28} />
        )}
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-uba-400">
          {file ? file.name : 'PDF, JPG, PNG — max 5MB'}
        </p>
      </div>
    </label>
  )
}
