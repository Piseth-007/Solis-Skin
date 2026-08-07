import { useAuth } from "../../context/AuthContext";

export default function ProfileHeader() {
  const { user } = useAuth();

  const initials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="overflow-hidden rounded-3xl bg-linear-to-r from-rose-500 via-pink-500 to-rose-600 shadow-xl">
      <div className="flex flex-col items-center gap-6 p-10 text-white md:flex-row">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-4xl font-bold">
          {initials}
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold">
            Welcome back,
            <br />
            {user?.fullName}
          </h1>

          <p className="mt-3 text-rose-100">
            Manage your Solis Skin account and recent activity.
          </p>
        </div>

        <button className="rounded-xl bg-white px-6 py-3 font-semibold text-rose-600 transition hover:scale-105">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
