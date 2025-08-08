"use client";
import { FiBarChart2, FiUsers, FiBox, FiDollarSign } from "react-icons/fi";

const stats = [
  {
    label: "Sales",
    value: "6.5k",
    percent: "4.3%",
    icon: FiBarChart2,
    color: "text-blue-500",
  },
  {
    label: "Customers",
    value: "12k",
    percent: "7.2%",
    icon: FiUsers,
    color: "text-yellow-500",
  },
  {
    label: "Products",
    value: "47k",
    percent: "8%",
    icon: FiBox,
    color: "text-green-500",
  },
  {
    label: "Revenue",
    value: "$128k",
    percent: "3.69%",
    icon: FiDollarSign,
    color: "text-pink-500",
  },
];

export default function StatsCards() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-[#1A1B29] p-4 rounded-lg shadow hover:scale-[1.02] transition-transform"
          >
            <div className="flex justify-between">
              <div>
                <h4 className="text-gray-400">{s.label}</h4>
                <p className="text-2xl font-semibold">{s.value}</p>
              </div>
              <s.icon className={s.color} size={28} />
            </div>
            {s.percent && (
              <div className="flex items-center space-x-1 text-sm text-green-400 mt-1">
                <span>▲ {s.percent}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
