export default function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
        value ? 'bg-emerald-500' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
          value ? 'translate-x-8' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
