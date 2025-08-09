"use client";
import React, { useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
  FaPinterest,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";

export default function ActivitySection() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex gap-6 w-full">
      <div className="flex flex-col gap-6 w-[60%]">
        <div className="bg-[#111] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">Team Activity</h2>
            <button className="text-sm text-blue-400 hover:underline">
              View All
            </button>
          </div>
          <ul className="space-y-5">
            {[
              {
                color: "bg-gray-500",
                title: "User Photo Changed",
                time: "12 minutes ago",
                desc: "John Doe changed his avatar photo",
              },
              {
                color: "bg-blue-500",
                title: "Video Added",
                time: "2 hours ago",
                desc: "Mores Clarke added new video",
              },
              {
                color: "bg-green-500",
                title: "Design Completed",
                time: "3 hours ago",
                desc: "Robert Nolan completed the design of the CRM application",
              },
              {
                color: "bg-yellow-500",
                title: "ER Diagram",
                time: "a day ago",
                desc: "Team completed the ER diagram app",
              },
              {
                color: "bg-red-500",
                title: "Weekly Report",
                time: "2 days ago",
                desc: "The weekly report was uploaded",
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className={`w-2 h-2 rounded-full mt-2 ${item.color}`}
                ></span>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-400 text-xs">{item.time}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#111] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">Country Source</h2>
            <button className="text-sm text-blue-400 hover:underline">
              View All
            </button>
          </div>
          <p className="text-white text-2xl font-semibold">
            93
            <span className="text-green-500 text-sm font-normal ml-1">
              +1.3%
            </span>
          </p>
          <p className="text-gray-400 text-sm mb-4">Country in this month</p>

          <div className="flex items-center justify-between border-t border-gray-800 pt-3 mt-3">
            <div className="flex items-center gap-2">
              <Image src="/spain.svg" alt="Spain" width={20} height={20} />
              <span className="text-white text-sm">Spain</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-green-500">2.37k ↑</span>
              <span className="text-red-500">36.52k ↓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111] rounded-xl p-5">
        <div className="flex justify-between items-center mb-4 relative">
          <h2 className="text-white font-semibold text-lg">Social Source</h2>
          <button
            className="text-white px-2 py-1 rounded hover:bg-gray-800"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            •••
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-10 bg-[#1b1b1b] rounded-md shadow-lg w-40 text-sm">
              {[
                "Action",
                "Another action",
                "Other action",
                "Separated action",
              ].map((act, i) => (
                <button
                  key={i}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300"
                  onClick={() => setDropdownOpen(false)}
                >
                  {act}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-white text-2xl font-semibold">
          135K
          <span className="text-green-500 text-sm font-normal ml-1">+3.1%</span>
        </p>
        <p className="text-gray-400 text-sm mb-4">View in this month</p>

        <ul className="space-y-4">
          {[
            {
              icon: <FaInstagram className="text-pink-500" />,
              name: "Instagram",
              views: "34.36k",
              money: "$5.17k",
              trend: "up",
            },
            {
              icon: <FaFacebook className="text-blue-500" />,
              name: "Facebook",
              views: "24.62k",
              money: "$4.32k",
              trend: "up",
            },
            {
              icon: <FaTiktok className="text-white" />,
              name: "Tik Tok",
              views: "17.36k",
              money: "$3.47k",
              trend: "down",
            },
            {
              icon: <FaTwitter className="text-blue-400" />,
              name: "Twitter",
              views: "49.32k",
              money: "$1.26k",
              trend: "up",
            },
            {
              icon: <FaPinterest className="text-red-400" />,
              name: "Pinterest",
              views: "6.92k",
              money: "$926",
              trend: "up",
            },
            {
              icon: <FaDiscord className="text-indigo-400" />,
              name: "Discord",
              views: "639",
              money: "$517",
              trend: "up",
            },
            {
              icon: <FaYoutube className="text-red-500" />,
              name: "Youtube",
              views: "391",
              money: "$268",
              trend: "down",
            },
          ].map((item, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-white text-sm">{item.name}</span>
              </div>
              <div className="flex gap-5 text-sm relative left-4">
                <span className="text-gray-400">{item.views}</span>
                <span
                  className={
                    item.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.money}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[40%] bg-transparent flex flex-col gap-4">
        <div className="bg-[#111] rounded-xl p-5 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">Transactions</h2>
            <button className="text-sm text-blue-400 hover:underline">
              View All
            </button>
          </div>
          <ul className="space-y-4 border-b border-gray-800 pb-4">
            {[
              {
                name: "Konnor Guzman",
                date: "Dec 21, 2021 - 08:05",
                amount: "$660.22",
                color: "text-green-500",
                avatar: "/fuller.jpg",
              },
              {
                name: "Henry Curtis",
                date: "Dec 19, 2021 - 11:55",
                amount: "$33.63",
                color: "text-green-500",
                avatar: "/1.jpg",
              },
              {
                name: "Derrick Simmons",
                date: "Dec 16, 2021 - 14:45",
                amount: "$674.63",
                color: "text-orange-500",
                avatar: "/2.jpg",
              },
              {
                name: "Kartina West",
                date: "Dec 13, 2021 - 11:30",
                amount: "$547.63",
                color: "text-green-500",
                avatar: "/3.jpg",
              },
              {
                name: "Samantha Shelton",
                date: "Dec 10, 2021 - 09:41",
                amount: "$736.24",
                color: "text-green-500",
                avatar: "/4.jpg",
              },
              {
                name: "Joe Perkins",
                date: "Dec 06, 2021 - 11:41",
                amount: "$369.60",
                color: "text-orange-500",
                avatar: "/3.jpg",
              },
              {
                name: "John Parker",
                date: "Dec 09, 2021 - 23:20",
                amount: "$231.00",
                color: "text-green-500",
                avatar: "/1.jpg",
              },
            ].map((item, idx) => (
              <li key={idx} className="flex justify-between items-center border-b border-gray-800 pb-">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${item.color}`}>
                  {item.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
