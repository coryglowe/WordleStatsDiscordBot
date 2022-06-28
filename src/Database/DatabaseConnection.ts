// Node module imports
import mysql from "mysql2/promise";

// Config imports
import DatabaseConfig from "../Configs/database-config.json"

function databaseConnection(): mysql.Pool {
    const connection = mysql.createPool(DatabaseConfig);
    return connection;
}

export default databaseConnection;
