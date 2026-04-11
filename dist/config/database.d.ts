import mongoose from 'mongoose';
declare class Database {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnection(): mongoose.Connection;
}
export declare const database: Database;
export default database;
//# sourceMappingURL=database.d.ts.map