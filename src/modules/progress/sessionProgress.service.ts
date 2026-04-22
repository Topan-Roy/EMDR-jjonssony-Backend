import { SessionProgress } from './sessionProgress.model';
import { ApiError } from '../../utils/ApiError';
import { logger } from '../../config/logger';

export const sessionProgressService = {
  /**
   * Update or create session progress and calculate percentage
   */
  async updateProgress(userId: string, data: { journeyId: string; totalSession: number; compledSession: number }) {
    const { journeyId, totalSession, compledSession } = data;

    // Calculate percentage
    const percentageValue = totalSession > 0 ? Math.round((compledSession / totalSession) * 100) : 0;
    const progressPercentage = `${percentageValue}%`;

    const progress = await SessionProgress.findOneAndUpdate(
      { userId, journeyId },
      {
        userId,
        journeyId,
        totalSessions:     totalSession,
        completedSessions: compledSession,
        progressPercentage,
      },
      { upsert: true, new: true, runValidators: true }
    ).lean();

    logger.info('Session progress updated', { userId, journeyId, progressPercentage });
    
    return {
      totalCompledSession: progressPercentage,
      details: {
        totalSessions:     progress?.totalSessions,
        completedSessions: progress?.completedSessions
      }
    };
  },

  /**
   * Get progress for a specific journey
   */
  async getProgress(userId: string, journeyId: string) {
    const progress = await SessionProgress.findOne({ userId, journeyId }).lean();
    if (!progress) {
      return {
        totalCompledSession: "0%",
        details: { totalSessions: 0, completedSessions: 0 }
      };
    }
    
    return {
      totalCompledSession: progress.progressPercentage,
      details: {
        totalSessions:     progress.totalSessions,
        completedSessions: progress.completedSessions
      }
    };
  },
};
