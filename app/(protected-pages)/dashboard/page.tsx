import React from "react";

export default function DashboarsPage() {
  const progressPompa = 49;
  const progressKebun = 60;
  const progressFlushing = 89;
  const progressKebun2 = 0;
  return (
    <div className="min-h-screen bg-green-50">
      {/* bikin card horizontal */}
      <div className="flex justify-between gap-5 px-6 py-7">
        {/* bikin card kotak  1*/}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 rounded-b-lg  p-6 w-1/3">
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
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-orange-200 rounded-b-lg  p-6 w-1/3">
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
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
            </div>

            {/* badge status */}
            <span className="rounded-full bg-blue-300 px-3 py-1 text-sm font-medium text-blue-700 leading-none">
              Normal
            </span>
          </div>

          {/* suhu greenhose text */}
          <p className="text-lg text-gray-600 font-medium mt-10">EC Level</p>
          <p className="text-2xl text-gray-600 font-semibold mt-5">
            {" "}
            1.2 mS/cm
          </p>
          <p className="text-sm text-gray-600 font-medium mt-5 mb-4">
            Optimal untuk melon
          </p>
        </div>
        {/* bikin card kotak  3 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-200 border-orange-200 rounded-b-lg  p-6 w-1/3">
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
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
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
            Konektivitas
          </p>
          <p className="text-2xl text-gray-600 font-semibold mt-5">Online</p>
          <p className="text-sm text-gray-600 font-medium mt-5 mb-4">
            Semua sensor terhubung
          </p>
        </div>
      </div>

      {/* bikin header */}
      <div className="text-black font-mono text-lg px-6 py-5">
        <p>Kontroller Aktif</p>

        {/* bikin card grid 2 kolom 2 baris */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* bikin card kotak  1 */}
          <div className="bg-white px-5 py-4 border-green-400 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                {/* icon */}
                <div className="inline-flex items-center justify-center rounded-lg bg-green-200 p-3">
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
                </div>

                {/* teks vertikal */}
                <div>
                  <p className="text-lg font-medium text-gray-600">
                    Pompa Utama
                  </p>
                  <p className="text-sm font-medium text-gray-400 mt-1">
                    Aktif
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {`${progressPompa}%`}
              </span>
            </div>
            {/* progress bar */}
            <div className="w-full mt-10">
              <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progressPompa}%` }}
                ></div>
              </div>
            </div>
          </div>
          {/* bikin card kotak  2 */}
          <div className="bg-white px-5 py-4 border-green-400 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                {/* icon */}
                <div className="inline-flex items-center justify-center rounded-lg bg-green-200 p-3">
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
                </div>

                {/* teks vertikal */}
                <div>
                  <p className="text-lg font-medium text-gray-600">
                    Siram Kebun
                  </p>
                  <p className="text-sm font-medium text-gray-400 mt-1">
                    Aktif
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {`${progressKebun}%`}
              </span>
            </div>
            {/* progress bar */}
            <div className="w-full mt-10">
              <div className="h-3 w-full rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progressKebun}%` }}
                ></div>
              </div>
            </div>
          </div>
          {/* bikin card kotak 3 */}
          <div className="bg-white px-5 py-4 border-green-400 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                {/* icon */}
                <div className="inline-flex items-center justify-center rounded-lg bg-green-200 p-3">
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
                </div>

                {/* teks vertikal */}
                <div>
                  <p className="text-lg font-medium text-gray-600">Flushing</p>
                  <p className="text-sm font-medium text-gray-400 mt-1">
                    Aktif
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {`${progressFlushing}%`}
              </span>
            </div>
            {/* progress bar */}
            <div className="w-full mt-10">
              <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progressFlushing}%` }}
                ></div>
              </div>
            </div>
          </div>
          {/* bikin card kotak 4 */}
          <div className="bg-white px-5 py-4 border-gray-400 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                {/* icon */}
                <div className="inline-flex items-center justify-center rounded-lg bg-gray-200 p-3">
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
                </div>

                {/* teks vertikal */}
                <div>
                  <p className="text-lg font-medium text-gray-600">Siram Kebun 2</p>
                  <p className="text-sm font-medium text-gray-400 mt-1">
                    Tidak Aktif
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {/* teks progress kebun */}
                {`${progressKebun2}%`}
              </span>
            </div>
            {/* progress bar */}
            <div className="w-full mt-10">
              <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-fulltransition-all duration-500"
                  style={{ width: `${progressKebun2}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
