import React from "react";

export default function DashboarsPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="flex justify-between gap-5 px-6 py-7">
        {/* bikin card kotak  1*/}
        <div className="bg-gradient-to-br from-amber-50 to-amber-200 border-orange-200 rounded-b-lg  p-6 w-1/3">
          {/* icon + text */}
          <div className="flex items-start justify-between">
            {/* icon */}
            <div className="inline-flex items-center justify-center p-2 bg-orange-500 rounded-lg shadow-lg">
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
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </div>

            {/* badge status */}
            <span className="rounded-full bg-orange-200 px-3 py-0.5 text-sm font-medium text-orange-700 leading-none">
              Normal
            </span>
          </div>

          {/* suhu greenhose text */}
          <p className="text-lg text-gray-600 font-medium mt-10">
            Suhu Greenhouse
          </p>
          <p className="text-2xl text-gray-600 font-semibold mt-5">28.5°C</p>
          <p className="text-sm text-gray-600 font-medium mt-5 mb-4">
            Optimal untuk melon
          </p>
        </div>
        {/* bikin card kotak  2 */}
         <div className="bg-gradient-to-br from-amber-50 to-amber-200 border-orange-200 rounded-b-lg  p-6 w-1/3">
          {/* icon + text */}
          <div className="flex items-start justify-between">
            {/* icon */}
            <div className="inline-flex items-center justify-center p-2 bg-orange-500 rounded-lg shadow-lg">
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
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </div>

            {/* badge status */}
            <span className="rounded-full bg-orange-200 px-3 py-0.5 text-sm font-medium text-orange-700 leading-none">
              Normal
            </span>
          </div>

          {/* suhu greenhose text */}
          <p className="text-lg text-gray-600 font-medium mt-10">
            Suhu Greenhouse
          </p>
          <p className="text-2xl text-gray-600 font-semibold mt-5">28.5°C</p>
          <p className="text-sm text-gray-600 font-medium mt-5 mb-4">
            Optimal untuk melon
          </p>
        </div>
        {/* bikin card kotak  3 */}
         <div className="bg-gradient-to-br from-amber-50 to-amber-200 border-orange-200 rounded-b-lg  p-6 w-1/3">
          {/* icon + text */}
          <div className="flex items-start justify-between">
            {/* icon */}
            <div className="inline-flex items-center justify-center p-2 bg-orange-500 rounded-lg shadow-lg">
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
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </div>

            {/* badge status */}
            <span className="rounded-full bg-orange-200 px-3 py-0.5 text-sm font-medium text-orange-700 leading-none">
              Normal
            </span>
          </div>

          {/* suhu greenhose text */}
          <p className="text-lg text-gray-600 font-medium mt-10">
            Suhu Greenhouse
          </p>
          <p className="text-2xl text-gray-600 font-semibold mt-5">28.5°C</p>
          <p className="text-sm text-gray-600 font-medium mt-5 mb-4">
            Optimal untuk melon
          </p>
        </div>
      </div>
    </div>
  );
}
