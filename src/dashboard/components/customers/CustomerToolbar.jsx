import { UserPlus } from "lucide-react";
import SearchInput from "../common/SearchInput";

export default function CustomerToolbar({
  search,
  onSearch,
  status,
  onStatusChange,
  onAddCustomer,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <SearchInput
            value={search}
            onChange={onSearch}
            placeholder="Search customer by name or email..."
            className="flex-1"
          />

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-700
              outline-none
              transition
              focus:border-pink-500
              focus:ring-4
              focus:ring-pink-100
            "
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Right Side */}
        <button
          onClick={onAddCustomer}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-pink-600
            px-5
            py-3
            text-sm
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-pink-700
          "
        >
          <UserPlus size={18} />
          Add Customer
        </button>
      </div>
    </div>
  );
}
