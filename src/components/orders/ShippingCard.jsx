import { MapPin } from "lucide-react";

export default function ShippingCard({ shipping }) {
  if (!shipping) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-center text-gray-500">
          No shipping information available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <MapPin className="text-rose-500" />
        <h2 className="text-xl font-bold">Shipping Address</h2>
      </div>

      <div className="space-y-2 text-gray-600">
        <p className="font-semibold text-gray-900">{shipping.fullName}</p>

        <p>{shipping.phone}</p>

        <p>{shipping.address}</p>

        <p>
          {shipping.city}
          {shipping.province ? `, ${shipping.province}` : ""}
        </p>

        {shipping.postalCode && <p>{shipping.postalCode}</p>}
      </div>
    </div>
  );
}
