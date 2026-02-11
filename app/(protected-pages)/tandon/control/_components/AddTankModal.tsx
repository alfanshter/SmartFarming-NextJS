"use client";

import React, { useState, useEffect } from "react";
import { CreateTankDTO } from "@/core/domain/entities/Tank";
import { useDevices } from "@/shared/hooks/useDevices";

interface AddTankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTankDTO) => Promise<void>;
}

export default function AddTankModal({
  isOpen,
  onClose,
  onSubmit,
}: AddTankModalProps) {
  const { devices, refreshDevices } = useDevices();
  const [formData, setFormData] = useState<CreateTankDTO>({
    name: "",
    description: "",
    deviceId: "",
    sensorDeviceId: "",
    capacity: 1000,
    currentLevel: 75,
    autoFillEnabled: true,
    autoFillMinLevel: 60,
    autoFillMaxLevel: 90,
    manualFillMaxLevel: 89,
    agitatorEnabled: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      refreshDevices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only re-fetch when modal opens

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        name: "",
        description: "",
        deviceId: "",
        sensorDeviceId: "",
        capacity: 1000,
        currentLevel: 75,
        autoFillEnabled: true,
        autoFillMinLevel: 60,
        autoFillMaxLevel: 90,
        manualFillMaxLevel: 89,
        agitatorEnabled: true,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting tank:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 px-6 py-5 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
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
              <h2 className="text-2xl font-bold text-white">Tambah Tandon Baru</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-5 bg-green-500 rounded-full" />
              Informasi Dasar
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nama Tandon <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Contoh: Tandon Utama"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Tambahkan deskripsi tandon..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Device Controller <span className="text-red-500">*</span>
              </label>
              <select
                name="deviceId"
                value={formData.deviceId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white text-gray-900"
              >
                <option value="">Pilih Device Controller</option>
                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name} - {device.deviceId}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Device Sensor Level Air
              </label>
              <select
                name="sensorDeviceId"
                value={formData.sensorDeviceId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white text-gray-900"
              >
                <option value="">Pilih Device Sensor (Opsional)</option>
                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name} - {device.deviceId}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Sensor terpisah untuk monitoring level air tandon
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Kapasitas (Liter) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="100"
                  placeholder="1000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Level Saat Ini (%)
                </label>
                <input
                  type="number"
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="75"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Auto Fill Settings */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-500 rounded-full" />
              Pengaturan Pengisian Otomatis
            </h3>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">
                Aktifkan Pengisian Otomatis
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    autoFillEnabled: !prev.autoFillEnabled,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.autoFillEnabled ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.autoFillEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {formData.autoFillEnabled && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Level Min (%)
                  </label>
                  <input
                    type="number"
                    name="autoFillMinLevel"
                    value={formData.autoFillMinLevel}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Level Max (%)
                  </label>
                  <input
                    type="number"
                    name="autoFillMaxLevel"
                    value={formData.autoFillMaxLevel}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Manual Max (%)
                  </label>
                  <input
                    type="number"
                    name="manualFillMaxLevel"
                    value={formData.manualFillMaxLevel}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Agitator */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-5 bg-purple-500 rounded-full" />
              Pengaduk (Agitator)
            </h3>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">
                Aktifkan Pengaduk
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    agitatorEnabled: !prev.agitatorEnabled,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.agitatorEnabled ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.agitatorEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Menyimpan...
                </>
              ) : (
                <>
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
                  Tambah Tandon
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
