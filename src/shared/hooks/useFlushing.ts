import { useState, useCallback } from "react";
import {
  FlushingSession,
  StartFlushingDTO,
  StopFlushingDTO,
  FlushingHistoryQuery,
  FlushingStatistics,
} from "@/core/domain/entities/FlushingSession";
import flushingRepository from "@/core/infrastructure/api/repositories/FlushingRepository";
import { StartFlushing } from "@/core/application/use-cases/flushing/StartFlushing";
import { StopFlushing } from "@/core/application/use-cases/flushing/StopFlushing";
import { GetCurrentSession } from "@/core/application/use-cases/flushing/GetCurrentSession";
import { GetFlushingHistory } from "@/core/application/use-cases/flushing/GetFlushingHistory";
import { GetFlushingStatistics } from "@/core/application/use-cases/flushing/GetFlushingStatistics";

// Initialize use cases
const startFlushingUseCase = new StartFlushing(flushingRepository);
const stopFlushingUseCase = new StopFlushing(flushingRepository);
const getCurrentSessionUseCase = new GetCurrentSession(flushingRepository);
const getFlushingHistoryUseCase = new GetFlushingHistory(flushingRepository);
const getFlushingStatisticsUseCase = new GetFlushingStatistics(flushingRepository);

interface UseFlushingReturn {
  currentSession: FlushingSession | null;
  history: FlushingSession[];
  historyCount: number;
  statistics: FlushingStatistics | null;
  isLoading: boolean;
  error: string | null;
  startFlushing: (data: StartFlushingDTO) => Promise<void>;
  stopFlushing: (data?: StopFlushingDTO) => Promise<void>;
  getCurrentSession: () => Promise<void>;
  getHistory: (query?: FlushingHistoryQuery) => Promise<void>;
  getStatistics: () => Promise<void>;
}

export function useFlushing(): UseFlushingReturn {
  const [currentSession, setCurrentSession] = useState<FlushingSession | null>(null);
  const [history, setHistory] = useState<FlushingSession[]>([]);
  const [historyCount, setHistoryCount] = useState(0);
  const [statistics, setStatistics] = useState<FlushingStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start flushing
  const startFlushing = useCallback(async (data: StartFlushingDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      // User ID will be handled by backend from auth token
      const session = await startFlushingUseCase.execute("", data);
      setCurrentSession(session);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start flushing";
      setError(errorMessage);
      console.error("Error starting flushing:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Stop flushing
  const stopFlushing = useCallback(async (data?: StopFlushingDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      await stopFlushingUseCase.execute("", data);
      setCurrentSession(null); // Clear current session
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to stop flushing";
      setError(errorMessage);
      console.error("Error stopping flushing:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get current session
  const getCurrentSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await getCurrentSessionUseCase.execute("");
      setCurrentSession(session);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch current session";
      setError(errorMessage);
      console.error("Error fetching current session:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get history
  const getHistory = useCallback(async (query?: FlushingHistoryQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getFlushingHistoryUseCase.execute("", query);
      setHistory(result.data);
      setHistoryCount(result.count);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch history";
      setError(errorMessage);
      console.error("Error fetching history:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get statistics
  const getStatistics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stats = await getFlushingStatisticsUseCase.execute("");
      setStatistics(stats);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch statistics";
      setError(errorMessage);
      console.error("Error fetching statistics:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentSession,
    history,
    historyCount,
    statistics,
    isLoading,
    error,
    startFlushing,
    stopFlushing,
    getCurrentSession,
    getHistory,
    getStatistics,
  };
}
