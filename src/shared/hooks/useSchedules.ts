"use client";

import { useState, useCallback } from "react";
import {
  Schedule,
  CreateScheduleDTO,
  UpdateScheduleDTO,
} from "@/core/domain/entities/Schedule";
import { ScheduleRepository } from "@/core/infrastructure/api/repositories/ScheduleRepository";
import { GetAllSchedules } from "@/core/application/use-cases/schedules/GetAllSchedules";
import { CreateSchedule } from "@/core/application/use-cases/schedules/CreateSchedule";
import { UpdateSchedule } from "@/core/application/use-cases/schedules/UpdateSchedule";
import { DeleteSchedule } from "@/core/application/use-cases/schedules/DeleteSchedule";
import { ToggleSchedule } from "@/core/application/use-cases/schedules/ToggleSchedule";

// Day name mapping: Indonesian (UI) <-> English (Backend)
const DAY_MAPPING: Record<string, string> = {
  Sen: "monday",
  Sel: "tuesday",
  Rab: "wednesday",
  Kam: "thursday",
  Jum: "friday",
  Sab: "saturday",
  Min: "sunday",
};

const REVERSE_DAY_MAPPING: Record<string, string> = {
  monday: "Sen",
  tuesday: "Sel",
  wednesday: "Rab",
  thursday: "Kam",
  friday: "Jum",
  saturday: "Sab",
  sunday: "Min",
};

// Repository instance
const scheduleRepository = new ScheduleRepository();

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert backend days to UI format
  const convertDaysToUI = (backendDays: string[]): string[] => {
    return backendDays.map((day) => REVERSE_DAY_MAPPING[day] || day);
  };

  // Convert UI days to backend format
  const convertDaysToBackend = (uiDays: string[]): string[] => {
    return uiDays.map((day) => DAY_MAPPING[day] || day);
  };

  // Fetch all schedules
  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new GetAllSchedules(scheduleRepository);
      const data = await useCase.execute();

      // Convert backend days to UI format
      const schedulesWithUIFormat = data.map((schedule) => ({
        ...schedule,
        activeDays: convertDaysToUI(schedule.activeDays),
      }));

      setSchedules(schedulesWithUIFormat);
      console.log("✅ [useSchedules] Schedules loaded:", schedulesWithUIFormat);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch schedules";
      setError(errorMessage);
      console.error("❌ [useSchedules] Error fetching schedules:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new schedule
  const createSchedule = useCallback(async (data: Omit<CreateScheduleDTO, "activeDays"> & { activeDays: string[] }) => {
    setLoading(true);
    setError(null);
    try {
      // Convert UI days to backend format
      const backendData: CreateScheduleDTO = {
        ...data,
        activeDays: convertDaysToBackend(data.activeDays),
      };

      const useCase = new CreateSchedule(scheduleRepository);
      const newSchedule = await useCase.execute(backendData);

      // Convert days back to UI format
      const scheduleWithUIFormat = {
        ...newSchedule,
        activeDays: convertDaysToUI(newSchedule.activeDays),
      };

      setSchedules((prev) => [...prev, scheduleWithUIFormat]);
      console.log("✅ [useSchedules] Schedule created:", scheduleWithUIFormat);
      return scheduleWithUIFormat;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create schedule";
      setError(errorMessage);
      console.error("❌ [useSchedules] Error creating schedule:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update schedule
  const updateSchedule = useCallback(async (id: string, data: Omit<UpdateScheduleDTO, "activeDays"> & { activeDays?: string[] }) => {
    setLoading(true);
    setError(null);
    try {
      // Convert UI days to backend format if provided
      const backendData: UpdateScheduleDTO = {
        ...data,
        activeDays: data.activeDays ? convertDaysToBackend(data.activeDays) : undefined,
      };

      const useCase = new UpdateSchedule(scheduleRepository);
      const updatedSchedule = await useCase.execute(id, backendData);

      // Convert days back to UI format
      const scheduleWithUIFormat = {
        ...updatedSchedule,
        activeDays: convertDaysToUI(updatedSchedule.activeDays),
      };

      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === id ? scheduleWithUIFormat : schedule
        )
      );
      console.log("✅ [useSchedules] Schedule updated:", scheduleWithUIFormat);
      return scheduleWithUIFormat;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update schedule";
      setError(errorMessage);
      console.error("❌ [useSchedules] Error updating schedule:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete schedule
  const deleteSchedule = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new DeleteSchedule(scheduleRepository);
      await useCase.execute(id);

      setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
      console.log("✅ [useSchedules] Schedule deleted:", id);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete schedule";
      setError(errorMessage);
      console.error("❌ [useSchedules] Error deleting schedule:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle schedule active/inactive
  const toggleSchedule = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new ToggleSchedule(scheduleRepository);
      const updatedSchedule = await useCase.execute(id);

      // Convert days back to UI format
      const scheduleWithUIFormat = {
        ...updatedSchedule,
        activeDays: convertDaysToUI(updatedSchedule.activeDays),
      };

      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === id ? scheduleWithUIFormat : schedule
        )
      );
      console.log("✅ [useSchedules] Schedule toggled:", scheduleWithUIFormat);
      return scheduleWithUIFormat;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to toggle schedule";
      setError(errorMessage);
      console.error("❌ [useSchedules] Error toggling schedule:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    toggleSchedule,
  };
};
