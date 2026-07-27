import { Gift, Sparkles } from "lucide-react";

export default function RewardsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-yellow-100 p-3">
          <Gift className="text-yellow-600" />
        </div>

        <div>
          <h3 className="font-bold">Beauty Rewards</h3>

          <p className="text-sm text-gray-500">Earn points every purchase</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between">
          <span>420 Points</span>

          <span>500</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div className="h-3 w-[84%] rounded-full bg-linear    -to-r from-yellow-400 to-yellow-500" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-yellow-600">
        <Sparkles size={18} />

        <span className="font-semibold">80 points until next reward</span>
      </div>
    </div>
  );
}
