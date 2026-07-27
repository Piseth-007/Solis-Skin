import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import RecentOrders from "../components/profile/RecentOrders";
import WishlistSummary from "../components/profile/WishlistSummary";
import RewardsCard from "../components/profile/RewardsCard";
import QuickActions from "../components/profile/QuickActions";
export default function Profile() {
  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-6">
        <ProfileHeader />

        <ProfileStats orders={12} wishlist={8} cart={3} reviews={5} />

        <div className="grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PersonalInfoCard />
          </div>

          <div className="space-y-6">
            <RecentOrders />
            <WishlistSummary />
            <RewardsCard />
          </div>
        </div>

        <QuickActions />
      </div>
    </section>
  );
}
