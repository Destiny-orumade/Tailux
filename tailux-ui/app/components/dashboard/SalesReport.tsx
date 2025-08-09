"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const days = [
  "10 Aug",
  "11 Aug",
  "12 Aug",
  "13 Aug",
  "14 Aug",
  "15 Aug",
  "16 Aug",
  "17 Aug",
  "18 Aug",
  "19 Aug",
  "20 Aug",
  "21 Aug",
  "22 Aug",
  "23 Aug",
  "24 Aug",     
  "25 Aug",
  "26 Aug",
  "27 Aug",
  "28 Aug",
  "29 Aug",
  "30 Aug",
  "31 Aug",
  "01 Sep",
];
const data = days.map((d) => ({
  name: d,
  a: Math.random() * 200 + 100,
  b: Math.random() * 150 + 50,
}));

export default function SalesReport() {
  const [range, setRange] = useState("Daily");

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
      <div className="w-full lg:w-[60%] bg-[#1A1B29] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">Sales Report</h3>
          <div className="space-x-2">
            {["Daily", "Monthly", "Yearly"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded ${
                  range === r
                    ? "bg-blue-500 text-black"
                    : "bg-transparent text-gray-400"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis stroke="#aaa" dataKey="name" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: "#333" }} />
              <Bar dataKey="a" fill="#4F46E5" radius={[5, 5, 0, 0]} />
              <Bar dataKey="b" fill="#3B82F6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full  lg:w-[40%] grid grid-cols-2 gap-4">
        <div className="bg-[#1A1B29] p-4 rounded-lg">
          <h4 className="text-gray-400 mb-1">Earning</h4>
          <p className="text-xl font-semibold">$16.4k</p>
          <div className="mt-4 flex gap-2 items-end h-20">
            {[60, 80, 50, 90, 70, 90].map((h, i) => (
              <div
                key={i}
                className="w-2 rounded bg-blue-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="bg-[#1A1B29] p-4 rounded-lg flex flex-col justify-between">
          <h4 className="text-gray-400">Current Rating</h4>
          <div className="flex justify-center items-center h-full">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  stroke="#2D3748"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  stroke="#10B981"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * 0.15}`}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-green-400 text-lg font-bold">
                85%
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-[#1A1B29] p-4 rounded-lg">
          <h4 className="text-gray-400">Orders</h4>
          <p className="text-xl font-semibold">22.6k</p>
          <div className="mt-4">
            <svg viewBox="0 0 100 30" className="w-full h-12">
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                points="0,25 10,10 20,15 30,5 40,15 50,10 60,20 70,10 80,15 90,10 100,20"
              />
            </svg>
          </div>
        </div>

        {/* Closed Orders */}
        <div className="bg-[#1A1B29] p-4 rounded-lg flex flex-col items-center justify-center text-center">
          <h4 className="text-gray-400 mb-2">Closed Orders</h4>
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="#2D3748"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="#3B82F6"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 30}`}
                strokeDashoffset={`${2 * Math.PI * 30 * 0.55}`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-blue-400 text-lg font-bold">
              45%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
