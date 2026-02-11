import { FlushingSession, StartFlushingDTO, StopFlushingDTO, FlushingHistoryQuery, FlushingStatistics } from "../entities/FlushingSession";

export interface IFlushingRepository {
  // Start new flushing session
  startFlushing(userId: string, data: StartFlushingDTO): Promise<FlushingSession>;
  
  // Stop current flushing session
  stopFlushing(userId: string, data?: StopFlushingDTO): Promise<FlushingSession>;
  
  // Get current running session
  getCurrentSession(userId: string): Promise<FlushingSession | null>;
  
  // Get flushing history
  getHistory(userId: string, query?: FlushingHistoryQuery): Promise<{ data: FlushingSession[]; count: number }>;
  
  // Get statistics
  getStatistics(userId: string): Promise<FlushingStatistics>;
  
  // Get session by ID
  getById(id: string): Promise<FlushingSession | null>;
}
