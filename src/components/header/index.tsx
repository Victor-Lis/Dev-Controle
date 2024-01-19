"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7x1 mx-auto">
        <Link href={"/"}>
          <h1 className="font-bold text-2x1 hover:tracking-widest duration-300">
            <span className="text-blue-500">Dev</span>
            CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex gap-x-4 items-baseline">
            <Link href={"/dashboard"}>
              <FiUser size={24} color="#4b5563" />
            </Link>

            <button onClick={handleLogout}>
              <FiLogOut size={24} color="#ff3a13" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
