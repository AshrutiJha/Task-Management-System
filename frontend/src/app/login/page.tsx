"use client";

import { useState, useEffect } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      toast.success("Login successful");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login 🚀
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg placeholder-gray-500 text-gray-800 
             focus:outline-none focus:ring-2 focus:ring-blue-500 "
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg placeholder-gray-500 text-gray-800 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Do not have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer font-medium hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}