// Database imports
import databaseConnection from "./DatabaseConnection";

// Type imports
import { DatabaseResponse } from "../Types/types"

// Util imports
import { ProgramMessages } from "../Utils/ProgramMessages";

async function getUserData(userID: string): Promise<DatabaseResponse> {
    const dbConn = databaseConnection();

    try {
        const queryString = `SELECT * FROM users WHERE user_id="${userID}";`;

        const queryResult: any = await dbConn.query(queryString);

        if (queryResult[0].length < 1) {
            return new DatabaseResponse(true, ProgramMessages.NoResultsFound, null);
        }

        // queryResult[0][0] returns the object of the array, not the entire array
        return new DatabaseResponse(true, ProgramMessages.ResultsFound, queryResult[0][0]);
    } catch (err) {
        console.log("There was an error obtaining user data (GetUserData.ts)");
        console.log(err);
        return new DatabaseResponse(true, "Query error", null);
    }
}

export default getUserData;
