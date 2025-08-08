"use client";

import { useState } from "react";
import { FiHome, FiBarChart2, FiSettings } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const navItems = [
    { id: "dashboard", icon: <FiHome size={20} />, tooltip: "Dashboard" },
    { id: "orders", icon: <BsCart2 size={20} />, tooltip: "Orders" },
    {
      id: "customers",
      icon: <MdOutlinePeopleAlt size={20} />,
      tooltip: "Customers",
    },
    { id: "analytics", icon: <FiBarChart2 size={20} />, tooltip: "Analytics" },
    { id: "settings", icon: <FiSettings size={20} />, tooltip: "Settings" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-16 bg-[#0f172a] text-white flex flex-col items-center py-4 z-50 shadow-md">
      <div className="mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200.39"
          height="112.97"
          viewBox="0 0 200.39 112.97"
          className="size-10 text-primary-600 dark:text-primary-400"
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                d="M199.54,103.9l-60.27-101a6,6,0,0,0-8.87-1.64L2.3,102.26A6,6,0,0,0,6,113H28.33a6,6,0,0,0,3.72-1.29l91.24-71.9a6,6,0,0,1,8.86,1.64L154,78.06a6,6,0,0,1-5.16,9.08H121.13a6,6,0,0,0-3.69,1.26L99.68,102.24A6,6,0,0,0,103.37,113h91A6,6,0,0,0,199.54,103.9Z"
                style={{ fill: "currentColor" }}
              />
            </g>
          </g>
        </svg>
      </div>

      <nav className="flex flex-col gap-8">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`relative group p-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#1e293b] ${
              active === item.id ? "bg-[#1e293b]" : ""
            }`}
          >
            {item.icon}
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item.tooltip}
            </span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
