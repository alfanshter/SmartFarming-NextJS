"use client";

import React, { useState } from "react";
import BarcodeScannerModal from "./BarcodeScannerModal";

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDevice: (device: {
    name: string;
    type: "CONTROLLER" | "SENSOR" | "ACTUATOR";
    mqttTopic: string;
  }) => void;
}

export default function AddDeviceModal({
  isOpen,
  onClose,
  onAddDevice,
}: AddDeviceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "CONTROLLER" as "CONTROLLER" | "SENSOR" | "ACTUATOR",
    mqttTopic: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    type: "",
    mqttTopic: "",
  });

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Fungsi untuk handle hasil scan barcode
  const handleScanSuccess = (decodedText: string) => {
    setFormData(prev => ({
      ...prev,
      mqttTopic: decodedText
    }));
    setIsScannerOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    const newErrors = {
      name: formData.name ? "" : "Nama device harus diisi",
      type: formData.type ? "" : "Tipe device harus dipilih",
      mqttTopic: formData.mqttTopic ? "" : "Device ID / Barcode harus diisi",
    };

    setErrors(newErrors);

    // Jika ada error, jangan submit
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    // Submit data ke API
    onAddDevice({
      name: formData.name,
      type: formData.type,
      mqttTopic: formData.mqttTopic,
    });

    // Reset form
    setFormData({
      name: "",
      type: "CONTROLLER",
      mqttTopic: "",
    });
    setErrors({
      name: "",
      type: "",
      mqttTopic: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error saat user mulai mengetik
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Modern Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      {/* Modal Container with Animation */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-slideUp">
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-green-400 via-green-500 to-green-600 opacity-10"></div>
        
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Badge */}
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-2xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Tambah Device Baru
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Daftarkan ESP32 atau IoT device Anda
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all duration-200 hover:rotate-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-5">
            {/* Nama Device */}
            <div className="group">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  />
                </svg>
                Nama Device
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: GH1 Controller"
                className={`w-full px-4 py-3 border-2 rounded-xl text-black focus:outline-none transition-all duration-200 ${
                  errors.name
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-white"
                    : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:shadow-lg focus:shadow-green-100"
                }`}
              />
              {errors.name && (
                <div className="flex items-center gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="text-sm text-red-600">{errors.name}</p>
                </div>
              )}
            </div>

            {/* Device Type */}
            <div className="group">
              <label
                htmlFor="type"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                  />
                </svg>
                Tipe Device
              </label>
              <div className="relative">
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-black focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
                    errors.type
                      ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-white"
                      : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:shadow-lg focus:shadow-green-100"
                  }`}
                >
                  <option value="CONTROLLER">🎮 Controller - Pengendali Utama</option>
                  <option value="SENSOR">📡 Sensor - Pembaca Data</option>
                  <option value="ACTUATOR">⚙️ Actuator - Perangkat Aksi</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              {errors.type && (
                <div className="flex items-center gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="text-sm text-red-600">{errors.type}</p>
                </div>
              )}
            </div>

            {/* MQTT Topic / Barcode ID */}
            <div className="group">
              <label
                htmlFor="mqttTopic"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                  />
                </svg>
                Device ID / Barcode
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="mqttTopic"
                  name="mqttTopic"
                  value={formData.mqttTopic}
                  onChange={handleChange}
                  placeholder="Scan barcode atau masukkan ID, contoh: device1"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-black font-mono focus:outline-none transition-all duration-200 ${
                    errors.mqttTopic
                      ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-white"
                      : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:shadow-lg focus:shadow-green-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setIsScannerOpen(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all text-green-600 hover:text-green-700 hover:bg-green-50 hover:scale-110"
                  title="Scan Barcode"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 ml-1">
                💡 Backend akan mengubah menjadi: <span className="font-mono text-green-600">Smartfarming/{formData.mqttTopic || 'deviceID'}/command</span>
              </p>
              {errors.mqttTopic && (
                <div className="flex items-center gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="text-sm text-red-600">{errors.mqttTopic}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Tambah Device
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}
