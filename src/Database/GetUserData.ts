// Database imports
import DatabaseConnection from "./DatabaseConnection";

// Type imports
import { DatabaseResponse } from "../Types/types"

// Util imports
import { ProgramErrors, ProgramMessages } from "../Utils/ProgramMessages";

async function getUserData(userID: string): Promise<DatabaseResponse> {
    const dbConn = await DatabaseConnection.start();

    if (dbConn === undefined) {
        return new DatabaseResponse(false, ProgramErrors.DatabaseConnection, null);
    }

    try {
        const queryString = `SELECT * FROM users WHERE user_id="${userID}";`;

        const queryResult: any = await dbConn.query(queryString);
        dbConn.release();

        if (queryResult[0].length < 1) {
            return new DatabaseResponse(true, ProgramMessages.NoResultsFound, null);
        }

        // queryResult[0][0] returns the object of the array, not the entire array
        return new DatabaseResponse(true, ProgramMessages.ResultsFound, queryResult[0][0]);
    } catch (err: any) {
        console.log(err.sqlMessage);
        console.log("(GetUserData.ts)");
        
        dbConn.release();
        
        return new DatabaseResponse(true, "Query error", null);
    }
}

export default getUserData;
