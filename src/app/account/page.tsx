// src/app/account/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    // While redirecting, render nothing
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0B0F0A] text-[#F6F4EC] p-6">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&crop=faces&fit=crop"
          alt="Profile picture"
          className="w-24 h-24 rounded-full object-cover border-2 border-[#4CA82E]"
        />
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-sm text-[#FFC400]">{user.email}</p>
      </div>
      <button
        onClick={logout}
        className="px-6 py-2 bg-[#4CA82E] text-black rounded hover:bg-[#3b8a23] transition"
      >
        Logout
      </button>
    </main>
  );
}

