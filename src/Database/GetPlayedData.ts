// Database imports
import databaseConnection from "./DatabaseConnection";

// Type imports
import { DatabaseResponse, BoxCount } from "../Types/types";

// Util imports
import { ProgramErrors, ProgramMessages } from "../Utils/ProgramMessages";

// Query data containing game_id and user_id

// Internal function that will query data from played database
async function getPlayedData(queryString: string): Promise<DatabaseResponse> {
    const dbConn = databaseConnection();

    try {
        const queryResults: any = await dbConn.query(queryString);

        if (queryResults[0].length < 1) {
            return new DatabaseResponse(true, ProgramMessages.NoResultsFound, []);
        }

        return new DatabaseResponse(true, ProgramMessages.ResultsFound, queryResults[0]); // Return the entire array of results
    } catch (err) {
        console.log("Query error in (GetPlayedData.ts)");
        console.log(err);
        return new DatabaseResponse(false, ProgramErrors.DatabaseConnection, []);
    }
    
}

export async function getUserAvgBoxCount(userID: string): Promise<BoxCount> {
    let queryData: DatabaseResponse = await getPlayedData(`SELECT AVG(green_count), AVG(yellow_count), AVG(black_count) FROM played WHERE user_id="${userID}";`);
    let boxCount = new BoxCount(
        queryData.data[0]["AVG(green_count)"],
        queryData.data[0]["AVG(yellow_count)"],
        queryData.data[0]["AVG(black_count)"]
    );
    return boxCount;
}

export async function getGameAvgBoxCount(gameID: number): Promise<BoxCount> {
    let queryData: DatabaseResponse = await getPlayedData(`SELECT AVG(green_count), AVG(yellow_count), AVG(black_count) FROM played WHERE user_id="${gameID}";`);
    let boxCount = new BoxCount(
        queryData.data[0]["AVG(green_count)"],
        queryData.data[0]["AVG(yellow_count)"],
        queryData.data[0]["AVG(black_count)"]
    );
    return boxCount;
}

export async function getUserTotalBoxCount(userID: string): Promise <BoxCount> {
    let queryData: DatabaseResponse = await getPlayedData(`SELECT SUM(green_count), SUM(yellow_count), SUM(black_count) FROM played WHERE user_id="${userID}"`);
    let boxCount = new BoxCount(
        queryData.data[0]["SUM(green_count)"],
        queryData.data[0]["SUM(yellow_count)"],
        queryData.data[0]["SUM(black_count)"]
    );
    return boxCount;
}

export async function getAvgUserAttempts(userID: string): Promise<number> {
    let queryData: DatabaseResponse = await getPlayedData(`SELECT AVG(attempts) FROM played WHERE user_id="${userID}"`);
    return queryData.data[0]["AVG(attempts)"];
}

export async function getAvgGameAttempts(gameID: number): Promise<number> {
    let queryData: DatabaseResponse = await getPlayedData(`SELECT AVG(attempts) FROM played WHERE game_id=${gameID}`);
    return queryData.data[0]["AVG(attempts)"];
}
