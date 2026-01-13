import React from "react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-green-50 px-10 py-8 ">
      {/* horizontal card sensor container */}
      <div className="flex items-center justify-between  gap-5">
        {/* card 1 */}
        <div className="flex justify-start gap-6 w-1/3 rounded-xl border p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          {/* icon + teks */}
          <div className="flex justify-start items-center">
            {/* icon */}
            <div className="inline-flex items-center justify-center bg-green-500 rounded-2xl border-green-400 p-3 text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            {/* teks */}
            <div className="ml-3">
              <h3 className="text-2xl text-green-600 font-semibold ">3/4</h3>
              <p className="text-sm text-black mt-1">Sensor Aktif</p>
            </div>
          </div>
        </div>

        {/* card 2*/}
        <div className="flex justify-start gap-6 w-1/3 rounded-xl border p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          {/* icon + teks */}
          <div className="flex justify-start items-center">
            {/* icon */}
            <div className="inline-flex items-center justify-center bg-blue-500 rounded-2xl border-blue-400 p-3 text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>

            {/* teks */}
            <div className="ml-3">
              <h3 className="text-2xl text-blue-600 font-semibold ">3/4</h3>
              <p className="text-sm text-black mt-1">CCTV Merekam</p>
            </div>
          </div>
        </div>

        {/* card 3*/}
        <div className="flex justify-start gap-6 w-1/3 rounded-xl border p-6 bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
          {/* icon + teks */}
          <div className="flex justify-start items-center">
            {/* icon */}
            <div className="inline-flex items-center justify-center bg-orange-500 rounded-2xl border-orange-400 p-3 text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            {/* teks */}
            <div className="ml-3">
              <h3 className="text-2xl text-orange-600 font-semibold ">1</h3>
              <p className="text-sm text-black mt-1">Alert Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* notifikasi */}
      <p className="text-black font-mono text-md mt-8 ">Notifikasi Terbaru</p>
      {/* horizontal card notifikasi terbaru */}
      <div className="flex items-center justify-between gap-5 mt-4">
        {/* card notifikasi  1*/}
        <div className="flex justify-start gap-6 w-1/3 rounded-xl border p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          {/* icon + teks */}
          <div className="flex justify-start items-center">
            {/* icon */}
            <div className="inline-flex items-center justify-center bg-white rounded-2xl border-white p-3 text-blue-600 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            {/* teks */}
            <div className="ml-3">
              <h3 className="text-sm text-blue-700 font-mono ">
                Gerakan terdeteksi di Zona B
              </h3>
              <p className="text-sm text-blue-500 mt-1 font-">2 jam lalu</p>
            </div>
          </div>
        </div>
        {/* card notifikasi  2*/}
        <div className="flex justify-start gap-6 w-1/3 rounded-xl border p-6 bg-yellow-100 border-yellow-200 border-2">
          {/* icon + teks */}
          <div className="flex justify-start items-center">
            {/* icon */}
            <div className="inline-flex items-center justify-center bg-white rounded-2xl border-white p-3 text-yellow-700 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            {/* teks */}
            <div className="ml-3">
              <h3 className="text-sm text-yellow-700 font-mono ">
                Camera 3 dalam mode standby
              </h3>
              <p className="text-sm text-yellow-700 mt-1 font-">5 jam lalu</p>
            </div>
          </div>
        </div>
        {/* card notifikasi  3*/}
        <div className="flex justify-start gap-6 w-1/3 rounded-xl border p-6 bg-red-100 border-red-200 border-2 text-red-700">
          {/* icon + teks */}
          <div className="flex justify-start items-center">
            {/* icon */}
            <div className="inline-flex items-center justify-center bg-white rounded-2xl border-white p-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            {/* teks */}
            <div className="ml-3">
              <h3 className="text-sm font-mono ">Sensor Zona A offline</h3>
              <p className="text-sm  mt-1 font-">10 jam lalu</p>
            </div>
          </div>
        </div>
      </div>
      {/* teks Sensor Gerak */}
      <p className="text-black font-mono text-md mt-8 ">Sensor Gerak</p>

      {/* horizontal card sensor gerak*/}
      <div className="grid grid-cols-2 gap-4 py-4">
        {/* card sensor gerak 1*/}
        <div className="bg-white rounded-2xl border border-green-200 p-4">
          {/* icon + teks */}
          <div className="flex justify-start">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sensor Zona A
                </h3>
                <p className="text-gray-500 text-sm">
                  Greenhouse A - Pintu Utama
                </p>

                {/* Badge */}
                <span className="inline-block mt-2 rounded-full bg-green-600 px-4 py-1 text-xs font-medium text-white leading-none">
                  Aktif
                </span>
              </div>
            </div>
          </div>

          <hr className="mt-10" />
          {/* teks space between */}
          <div className="flex justify-between mt-4 mb-2">
            <p className="text-black font-light text-sm ">
              Deteksi Terakhir :{" "}
            </p>
            <p className="text-black font-medium text-sm">Tidak ada</p>
          </div>
        </div>

        {/* card sensor gerak 2*/}
        <div className="bg-white rounded-2xl border border-green-200 p-4">
          {/* icon + teks */}
          <div className="flex justify-start">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sensor Zona A
                </h3>
                <p className="text-gray-500 text-sm">
                  Greenhouse A - Pintu Utama
                </p>

                {/* Badge */}
                <span className="inline-block mt-2 rounded-full bg-green-600 px-4 py-1 text-xs font-medium text-white leading-none">
                  Aktif
                </span>
              </div>
            </div>
          </div>

          <hr className="mt-10" />
          {/* teks space between */}
          <div className="flex justify-between mt-4 mb-2">
            <p className="text-black font-light text-sm ">
              Deteksi Terakhir :{" "}
            </p>
            <p className="text-black font-medium text-sm">Tidak ada</p>
          </div>
        </div>

        {/* card sensor gerak 3*/}
        <div className="bg-white rounded-2xl border border-green-200 p-4">
          {/* icon + teks */}
          <div className="flex justify-start">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sensor Zona A
                </h3>
                <p className="text-gray-500 text-sm">
                  Greenhouse A - Pintu Utama
                </p>

                {/* Badge */}
                <span className="inline-block mt-2 rounded-full bg-green-600 px-4 py-1 text-xs font-medium text-white leading-none">
                  Aktif
                </span>
              </div>
            </div>
          </div>

          <hr className="mt-10" />
          {/* teks space between */}
          <div className="flex justify-between mt-4 mb-2">
            <p className="text-black font-light text-sm ">
              Deteksi Terakhir :{" "}
            </p>
            <p className="text-black font-medium text-sm">Tidak ada</p>
          </div>
        </div>

        {/* card sensor gerak 4*/}
        <div className="bg-white rounded-2xl border border-green-200 p-4">
          {/* icon + teks */}
          <div className="flex justify-start">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sensor Zona A
                </h3>
                <p className="text-gray-500 text-sm">
                  Greenhouse A - Pintu Utama
                </p>

                {/* Badge */}
                <span className="inline-block mt-2 rounded-full bg-green-600 px-4 py-1 text-xs font-medium text-white leading-none">
                  Aktif
                </span>
              </div>
            </div>
          </div>

          <hr className="mt-10" />
          {/* teks space between */}
          <div className="flex justify-between mt-4 mb-2">
            <p className="text-black font-light text-sm ">
              Deteksi Terakhir :{" "}
            </p>
            <p className="text-black font-medium text-sm">Tidak ada</p>
          </div>
        </div>
      </div>

      {/* teks Sensor Gerak */}
      <p className="text-black font-mono text-md mt-8 ">CCTV Monitoring</p>

      {/* card cctv monitoring */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {/* card cctv 1*/}
        <div className="bg-white border-green-300 rounded-2xl shadow-xs overflow-hidden">
          {/* video  */}
          <div className="relative aspect-video px-3 py-3 bg-gradient-to-br from-gray-800 to-gray-900 ">
            {/* rec badge */}
            <div className="absolute flex items-center justify-center top-3 left-3 p-2 bg-red-500 rounded-lg shadow-md ">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2"></div>
              <span className="text-white text-sm font-medium">REC</span>
            </div>
            {/* video badge */}
            <div className="absolute inset-1 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            {/* resolusi video */}
            <div className="absolute bottom-3 right-3  flex items-center justify-center bg-black px-3 py-1 rounded-lg">
              <p className="text-sm font-semibold text-white">HD 1024</p>
            </div>
          </div>
          {/* teks info*/}
          <div className="bg-white p-3 mt-6 mb-2 ">
            <h2 className="text-black font-normal ">Camera 1</h2>
            <p className="text-gray-600 font-normal text-sm mt-2">
              Pintu Utama
            </p>
            {/* live view */}
            <div className="flex items-center justify-center bg-green-100 rounded-xl border border-green-300 px-2 py-2 mt-3 hover:bg-green-200 transition-all">
              {/* icon eyes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
                color="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {/* teks */}
              <p className="ml-2 text-sm font-medium text-black">Live View</p>
            </div>
          </div>
        </div>

        {/* card cctv 2*/}
        <div className="bg-white border-green-300 rounded-2xl shadow-xs overflow-hidden">
          {/* video  */}
          <div className="relative aspect-video px-3 py-3 bg-gradient-to-br from-gray-800 to-gray-900 ">
            {/* rec badge */}
            <div className="absolute flex items-center justify-center top-3 left-3 p-2 bg-red-500 rounded-lg shadow-md ">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2"></div>
              <span className="text-white text-sm font-medium">REC</span>
            </div>
            {/* video badge */}
            <div className="absolute inset-1 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            {/* resolusi video */}
            <div className="absolute bottom-3 right-3  flex items-center justify-center bg-black px-3 py-1 rounded-lg">
              <p className="text-sm font-semibold text-white">HD 1024</p>
            </div>
          </div>
          {/* teks info*/}
          <div className="bg-white p-3 mt-6 mb-2 ">
            <h2 className="text-black font-normal ">Camera 1</h2>
            <p className="text-gray-600 font-normal text-sm mt-2">
              Pintu Utama
            </p>
            {/* live view */}
            <div className="flex items-center justify-center bg-green-100 rounded-xl border border-green-300 px-2 py-2 mt-3 hover:bg-green-200 transition-all">
              {/* icon eyes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
                color="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {/* teks */}
              <p className="ml-2 text-sm font-medium text-black">Live View</p>
            </div>
          </div>
        </div>

         {/* card cctv 3*/}
        <div className="bg-white border-green-300 rounded-2xl shadow-xs overflow-hidden">
          {/* video  */}
          <div className="relative aspect-video px-3 py-3 bg-gradient-to-br from-gray-800 to-gray-900 ">
            {/* rec badge */}
            <div className="absolute flex items-center justify-center top-3 left-3 p-2 bg-red-500 rounded-lg shadow-md ">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2"></div>
              <span className="text-white text-sm font-medium">REC</span>
            </div>
            {/* video badge */}
            <div className="absolute inset-1 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            {/* resolusi video */}
            <div className="absolute bottom-3 right-3  flex items-center justify-center bg-black px-3 py-1 rounded-lg">
              <p className="text-sm font-semibold text-white">HD 1024</p>
            </div>
          </div>
          {/* teks info*/}
          <div className="bg-white p-3 mt-6 mb-2 ">
            <h2 className="text-black font-normal ">Camera 1</h2>
            <p className="text-gray-600 font-normal text-sm mt-2">
              Pintu Utama
            </p>
            {/* live view */}
            <div className="flex items-center justify-center bg-green-100 rounded-xl border border-green-300 px-2 py-2 mt-3 hover:bg-green-200 transition-all">
              {/* icon eyes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
                color="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {/* teks */}
              <p className="ml-2 text-sm font-medium text-black">Live View</p>
            </div>
          </div>
        </div>

         {/* card cctv 4*/}
        <div className="bg-white border-green-300 rounded-2xl shadow-xs overflow-hidden">
          {/* video  */}
          <div className="relative aspect-video px-3 py-3 bg-gradient-to-br from-gray-800 to-gray-900 ">
            {/* rec badge */}
            <div className="absolute flex items-center justify-center top-3 left-3 p-2 bg-red-500 rounded-lg shadow-md ">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2"></div>
              <span className="text-white text-sm font-medium">REC</span>
            </div>
            {/* video badge */}
            <div className="absolute inset-1 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            {/* resolusi video */}
            <div className="absolute bottom-3 right-3  flex items-center justify-center bg-black px-3 py-1 rounded-lg">
              <p className="text-sm font-semibold text-white">HD 1024</p>
            </div>
          </div>
          {/* teks info*/}
          <div className="bg-white p-3 mt-6 mb-2 ">
            <h2 className="text-black font-normal ">Camera 1</h2>
            <p className="text-gray-600 font-normal text-sm mt-2">
              Pintu Utama
            </p>
            {/* live view */}
            <div className="flex items-center justify-center bg-green-100 rounded-xl border border-green-300 px-2 py-2 mt-3 hover:bg-green-200 transition-all">
              {/* icon eyes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
                color="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {/* teks */}
              <p className="ml-2 text-sm font-medium text-black">Live View</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
