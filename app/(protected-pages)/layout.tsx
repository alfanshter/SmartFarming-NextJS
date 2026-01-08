import Link from "next/link";
import { title } from "process";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      title: "Monitoring",
      children: [
        {
          name: "Dashboard",
          icon: (
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          ),
          href: "/dashboard",
        },
        {
          name: "Sistem Keamanan",
          icon: (
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
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          ),
          href: "/security",
        },
      ],
    },

    {
      title: "Penyiraman",
      children: [
        {
          name: "Manual Drip",
          icon: (
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
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
          ),
          href: "/sensors",
        },
        {
          name: "Otomatis Drip",
          icon: (
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ),
          href: "/irrigation",
        },
        {
          name: "Sirap",
          icon: (
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
                d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
              />
            </svg>
          ),
          href: "/irrigation",
        },
      ],
    },

    {
      title: "Sistem Tandon",
      children: [
        {
          name: "Kontrol Tandon",
          href: "/tandon/control",
          icon: (
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
                d="M5.25 7.5h13.5v9H5.25z"
              />
            </svg>
          ),
        },
        {
          name: "Peracikan Pupuk",
          href: "/tandon/mixing",
          icon: (
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
                d="M9 3h6v4l3 5v9H6v-9l3-5V3z"
              />
            </svg>
          ),
        },
      ],
    },

    {
      title: "Maintenance",
      children: [
        {
          name: "Flushing System",
          href: "/maintenance/flushing",
          icon: (
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
                d="M4.5 12a7.5 7.5 0 0 1 12.75-5.303M19.5 12a7.5 7.5 0 0 1-12.75 5.303"
              />
            </svg>
          ),
        },
      ],
    },

    {
      title: "Pengaturan",
      children: [
        {
          name: "Profil Saya",
          href: "/profile",
          icon: (
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-40 flex flex-col">
        {/* section atas sidebar */}
        <div className="flex-1 overflow-y-auto">
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
                <p className="text-white text-sm font-light">
                  Agro Gonta - Farm
                </p>
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
          <ul className="space-y-2 py-3 px-4">
            {menuItems.map((section) => (
              // section title
              <div className="space-y-4" key={section.title}>
                <p className="text-gray-500 font-sans">{section.title}</p>

                <div className="space-y-3 mb-4">
                  {/* menu items */}
                  {section.children.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100">
                          <span className="flex items-center text-black">
                            {item.icon}
                          </span>
                          <span className="leading-none text-black text-sm">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </div>
              </div>

              // menu items
            ))}
          </ul>
        </div>
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
        <main>{children}</main>
      </div>
    </div>
  );
}
