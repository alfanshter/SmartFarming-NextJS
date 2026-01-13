import React from "react";

export default function PenyiramanManualPage() {
  return (
    <div className="min-h-screen bg-green-50 p-10 y-6">
      {/* tombol penyiraman manual */}
      <div className="flex justify-start gap-4">
        {/* tombol aktifkan semua */}
        <button className="flex items-center justify-cente bg-green-500 px-15 py-3 rounded-xl w-1/4 hover:bg-green-600 transition-all">
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
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          <span className="text-white font-medium text-sm ml-4">
            Aktifkan Semua
          </span>
        </button>

        {/* tombol stop semua */}
        <button className="flex items-center justify-cente bg-white border border-green-300 px-15 py-3 rounded-xl w-1/4 hover:bg-green-300 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            color="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
            />
          </svg>

          <span className="text-black font-medium text-sm ml-4">
            Aktifkan Semua
          </span>
        </button>
      </div>
    </div>
  );
}
