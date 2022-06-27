// Node module imports
import mysql from "mysql2/promise";

// Config imports
import DatabaseConfig from "../Configs/database-config.json"

async function databaseConnection(): Promise<mysql.Pool | undefined> {
    try {
        let connection = mysql.createPool(DatabaseConfig);

        return connection;
    } catch (err) {
        console.log("Error creating pool");
        return undefined;
    }
}




export default databaseConnection;
