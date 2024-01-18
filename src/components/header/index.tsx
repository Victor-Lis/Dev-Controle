import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
  return (
    <div className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7x1 mx-auto">
        <Link href={"/"}>
          <h1 className="font-bold text-2x1 hover:tracking-widest duration-300">
            <span className="text-blue-500">Dev</span>
            CONTROLE
          </h1>
        </Link>
      </div>

      <div className="flex gap-x-4 items-baseline">
        <Link href={"/dashboard"}>
          <FiUser size={24} color="#4b5563" />
        </Link>

        <button>
          <FiLogOut size={24} color="#4b5563" />
        </button>
      </div>
    </div>
  );
}
