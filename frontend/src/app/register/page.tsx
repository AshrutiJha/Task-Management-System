"use client";

import { useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { email, password });
      toast.success("Registered successfully");
      router.push("/login");
    } catch {
      toast.error("Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Register ✨
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg placeholder-gray-500 text-gray-800 
             focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg placeholder-gray-500 text-gray-800 
             focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-green-600 cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}