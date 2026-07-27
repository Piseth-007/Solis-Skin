import { PackageCheck, Package, Truck, CircleCheck } from "lucide-react";

const steps = [
  {
    key: "Processing",
    title: "Order Placed",
    icon: PackageCheck,
  },
  {
    key: "Packed",
    title: "Packed",
    icon: Package,
  },
  {
    key: "Shipped",
    title: "Shipped",
    icon: Truck,
  },
  {
    key: "Delivered",
    title: "Delivered",
    icon: CircleCheck,
  },
];

export default function OrderTimeline({ status }) {
  const currentIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-8 text-xl font-bold">Order Timeline</h2>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = index <= currentIndex;

          return (
            <div key={step.key} className="relative flex items-start gap-4">
              {/* Vertical Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-6 top-12 h-10 w-0.5 ${
                    completed ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Circle */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  completed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <Icon
                  size={22}
                  className={completed ? "text-green-600" : "text-gray-400"}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold">{step.title}</h3>

                <p
                  className={`text-sm ${
                    completed ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {completed ? "Completed" : "Waiting"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
