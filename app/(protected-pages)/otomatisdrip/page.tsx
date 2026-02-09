"use client";

import React, { useState } from "react";
import ScheduleCard from "./_components/ScheduleCard";
import AddScheduleModal from "./_components/AddScheduleModal";
import DeleteConfirmModal from "./_components/DeleteConfirmModal";

interface TimeSlot {
  id: string;
  startTime: string;
  durationMinutes: number;
  durationSeconds: number;
}

interface Schedule {
  id: string;
  zoneName: string;
  zoneId: string;
  isActive: boolean;
  timeSlots: TimeSlot[];
  activeDays: string[];
}

// Mock data - nanti akan diambil dari API
const mockSchedules: Schedule[] = [
  {
    id: "1",
    zoneName: "Zona A",
    zoneId: "a0000000-0000-0000-0000-000000000001",
    isActive: true,
    timeSlots: [
      {
        id: "t1",
        startTime: "07:00",
        durationMinutes: 4,
        durationSeconds: 0,
      },
      {
        id: "t2",
        startTime: "12:00",
        durationMinutes: 3,
        durationSeconds: 30,
      },
      {
        id: "t3",
        startTime: "17:00",
        durationMinutes: 5,
        durationSeconds: 0,
      },
    ],
    activeDays: ["Sen", "Rab", "Jum"],
  },
  {
    id: "2",
    zoneName: "Zona B",
    zoneId: "a0000000-0000-0000-0000-000000000002",
    isActive: true,
    timeSlots: [
      {
        id: "t4",
        startTime: "08:00",
        durationMinutes: 4,
        durationSeconds: 0,
      },
    ],
    activeDays: ["Sen", "Rab", "Jum", "Sab"],
  },
  {
    id: "3",
    zoneName: "Zona C",
    zoneId: "a0000000-0000-0000-0000-000000000003",
    isActive: false,
    timeSlots: [
      {
        id: "t5",
        startTime: "17:00",
        durationMinutes: 10,
        durationSeconds: 0,
      },
    ],
    activeDays: ["Sel", "Kam", "Sab"],
  },
];

export default function OtomatisDripPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [deletingSchedule, setDeletingSchedule] = useState<Schedule | null>(null);

  const activeSchedules = schedules.filter((s) => s.isActive);

  const handleToggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id
          ? { ...schedule, isActive: !schedule.isActive }
          : schedule
      )
    );
  };

  const handleEditSchedule = (id: string) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule) {
      setEditingSchedule(schedule);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateSchedule = (updatedData: Omit<Schedule, "id">) => {
    if (editingSchedule) {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editingSchedule.id
            ? { ...schedule, ...updatedData }
            : schedule
        )
      );
      setIsEditModalOpen(false);
      setEditingSchedule(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule) {
      setDeletingSchedule(schedule);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingSchedule) {
      setSchedules((prev) => prev.filter((schedule) => schedule.id !== deletingSchedule.id));
      setDeletingSchedule(null);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-10">
      {/* Header + Button Tambah */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Penjadwalan Otomatis Drip
          </h1>
          <p className="text-gray-600 mt-1">
            Atur jadwal penyiraman otomatis untuk setiap zona
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Jadwal Baru
        </button>
      </div>

      {/* Active Schedules Count */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Jadwal Aktif ({activeSchedules.length})
        </h2>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onToggle={() => handleToggleSchedule(schedule.id)}
            onEdit={() => handleEditSchedule(schedule.id)}
            onDelete={() => handleDeleteClick(schedule.id)}
          />
        ))}
      </div>

      {/* Add Schedule Modal */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newSchedule: Omit<Schedule, "id">) => {
          setSchedules((prev) => [...prev, { ...newSchedule, id: Date.now().toString() }]);
          setIsAddModalOpen(false);
        }}
      />

      {/* Edit Schedule Modal */}
      <AddScheduleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSchedule(null);
        }}
        onAdd={handleUpdateSchedule}
        editData={editingSchedule}
        isEditMode={true}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingSchedule(null);
        }}
        onConfirm={handleConfirmDelete}
        scheduleName={deletingSchedule?.zoneName || ""}
      />
    </div>
  );
}
