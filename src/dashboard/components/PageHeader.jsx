import { Plus } from "lucide-react";

export default function PageHeader({
  title,
  description,
  buttonText,
  onButtonClick,
  showButton = false,
  children,
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {description && (
            <p className="mt-2 text-sm text-slate-500">{description}</p>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {children}

          {showButton && (
            <button
              onClick={onButtonClick}
              className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-pink-700 hover:shadow-md"
            >
              <Plus size={18} />
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
