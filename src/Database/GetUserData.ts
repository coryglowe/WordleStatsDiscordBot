// Database imports
import databaseConnection from "./DatabaseConnection";

// Type imports
import { DatabaseResponse } from "../Types/types"

// Util imports
import { ProgramMessages } from "../Utils/ProgramMessages";

async function getUserData(userID: string): Promise<DatabaseResponse> {
    let dbConn = await databaseConnection();

    if (dbConn === undefined) {
        return new DatabaseResponse(false, "Error: could not establish database connection", null);
    }

    try {
        let queryString = `SELECT * FROM users WHERE user_id="${userID}";`;

        let queryResult: any = await dbConn.query(queryString);

        if (queryResult[0].length < 1) {
            return new DatabaseResponse(false, "Error: user_id does not exist", null);
        }

        // queryResult[0][0] returns the object of the array, not the entire array
        return new DatabaseResponse(true, ProgramMessages.ResultsFound,queryResult[0][0]);
    } catch (err) {
        console.log("There was an error obtaining user data (GetUserData.ts)");
        console.log(err);
        return new DatabaseResponse(true, "Query error", null);
    }
}

export default getUserData;
