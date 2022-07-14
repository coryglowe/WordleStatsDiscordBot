// Node module imports
import mysql from "mysql2/promise";

// Config imports
import DatabaseConfig from "../Configs/database-config.json"

class DatabaseConnection {
    private static connectionPool = mysql.createPool(DatabaseConfig);

    static async start(): Promise<mysql.PoolConnection | undefined> {
        try {
            let connection = await this.connectionPool.getConnection();
            return connection;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
}

// const pool = mysql.createPool(DatabaseConfig);

// async function databaseConnection(): Promise<mysql.PoolConnection | undefined> {
//     try {
//         let connection = await pool.getConnection();
//         return connection;
//     } catch (err) {
//         console.log("Connection error");
//         return undefined;
//     }
// }

export default DatabaseConnection;
