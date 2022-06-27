// Database imports
import databaseConnection from "./DatabaseConnection";

// Type imports
import { DatabaseResponse } from "../Types/types";

// Util imports
import { ProgramErrors, ProgramMessages } from "../Utils/ProgramMessages";

// Query data containing game_id and user_id
export async function getUserGameData(game_id: number, user_id: string): Promise<DatabaseResponse> {
    let dbConn = await databaseConnection();

    if (dbConn === undefined) {
        return new DatabaseResponse(false, ProgramErrors.DatabaseConnection, null);
    }

    // Configure the query string given options
    let queryString: string = "";

    try {
        // Configure the query string given options
        queryString = `SELECT * FROM played WHERE user_id="${user_id}" AND game_id=${game_id};` // Temporary hackjob, will fix later

        let queryResult: any = await dbConn.query(queryString);

        if (queryResult[0].length < 0) {
            return new DatabaseResponse(false, ProgramMessages.NoResultsFound, null);
        }

        return new DatabaseResponse(false, ProgramMessages.ResultsFound, queryResult[0]);
    } catch (err) {
        console.log("Query error: (GetPlayedData.ts)");

        return new DatabaseResponse(false, ProgramErrors.DatabaseQuery, null);
    }
}

export async function getAllUserPlayed(user_id: number): Promise<DatabaseResponse> {

    return new DatabaseResponse(true, ProgramMessages.ResultsFound, null);
}

