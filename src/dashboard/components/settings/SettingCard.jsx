export default function SettingCard({ title, description, children, onSave }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="space-y-6 p-6">{children}</div>

      {onSave && (
        <div className="flex justify-end border-t border-slate-100 p-6">
          <button
            onClick={onSave}
            className="rounded-xl bg-pink-600 px-6 py-2 text-white transition hover:bg-pink-700"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
