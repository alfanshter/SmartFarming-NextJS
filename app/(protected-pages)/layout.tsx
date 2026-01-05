import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { name: "Dashboard", icon: "M3 3h18v18H3V3z", href: "/dashboard" },
    {
      name: "Sensors",
      icon: "M12 4.354a4 4 0 1 0 0 7.292M12 4.354v7.292M12 11.646v7.292",
      href: "/sensors",
    },
    { name: "Irrigation", icon: "M5 13l4 4L19 7", href: "/irrigation" },
    { name: "Reports", icon: "M9 17v-6a2 2 0 0 1 2-2h6", href: "/reports" },
    {
      name: "Settings",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z",
      href: "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-40">
        {/* section atas sidebar */}
        <div className="h-50 bg-gradient-to-br from-green-400 to-green-700 px-6 py-8">
          {/* logo and title */}
          <div className="flex items-center mb-4">
            {/* Logo */}
            <div className="inline-flex items-center justify-center bg-white rounded-xl mb-4 shadow-lg w-10 h-10">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            {/* title */}
            <div className="mb-4 ml-3">
              <p className="text-white text-base font-medium ">
                Smart Irrigation
              </p>
              <p className="text-white text-sm font-light">Agro Gonta - Farm</p>
            </div>
          </div>
          {/* Layout Icon Profil and Text*/}
          <div className="flex rounded-xl bg-white/10 p-3 items-center">
            {/* icon profil */}
            <div className="inline-flex items-center justify-center bg-white rounded-full  shadow-lg w-10 h-10">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>

            <div className="ml-3">
              <p className="text-white text-sm">Alfan</p>
              <p className="text-white text-xs">Administrator</p>
            </div>
          </div>
        </div>

        {/* menu item */}
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* top bar dan main context */}
      <div className="lg:ml-64">
        {/* topbar */}
        <header className="h-30 bg-gradient-to-r from-green-400 to-green-800 top-0 z-30 shadow-md">
          <div className="h-full flex items-center justify-between px-10 py-2">
            {/* greeting and name */}
            <div>
              <p className="text-white font-medium text-lg mb-2">
                Selamat Datang
              </p>
              <p className="text-white font-semibold text-xl">Alfan</p>
            </div>

            {/* Sistem online and notif */}
            <div className="flex items-center justify-center">
              <div className="bg-white/30 rounded-xl px-4 py-2 mr-6 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p className="ml-2 text-white text-sm font-semibold">
                  Sistem Online
                </p>
                <p className="ml-5 text-white text-sm font-thin">20:99:12</p>
              </div>

              {/* icon notif */}
              <div className="inline-flex items-center justify-center rounded-full bg-white/30 shadow-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>
        {/* main content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
