import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext"; // match your actual filename/casing
import { getUserById } from "../api/userApi";
import { getOrders } from "../api/orderApi";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import RecentOrders from "../components/profile/RecentOrders";
// import QuickActions from "../components/profile/QuickActions";

export default function Profile() {
  const { user: authUser } = useAuth();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?.userId) return;
    loadProfileData();
  }, [authUser?.userId]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [userData, allOrders] = await Promise.all([
        getUserById(authUser.userId),
        getOrders(),
      ]);

      setProfile(userData);
      setOrders(allOrders.filter((o) => o.userId === authUser.userId));
    } catch (error) {
      console.error("Failed to load profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-6">
        <ProfileHeader />

        <ProfileStats
          orders={orders.length}
          wishlist={wishlistCount}
          cart={totalItems}
          reviews={0} // no reviews backend yet
        />

        <div className="grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PersonalInfoCard user={profile} onUpdate={loadProfileData} />
          </div>

          <div className="space-y-6">
            <RecentOrders orders={orders.slice(0, 5)} />
          </div>
        </div>

        {/* <QuickActions /> */}
      </div>
    </section>
  );
}
