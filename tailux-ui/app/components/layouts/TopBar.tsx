"use client";
import { FiSearch, FiBell } from "react-icons/fi";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="fixed top-0 left-16 right-0 z-50 flex justify-between items-center h-16 bg-[#0F0F1A] px-4 shadow-md">
      <div className="relative w-full max-w-md left-180">
        <FiSearch
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full pl-10 pr-4 py-2 bg-[#1A1B29] rounded-lg border-none outline-none text-white"
        />
      </div>

      <div className="flex items-center space-x-4 ml-4">
        <FiBell
          className="text-gray-400 hover:text-gray-200 transition-colors"
          size={20}
        />
        <div className="h-6 w-6 rounded-full overflow-hidden">
          <Image
            src="/flag-uk.svg"
            alt="lang"
            width={24}
            height={24}
            className="object-cover"
          />
        </div>
        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600">
          <Image
            src="/user.jpg"
            alt="User"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
