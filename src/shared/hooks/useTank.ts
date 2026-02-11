import { useState, useCallback } from "react";
import {
  Tank,
  CreateTankDTO,
  UpdateTankConfigDTO,
  ControlPumpDTO,
} from "@/core/domain/entities/Tank";
import tankRepository from "@/core/infrastructure/api/repositories/TankRepository";
import { GetAllTanks } from "@/core/application/use-cases/tanks/GetTankInfo";
import { CreateTank } from "@/core/application/use-cases/tanks/CreateTank";
import { UpdateTank } from "@/core/application/use-cases/tanks/UpdateTankConfig";
import { DeleteTank } from "@/core/application/use-cases/tanks/DeleteTank";
import { ControlMixer } from "@/core/application/use-cases/tanks/ControlMixer";
import { StartPump } from "@/core/application/use-cases/tanks/StartPump";
import { StopPump } from "@/core/application/use-cases/tanks/StopPump";

// Initialize use cases
const getAllTanksUseCase = new GetAllTanks(tankRepository);
const createTankUseCase = new CreateTank(tankRepository);
const updateTankUseCase = new UpdateTank(tankRepository);
const deleteTankUseCase = new DeleteTank(tankRepository);
const controlMixerUseCase = new ControlMixer(tankRepository);
const startPumpUseCase = new StartPump(tankRepository);
const stopPumpUseCase = new StopPump(tankRepository);

interface UseTanksReturn {
  tanks: Tank[];
  isLoading: boolean;
  error: string | null;
  refreshTanks: () => Promise<void>;
  createTank: (data: CreateTankDTO) => Promise<void>;
  updateTank: (id: string, data: UpdateTankConfigDTO) => Promise<void>;
  deleteTank: (id: string) => Promise<void>;
  toggleMixer: (id: string, isActive: boolean) => Promise<void>;
  toggleAgitator: (id: string, isEnabled: boolean) => Promise<void>;
  startPump: (id: string, data: ControlPumpDTO) => Promise<void>;
  stopPump: (id: string) => Promise<void>;
}

export function useTanks(): UseTanksReturn {
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tanks
  const refreshTanks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllTanksUseCase.execute();
      setTanks(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch tanks";
      setError(errorMessage);
      console.error("Error fetching tanks:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new tank
  const createTank = useCallback(async (data: CreateTankDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTank = await createTankUseCase.execute(data);
      setTanks((prev) => Array.isArray(prev) ? [...prev, newTank] : [newTank]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create tank";
      setError(errorMessage);
      console.error("Error creating tank:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update tank
  const updateTank = useCallback(async (id: string, data: UpdateTankConfigDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTank = await updateTankUseCase.execute(id, data);
      setTanks((prev) => Array.isArray(prev) ? prev.map((t) => (t.id === id ? updatedTank : t)) : [updatedTank]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update tank";
      setError(errorMessage);
      console.error("Error updating tank:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete tank
  const deleteTank = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTankUseCase.execute(id);
      setTanks((prev) => Array.isArray(prev) ? prev.filter((t) => t.id !== id) : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete tank";
      setError(errorMessage);
      console.error("Error deleting tank:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Toggle mixer
  const toggleMixer = useCallback(async (id: string, isActive: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTank = await controlMixerUseCase.execute(id, { isActive });
      setTanks((prev) => Array.isArray(prev) ? prev.map((t) => (t.id === id ? updatedTank : t)) : [updatedTank]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to control mixer";
      setError(errorMessage);
      console.error("Error controlling mixer:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Toggle agitator (alias for mixer in this context)
  const toggleAgitator = useCallback(async (id: string, isEnabled: boolean) => {
    return toggleMixer(id, isEnabled);
  }, [toggleMixer]);

  // Start pump
  const startPump = useCallback(async (id: string, data: ControlPumpDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTank = await startPumpUseCase.execute(id, data);
      setTanks((prev) => Array.isArray(prev) ? prev.map((t) => (t.id === id ? updatedTank : t)) : [updatedTank]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start pump";
      setError(errorMessage);
      console.error("Error starting pump:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Stop pump
  const stopPump = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTank = await stopPumpUseCase.execute(id);
      setTanks((prev) => Array.isArray(prev) ? prev.map((t) => (t.id === id ? updatedTank : t)) : [updatedTank]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to stop pump";
      setError(errorMessage);
      console.error("Error stopping pump:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tanks,
    isLoading,
    error,
    refreshTanks,
    createTank,
    updateTank,
    deleteTank,
    toggleMixer,
    toggleAgitator,
    startPump,
    stopPump,
  };
}
