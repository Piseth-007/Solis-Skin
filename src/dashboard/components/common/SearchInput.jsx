import { Search, X } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon */}
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          py-3
          pl-11
          pr-11
          text-sm
          text-slate-700
          placeholder:text-slate-400
          shadow-sm
          outline-none
          transition-all
          duration-200
          focus:border-pink-500
          focus:ring-4
          focus:ring-pink-100
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-600
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
