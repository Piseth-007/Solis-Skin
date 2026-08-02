import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";

import StatCard from "../common/StatCard";

export default function CustomerStats({ customers }) {
  const active = customers.filter(c => c.active).length;

  const inactive = customers.length - active;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total Customers"
        value={customers.length}
        icon={<Users size={28} />}
        color="bg-blue-500"
      />

      <StatCard
        title="Active"
        value={active}
        icon={<UserCheck size={28} />}
        color="bg-green-500"
      />

      <StatCard
        title="Inactive"
        value={inactive}
        icon={<UserX size={28} />}
        color="bg-red-500"
      />

      <StatCard
        title="New Customers"
        value="18"
        icon={<UserPlus size={28} />}
        color="bg-purple-500"
      />

    </div>
  );
}