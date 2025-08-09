"use client";
import { FiMessageSquare, FiMail, FiPhone } from "react-icons/fi";
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";

type Product = {
  id: string;
  name: string;
  sku?: string;
  category: string;
  brand: string;
  brandLogo?: string;
  price: string;
  stockStatus: "Available" | "Limited Supply" | "Not available";
  stockCount: string;
  views: string;
  viewsChange: string;
  viewsUp: boolean;
  image?: string;
};

const sampleProducts: Product[] = Array.from({ length: 36 }).map((_, i) => {
  const brands = [
    "microsoft",
    "google",
    "pinterest",
    "pf",
    "behance",
    "flickr",
  ];
  const sample = [
    {
      name: "Copier",
      sku: "1718635406",
      category: "Tablets",
      brand: "microsoft",
      brandLogo: "/micro.svg",
      price: "$107.45",
      stockStatus: "Available",
      stockCount: "8.04k",
      views: "1.23k",
      viewsChange: "+7.65%",
      viewsUp: true,
      image: "/copier.jpg",
    },
    {
      name: "Clock",
      sku: "6595752310",
      category: "Tablets",
      brand: "google",
      brandLogo: "google.svg",
      price: "$599.75",
      stockStatus: "Available",
      stockCount: "2.58k",
      views: "65.39k",
      viewsChange: "+2.82%",
      viewsUp: true,
      image: "be.svg",
    },
    {
      name: "Curling iron",
      sku: "5870577187",
      category: "Gaming consoles",
      brand: "pinterest",
      brandLogo: "/pinterest.svg",
      price: "$784.94",
      stockStatus: "Limited Supply",
      stockCount: "22",
      views: "10.7k",
      viewsChange: "-1.07%",
      viewsUp: false,
      image: "/iron.jpg",
    },
    {
      name: "Bulb",
      sku: "3711580971",
      category: "Smartphones",
      brand: "pf",
      brandLogo: "/pf.svg",
      price: "$878.12",
      stockStatus: "Not available",
      stockCount: "0",
      views: "89.15k",
      viewsChange: "+5.03%",
      viewsUp: true,
      image: "/bulb.jpg",
    },
  ];

  const base = sample[i % sample.length];
  return {
    id: base.sku + "-" + i,
    name: base.name,
    sku: base.sku,
    category: base.category,
    brand: base.brand,
    brandLogo: base.brandLogo,
    price: base.price,
    stockStatus: base.stockStatus as Product["stockStatus"],
    stockCount: base.stockCount,
    views: base.views,
    viewsChange: base.viewsChange,
    viewsUp: base.viewsUp,
    image: base.image,
  } as Product;
});

