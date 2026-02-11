import { useState, useCallback } from "react";
import { GardenWateringRepository } from "@/core/infrastructure/api/repositories/GardenWateringRepository";
import { StartGardenWatering } from "@/core/application/use-cases/garden-watering/StartGardenWatering";
import { StopGardenWatering } from "@/core/application/use-cases/garden-watering/StopGardenWatering";
import { GetCurrentGardenWateringSession } from "@/core/application/use-cases/garden-watering/GetCurrentGardenWateringSession";
import { GetGardenWateringHistory } from "@/core/application/use-cases/garden-watering/GetGardenWateringHistory";
import { GetGardenWateringStatistics } from "@/core/application/use-cases/garden-watering/GetGardenWateringStatistics";
import {
  GardenWateringSession,
  GardenWateringStatistics,
} from "@/core/domain/entities/GardenWateringSession";
import {
  StartGardenWateringDTO,
  StopGardenWateringDTO,
  GetHistoryDTO,
} from "@/core/application/dtos/GardenWateringDTO";

// Initialize repository and use cases
const gardenWateringRepository = new GardenWateringRepository();
const startGardenWateringUseCase = new StartGardenWatering(gardenWateringRepository);
const stopGardenWateringUseCase = new StopGardenWatering(gardenWateringRepository);
const getCurrentSessionUseCase = new GetCurrentGardenWateringSession(gardenWateringRepository);
const getHistoryUseCase = new GetGardenWateringHistory(gardenWateringRepository);
const getStatisticsUseCase = new GetGardenWateringStatistics(gardenWateringRepository);

export function useGardenWatering() {
  const [currentSession, setCurrentSession] = useState<GardenWateringSession | null>(null);
  const [history, setHistory] = useState<GardenWateringSession[]>([]);
  const [historyCount, setHistoryCount] = useState(0);
  const [statistics, setStatistics] = useState<GardenWateringStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Untuk sementara userId hardcoded, nanti ambil dari context
  const userId = "user-123";

  const startGardenWatering = useCallback(
    async (data: StartGardenWateringDTO) => {
      try {
        setIsLoading(true);
        setError(null);
        const session = await startGardenWateringUseCase.execute(userId, data);
        setCurrentSession(session);
        return session;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to start garden watering";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  const stopGardenWatering = useCallback(
    async (data: StopGardenWateringDTO = {}) => {
      try {
        setIsLoading(true);
        setError(null);
        const session = await stopGardenWateringUseCase.execute(userId, data);
        setCurrentSession(null); // Clear current session
        return session;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to stop garden watering";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  const getCurrentSession = useCallback(async () => {
    try {
      setError(null);
      const session = await getCurrentSessionUseCase.execute(userId);
      setCurrentSession(session);
      return session;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get current session";
      setError(errorMessage);
      return null;
    }
  }, [userId]);

  const getHistory = useCallback(
    async (params: GetHistoryDTO = {}) => {
      try {
        setError(null);
        const result = await getHistoryUseCase.execute(userId, params);
        setHistory(result.data);
        setHistoryCount(result.count);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to get history";
        setError(errorMessage);
        return { data: [], count: 0 };
      }
    },
    [userId]
  );

  const getStatistics = useCallback(async () => {
    try {
      setError(null);
      const stats = await getStatisticsUseCase.execute(userId);
      setStatistics(stats);
      return stats;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get statistics";
      setError(errorMessage);
      return null;
    }
  }, [userId]);

  return {
    currentSession,
    history,
    historyCount,
    statistics,
    isLoading,
    error,
    startGardenWatering,
    stopGardenWatering,
    getCurrentSession,
    getHistory,
    getStatistics,
  };
}
