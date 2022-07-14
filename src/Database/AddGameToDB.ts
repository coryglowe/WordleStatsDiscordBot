// Database imports
import DatabaseConnection from "./DatabaseConnection";

// Type imports
import { DatabaseResponse } from "../Types/types"

// Util imports
import { ProgramErrors, ProgramMessages } from "../Utils/ProgramMessages";


async function addGameToDB(userID: string, day: number, attempts: number, green_count: number, yellow_count: number, black_count: number): Promise<DatabaseResponse>  {
    const dbConn = await DatabaseConnection.start();

    if (dbConn === undefined) {
        return new DatabaseResponse(false, ProgramErrors.DatabaseConnection, null);
    }

    try {
        let queryString = ""; // First add game_id into "games table" if it doesn't exist
        queryString = `SELECT * FROM games WHERE game_id=${day};`
        let queryResult: any = await dbConn.query(queryString);

        if (queryResult[0].length < 1) {
            queryString = `INSERT INTO games (game_id, word) VALUES (${day}, NULL);`
            await dbConn.query(queryString);
        }

        queryString = `INSERT INTO played (user_id, game_id, attempts, green_count, yellow_count, black_count) VALUES("${userID}", ${day}, ${attempts}, ${green_count}, ${yellow_count}, ${black_count});`;
        queryResult = await dbConn.query(queryString);
        dbConn.release();

        if (queryResult[0].length < 1) {
            return new DatabaseResponse(false, ProgramMessages.NoResultsFound, null);
        }

        return new DatabaseResponse(true, ProgramMessages.ResourceCreated_Success, null);
    } catch (err: any) {
        console.log(err.sqlMessage);
        console.log("(AddGameToDB.ts)");

        dbConn.release();

        return new DatabaseResponse(false, ProgramErrors.DatabaseQuery, null);
    }
}



export default addGameToDB;