export default function ProductsTable({
  products = sampleProducts,
  initialPageSize = 10,
}: {
  products?: Product[];
  initialPageSize?: number;
}) {
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }, [products, query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageProducts = filtered.slice(start, end);

  function toggleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    const newSel: Record<string, boolean> = {};
    pageProducts.forEach((p) => (newSel[p.id] = checked));
    setSelected((prev) => ({ ...prev, ...newSel }));
  }
  function toggleSelectOne(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }
  function goto(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    setMenuOpen(null);
  }

  function exportCSV() {
    const rows = filtered.map((p) => ({
      name: p.name,
      sku: p.sku,
      category: p.category,
      brand: p.brand,
      price: p.price,
      stockStatus: p.stockStatus,
      stockCount: p.stockCount,
      views: p.views,
      viewsChange: p.viewsChange,
    }));
    const csv = [
      Object.keys(rows[0] || {}).join(","),
      ...rows.map((r) =>
        Object.values(r)
          .map((v) => `"${String(v).replace(/\"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products_export.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const headers = [
      ["Name", "SKU", "Category", "Brand", "Price", "Stock", "Views"],
    ];
    const body = filtered.map((p) => [
      p.name,
      p.sku,
      p.category,
      p.brand,
      p.price,
      `${p.stockStatus} (${p.stockCount})`,
      `${p.views} ${p.viewsChange}`,
    ]);
    // @ts-ignore
    doc.autoTable({ head: headers, body, startY: 40, theme: "striped" });
    doc.save("products_export.pdf");
  }

  return (
    <div className="w-full flex gap-6">
      {/* main table */}
      <div className="flex-1 bg-[#0f1113] rounded-xl shadow-lg overflow-hidden">
        {/* header top: title, search, header menu */}
        <div className="px-6 py-4 border-b border-[#232428] flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-200">
            Products Table
          </h3>

          <div className="flex items-center gap-3">
            {/* search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search..."
                className="pl-10 pr-3 py-2 rounded-md bg-[#131417] text-gray-200 w-56 placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setHeaderMenuOpen((s) => !s)}
                className="p-2 rounded hover:bg-[#1a1b1f]"
              >
                <FiMoreVertical className="text-gray-300" />
              </button>
              {headerMenuOpen && (
                <div className="absolute right-0 top-10 w-44 bg-[#111217] border border-[#2a2c33] rounded-md shadow-lg z-40">
                  <button
                    onClick={() => {
                      exportCSV();
                      setHeaderMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[#15161a] text-gray-200"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => {
                      exportPDF();
                      setHeaderMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[#15161a] text-gray-200"
                  >
                    Export PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-[#15161a] text-gray-200">
                    Save as view
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full table-auto divide-y divide-[#1b1c1f]">
            <thead className="bg-[#0f1315] text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 w-12">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    className="h-4 w-4 accent-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left">NAME</th>
                <th className="px-6 py-3 text-left">CATEGORY</th>
                <th className="px-6 py-3 text-left">BRAND</th>
                <th className="px-6 py-3 text-left">PRICE</th>
                <th className="px-6 py-3 text-left">STOCK</th>
                <th className="px-6 py-3 text-left">VIEWS</th>
                <th className="px-6 py-3 w-12"></th>
              </tr>
            </thead>

            <tbody>
              {pageProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#0b0d0f] transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={!!selected[p.id]}
                      onChange={() => toggleSelectOne(p.id)}
                      className="h-4 w-4 accent-blue-500"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-[#0b0d0f] flex items-center justify-center">
                        <Image
                          src={p.image || "/images/placeholder.jpg"}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-100">
                          {p.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {p.sku}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-300">{p.category}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 overflow-hidden rounded-sm">
                        <Image
                          src={p.brandLogo || "/brands/placeholder.svg"}
                          alt={p.brand}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-gray-300 text-sm">{p.brand}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-300">{p.price}</td>

                  <td className="px-6 py-4">
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          p.stockStatus === "Available"
                            ? "text-green-400 bg-green-400/8"
                            : p.stockStatus === "Limited Supply"
                            ? "text-yellow-400 bg-yellow-400/8"
                            : "text-rose-400 bg-rose-400/8"
                        }`}
                      >
                        {p.stockStatus}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {p.stockCount} stock
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-100">{p.views}</div>
                      <div
                        className={`text-xs ${
                          p.viewsUp ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {p.viewsUp ? "▲" : "▼"} {p.viewsChange}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 relative text-right">
                    <button
                      className="p-2 rounded hover:bg-[#1a1b1f]"
                      onClick={() =>
                        setMenuOpen((m) => (m === p.id ? null : p.id))
                      }
                    >
                      <FiMoreVertical className="text-gray-300" />
                    </button>

                    {menuOpen === p.id && (
                      <div className="absolute right-6 top-12 w-44 bg-[#111217] border border-[#2a2c33] rounded-md shadow-lg z-40">
                        <button className="w-full text-left px-4 py-2 hover:bg-[#15161a] flex items-center gap-2 text-gray-200">
                          <FiEye /> View
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-[#15161a] flex items-center gap-2 text-gray-200">
                          <FiEdit2 /> Edit
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-[#15161a] flex items-center gap-2 text-rose-400">
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-[#232428] flex items-center justify-between">
          <div className="text-sm text-gray-400">
            {start + 1} - {end} of {total} entries
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goto(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-md bg-[#0b0d0f] hover:bg-[#121315] disabled:opacity-50"
            >
              <FiChevronLeft className="text-gray-200" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 4), Math.min(totalPages, page + 3))
                .map((pNum) => (
                  <button
                    key={pNum}
                    onClick={() => goto(pNum)}
                    className={`px-3 py-2 rounded-md ${
                      pNum === page
                        ? "bg-blue-600 text-white"
                        : "bg-[#0b0d0f] text-gray-200 hover:bg-[#121315]"
                    }`}
                  >
                    {pNum}
                  </button>
                ))}
            </div>

            <button
              onClick={() => goto(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-md bg-[#0b0d0f] hover:bg-[#121315] disabled:opacity-50"
            >
              <FiChevronRight className="text-gray-200" />
            </button>
          </div>
        </div>
      </div>

      <aside className="w-80 hidden xl:block space-y-4">
        <div className="bg-[#3e75dd] text-white rounded-xl p-6 shadow">
          <div className="h-28 w-full relative">
            <svg
              className="absolute -top-4 right-6"
              width="120"
              height="80"
              viewBox="0 0 120 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 60 C 30 10, 90 10, 120 60"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="mt-6">
            <div className="text-sm opacity-90">Current Balance</div>
            <div className="text-3xl font-bold mt-2">$31.313</div>
            <button className="mt-4 w-full bg-[#3e7ff8] text-[#f8f8f9] rounded-md py-2">
              Get Statement
            </button>
          </div>
        </div>

        <div className="bg-[#1A1B29] rounded-xl p-5 shadow h-[350px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-400">Top Sellers</div>
            <div className="text-gray-400">•••</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400 ]">
              <Image
                src="/fuller.jpg"
                width={56}
                height={56}
                alt="seller"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-white font-semibold">Travis Fuller</div>
              <div className="text-xs text-gray-400">Salesman</div>
            </div>
          </div>

          <div className="bg-[#0b0d0f] rounded-xl p-4 mt-4">
            <div className="text-sm text-gray-400">Sales</div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="text-2xl font-bold text-white">2 348</div>
                <div className="text-xs text-emerald-400 mt-1">▲ 4.30%</div>
              </div>
              <div className="w-24 h-12">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <path
                    d="M0,30 C20,10 40,10 60,25 80,40 100,26"
                    stroke="#6366F1"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex relative top-10 left-20 gap-4 space-x-3 text-gray-400">
            <FiMessageSquare className="cursor-pointer text-blue-400 hover:text-white" />
            <FiMail className="cursor-pointer text-blue-400 hover:text-white" />
            <FiPhone className="cursor-pointer text-blue-400 hover:text-white" />
          </div>
        </div>
      </aside>
    </div>
  );
}
