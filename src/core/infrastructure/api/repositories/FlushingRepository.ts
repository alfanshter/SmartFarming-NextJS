import { apiClient } from "../apiClient";
import { IFlushingRepository } from "@/core/domain/repositories/IFlushingRepository";
import {
  FlushingSession,
  StartFlushingDTO,
  StopFlushingDTO,
  FlushingHistoryQuery,
  FlushingStatistics,
} from "@/core/domain/entities/FlushingSession";

class FlushingRepository implements IFlushingRepository {
  private readonly basePath = "/flushing";

  async startFlushing(_userId: string, data: StartFlushingDTO): Promise<FlushingSession> {
    try {
      console.log("🚰 Starting flushing:", data);
      const response = await apiClient.post(`${this.basePath}/start`, data);
      console.log("✅ Flushing started:", response.data);
      
      // Convert date strings to Date objects
      return this.transformSession(response.data.data);
    } catch (error: unknown) {
      console.error("❌ Error starting flushing:", error);
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Failed to start flushing"
      );
    }
  }

  async stopFlushing(_userId: string, data?: StopFlushingDTO): Promise<FlushingSession> {
    try {
      console.log("⛔ Stopping flushing");
      const response = await apiClient.post(`${this.basePath}/stop`, data || {});
      console.log("✅ Flushing stopped:", response.data);
      
      return this.transformSession(response.data.data);
    } catch (error: unknown) {
      console.error("❌ Error stopping flushing:", error);
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Failed to stop flushing"
      );
    }
  }

  async getCurrentSession(_userId: string): Promise<FlushingSession | null> {
    try {
      console.log("🔍 Fetching current flushing session");
      const response = await apiClient.get(`${this.basePath}/current`);
      
      if (!response.data.data) {
        console.log("ℹ️ No active flushing session");
        return null;
      }
      
      console.log("✅ Current session:", response.data.data);
      return this.transformSession(response.data.data);
    } catch (error: unknown) {
      console.error("❌ Error fetching current session:", error);
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Failed to fetch current session"
      );
    }
  }

  async getHistory(
    _userId: string,
    query?: FlushingHistoryQuery
  ): Promise<{ data: FlushingSession[]; count: number }> {
    try {
      console.log("📜 Fetching flushing history");
      const params = new URLSearchParams();
      
      if (query?.limit) params.append("limit", query.limit.toString());
      if (query?.offset) params.append("offset", query.offset.toString());
      if (query?.status) params.append("status", query.status);
      
      const response = await apiClient.get(
        `${this.basePath}/history?${params.toString()}`
      );
      
      console.log("✅ History fetched:", response.data.count, "records");
      
      type SessionResponse = {
        id: string;
        userId: string;
        durationMinutes: number;
        notes?: string;
        status: "running" | "completed" | "stopped";
        startedAt: string;
        endedAt?: string;
        actualDurationMinutes?: number;
        createdAt: string;
        updatedAt: string;
      };
      
      return {
        data: response.data.data.map((session: SessionResponse) => this.transformSession(session)),
        count: response.data.count,
      };
    } catch (error: unknown) {
      console.error("❌ Error fetching history:", error);
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Failed to fetch history"
      );
    }
  }

  async getStatistics(_userId: string): Promise<FlushingStatistics> {
    try {
      console.log("📊 Fetching flushing statistics");
      const response = await apiClient.get(`${this.basePath}/statistics`);
      console.log("✅ Statistics:", response.data.data);
      
      const stats = response.data.data;
      
      return {
        totalSessions: stats.totalSessions || 0,
        completedSessions: stats.completedSessions || 0,
        stoppedSessions: stats.stoppedSessions || 0,
        totalDurationMinutes: stats.totalDurationMinutes || 0,
        averageDurationMinutes: stats.averageDurationMinutes || 0,
        lastFlushingDate: stats.lastFlushingDate 
          ? new Date(stats.lastFlushingDate) 
          : undefined,
      };
    } catch (error: unknown) {
      console.error("❌ Error fetching statistics:", error);
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Failed to fetch statistics"
      );
    }
  }

  async getById(id: string): Promise<FlushingSession | null> {
    try {
      console.log("🔍 Fetching flushing session:", id);
      const response = await apiClient.get(`${this.basePath}/${id}`);
      
      if (!response.data.data) {
        return null;
      }
      
      return this.transformSession(response.data.data);
    } catch (error: unknown) {
      console.error("❌ Error fetching session:", error);
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Failed to fetch session"
      );
    }
  }

  // Helper to transform API response to domain entity
  private transformSession(data: {
    id: string;
    userId: string;
    durationMinutes: number;
    notes?: string;
    status: "running" | "completed" | "stopped";
    startedAt: string;
    endedAt?: string;
    actualDurationMinutes?: number;
    createdAt: string;
    updatedAt: string;
  }): FlushingSession {
    return {
      id: data.id,
      userId: data.userId,
      durationMinutes: data.durationMinutes,
      notes: data.notes,
      status: data.status,
      startedAt: new Date(data.startedAt),
      endedAt: data.endedAt ? new Date(data.endedAt) : undefined,
      actualDurationMinutes: data.actualDurationMinutes,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }
}

const flushingRepository = new FlushingRepository();
export default flushingRepository;

