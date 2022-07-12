// Node module imports
import mysql from "mysql2/promise";

// Config imports
import DatabaseConfig from "../Configs/database-config.json"

const pool = mysql.createPool(DatabaseConfig);

async function databaseConnection(): Promise<mysql.PoolConnection | undefined> {
    try {
        let connection = await pool.getConnection();
        return connection;
    } catch (err) {
        console.log("Connection error");
        return undefined;
    }
}

export default databaseConnection;
