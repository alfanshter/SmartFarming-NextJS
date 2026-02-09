"use client";

import { useState, useEffect } from "react";
import { useZones } from "@/shared/hooks/useZones";

interface TimeSlot {
  id: string;
  startTime: string;
  durationMinutes: number;
  durationSeconds: number;
}

interface NewSchedule {
  zoneName: string;
  zoneId: string;
  isActive: boolean;
  timeSlots: TimeSlot[];
  activeDays: string[];
}

interface Schedule extends NewSchedule {
  id: string;
}

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (schedule: NewSchedule) => void;
  editData?: Schedule | null;
  isEditMode?: boolean;
}

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function AddScheduleModal({
  isOpen,
  onClose,
  onAdd,
  editData,
  isEditMode = false,
}: AddScheduleModalProps) {
  const { zones, fetchZones } = useZones();
  
  // Initialize state with edit data if in edit mode
  const getInitialZoneId = () => (isEditMode && editData ? editData.zoneId : "");
  const getInitialTimeSlots = () =>
    isEditMode && editData
      ? editData.timeSlots
      : [{ id: "1", startTime: "06:00", durationMinutes: 0, durationSeconds: 0 }];
  const getInitialActiveDays = () => (isEditMode && editData ? editData.activeDays : []);

  const [selectedZoneId, setSelectedZoneId] = useState(getInitialZoneId());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(getInitialTimeSlots());
  const [activeDays, setActiveDays] = useState<string[]>(getInitialActiveDays());

  // Fetch zones on mount
  useEffect(() => {
    if (isOpen) {
      fetchZones();
      
      // Reset or load data when modal opens
      if (isEditMode && editData) {
        setSelectedZoneId(editData.zoneId);
        setTimeSlots(editData.timeSlots);
        setActiveDays(editData.activeDays);
      } else if (!isEditMode) {
        setSelectedZoneId("");
        setTimeSlots([
          {
            id: "1",
            startTime: "06:00",
            durationMinutes: 0,
            durationSeconds: 0,
          },
        ]);
        setActiveDays([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleDayToggle = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAddTimeSlot = () => {
    setTimeSlots((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        startTime: "06:00",
        durationMinutes: 0,
        durationSeconds: 0,
      },
    ]);
  };

  const handleRemoveTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
    }
  };

  const handleTimeSlotChange = (
    id: string,
    field: keyof TimeSlot,
    value: string | number
  ) => {
    setTimeSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedZone = zones.find((z) => z.id === selectedZoneId);
    if (!selectedZone) return;

    // Validate at least one time slot has duration
    const hasValidSlot = timeSlots.some(
      (slot) => slot.durationMinutes > 0 || slot.durationSeconds > 0
    );
    if (!hasValidSlot) {
      alert("Minimal 1 waktu harus punya durasi!");
      return;
    }

    onAdd({
      zoneName: selectedZone.name,
      zoneId: selectedZoneId,
      isActive: true,
      timeSlots,
      activeDays,
    });

    // Reset form
    setSelectedZoneId("");
    setTimeSlots([
      {
        id: "1",
        startTime: "06:00",
        durationMinutes: 0,
        durationSeconds: 0,
      },
    ]);
    setActiveDays([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Transparent Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-slideUp">
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
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? "Edit Jadwal" : "Tambah Jadwal Baru"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isEditMode
                    ? "Ubah jadwal penyiraman otomatis"
                    : "Buat jadwal dengan beberapa waktu penyiraman"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
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
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Zona Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Pilih Zona
            </label>
            <div className="relative">
              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                disabled={isEditMode}
                className={`w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none text-gray-700 font-medium ${
                  isEditMode ? "opacity-60 cursor-not-allowed" : ""
                }`}
                required
              >
                <option value="">-- Pilih Zona --</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
              {/* Dropdown Arrow */}
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Waktu Penyiraman ({timeSlots.length})
              </label>
              <button
                type="button"
                onClick={handleAddTimeSlot}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Tambah Waktu
              </button>
            </div>

            {/* Time Slots List */}
            <div className="space-y-4">
              {timeSlots.map((slot, index) => (
                <div
                  key={slot.id}
                  className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl space-y-4"
                >
                  {/* Header with Remove Button */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      Waktu #{index + 1}
                    </span>
                    {timeSlots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTimeSlot(slot.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1"
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
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Jam Mulai
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          handleTimeSlotChange(
                            slot.id,
                            "startTime",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700 font-medium"
                        required
                      />
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Durasi
                    </label>
                    <div className="flex gap-3">
                      {/* Menit */}
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          value={slot.durationMinutes || ""}
                          onChange={(e) =>
                            handleTimeSlotChange(
                              slot.id,
                              "durationMinutes",
                              Number(e.target.value)
                            )
                          }
                          placeholder="0"
                          min="0"
                          max="60"
                          className="w-full text-center text-black font-semibold text-lg bg-white border-2 border-gray-200 rounded-lg py-3 pr-14 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition-all"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm pointer-events-none">
                          menit
                        </span>
                      </div>

                      {/* Detik */}
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          value={slot.durationSeconds || ""}
                          onChange={(e) =>
                            handleTimeSlotChange(
                              slot.id,
                              "durationSeconds",
                              Number(e.target.value)
                            )
                          }
                          placeholder="0"
                          min="0"
                          max="59"
                          className="w-full text-center text-black font-semibold text-lg bg-white border-2 border-gray-200 rounded-lg py-3 pr-14 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition-all"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm pointer-events-none">
                          detik
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Days */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Hari Aktif
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    activeDays.includes(day)
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            {activeDays.length === 0 && (
              <p className="text-sm text-red-600 mt-2">
                Pilih minimal 1 hari aktif
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={activeDays.length === 0}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg shadow-green-200 disabled:shadow-none"
            >
              {isEditMode ? "Simpan Perubahan" : "Tambah Jadwal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
