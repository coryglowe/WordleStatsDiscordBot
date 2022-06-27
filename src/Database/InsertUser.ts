// Database imports
import databaseConnection from "./DatabaseConnection";

// Type imports
import { DatabaseResponse } from "../Types/types";

// Util imports
import { ProgramErrors, ProgramMessages } from "../Utils/ProgramMessages";

// Function returns false if user was not added into the database
async function insertUser(userID: string, streak: number): Promise<DatabaseResponse> {
    let dbConn = await databaseConnection();

    if (dbConn === undefined) {
        return new DatabaseResponse(false, ProgramErrors.DatabaseConnection, null);
    }

    // Note: this function does not check if a user already exists.
    // That needs to be done before calling this function
    try {
        let queryString = `INSERT INTO users (user_id, streak) VALUES("${userID}", 0);`

        await dbConn.query(queryString);
        dbConn.end();

        return new DatabaseResponse(true, "Successfully added user into database!", null);
    } catch (err) {
        console.log("There was an error inserting user into the database");
        dbConn.end();

        return new DatabaseResponse(true, ProgramErrors.DatabaseQuery, null);
    }
}

export default insertUser;
