export interface NotificationPayload {
    title: string;
    body: string;
    data?: Record<string, string>;
    imageUrl?: string;
}
export declare const sendToToken: (token: string, payload: NotificationPayload) => Promise<string>;
export declare const sendToMultiple: (tokens: string[], payload: NotificationPayload) => Promise<import("firebase-admin/messaging").BatchResponse | null>;
export declare const sendToTopic: (topic: string, payload: NotificationPayload) => Promise<string>;
//# sourceMappingURL=sendNotification.d.ts.map