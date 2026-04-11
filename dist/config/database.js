"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
class Database {
    async connect() {
        try {
            await mongoose_1.default.connect(env_1.env.DATABASE_URL, {
                maxPoolSize: 10,
                minPoolSize: 5,
                serverSelectionTimeoutMS: 5000,
            });
            console.log('MongoDB connected successfully');
            mongoose_1.default.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
            });
            mongoose_1.default.connection.on('disconnected', () => {
                console.warn('MongoDB disconnected');
            });
            process.on('SIGINT', async () => {
                await this.disconnect();
                process.exit(0);
            });
        }
        catch (error) {
            console.error('MongoDB connection failed:', error);
            process.exit(1);
        }
    }
    async disconnect() {
        try {
            await mongoose_1.default.disconnect();
            console.log('MongoDB disconnected gracefully');
        }
        catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
        }
    }
    getConnection() {
        return mongoose_1.default.connection;
    }
}
exports.database = new Database();
exports.default = exports.database;
//# sourceMappingURL=database.js.map