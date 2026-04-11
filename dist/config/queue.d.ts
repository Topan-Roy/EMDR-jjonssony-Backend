import { Queue } from 'bullmq';
export interface BroadcastJobData {
    tokens: string[];
    userIds: string[];
    title: string;
    body: string;
    data?: Record<string, string>;
    imageUrl?: string;
}
export declare const notificationQueue: Queue<BroadcastJobData, any, string, BroadcastJobData, any, string>;
export declare const startNotificationWorker: () => void;
//# sourceMappingURL=queue.d.ts.map