"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // remove tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    toast.success("Logged out");

    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3 mb-6">
      <h1 className="text-xl font-bold text-blue-600">Task Manager</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}