"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToTopic = exports.sendToMultiple = exports.sendToToken = void 0;
const firebase_1 = require("../config/firebase");
const sendToToken = async (token, payload) => {
    const { title, body, data, imageUrl } = payload;
    return firebase_1.messaging.send({
        token,
        notification: { title, body, imageUrl },
        data,
        android: { priority: 'high', notification: { sound: 'default' } },
        apns: { payload: { aps: { sound: 'default', badge: 1 } } },
    });
};
exports.sendToToken = sendToToken;
const sendToMultiple = async (tokens, payload) => {
    if (!tokens.length)
        return null;
    const { title, body, data, imageUrl } = payload;
    const message = {
        tokens,
        notification: { title, body, imageUrl },
        data,
        android: { priority: 'high', notification: { sound: 'default' } },
        apns: { payload: { aps: { sound: 'default', badge: 1 } } },
    };
    return firebase_1.messaging.sendEachForMulticast(message);
};
exports.sendToMultiple = sendToMultiple;
const sendToTopic = async (topic, payload) => {
    const { title, body, data, imageUrl } = payload;
    return firebase_1.messaging.send({
        topic,
        notification: { title, body, imageUrl },
        data,
        android: { priority: 'high', notification: { sound: 'default' } },
        apns: { payload: { aps: { sound: 'default', badge: 1 } } },
    });
};
exports.sendToTopic = sendToTopic;
//# sourceMappingURL=sendNotification.js.map