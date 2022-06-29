// Node module imports
import { User } from "discord.js";

// Types imports
import { BoxCount, DatabaseResponse } from "../Types/types"

// Utils imports
import { reconstructMatrix } from "../Utils/CleanEmojis";
import { extractAttempts, extractDay, extractMatrix } from "../Utils/ExtractFromMessage";

// Database import
import getUserData from "../Database/GetUserData";
import insertUser from "../Database/InsertUser";
import addGameToDB from "../Database/AddGameToDB";

async function wordleMessage(message: string, userID: string): Promise<string> {
    // Use utility functions that use REGEX to extract a substring
    let day = extractDay(message); // Extracts the day of the wordle
    let attempts = extractAttempts(message); // Extracts the number of guesses
    let matrix = extractMatrix(message); // Extracts the game board

    if (day === undefined || attempts === undefined || matrix === undefined) {
        return "Invalid Wordle read";
    }

    // Confirm the score (Regex doesn't cover Matrix counting)
    let cleanMatrix = reconstructMatrix(matrix); // Replaces emojis with characters

    let boxCount: BoxCount = countBoxes(cleanMatrix); // Count the number of boxes in a matrix

    if (boxCount.total() != ((attempts === 7 ? attempts - 1 : attempts) * 5)) {
        // If the number of boxes do not match the attempts, then the matrix/board is invalid
        return "Invalid game board";
    }

    // Then check if user exists
    const doesUserExist: DatabaseResponse = await getUserData(userID);
    
    if (doesUserExist.success === false && doesUserExist.data === null) {
        // Register the user, if the user isn't in the database
        const insertUserResponse: DatabaseResponse = await insertUser(userID, 0);
        if (insertUserResponse.success === false) {
            return "Could not save wordle game.";
        }
    }

    const addGameResponse: DatabaseResponse = await addGameToDB(userID, day, attempts, boxCount.green, boxCount.yellow, boxCount.black);

    if (addGameResponse.success === false) {
        return "Could not save wordle game.";
    }

    return "Wordle saved!";
}

function countBoxes(matrix: string): BoxCount {
    let boxCount = new BoxCount();
    for (let i = 0; i < matrix.length; i++) {
        switch (matrix[i]) {
            case "B":
                boxCount.black++;
                break;

            case "G":
                boxCount.green++;
                break;

            case "Y":
                boxCount.yellow++;
                break;

            default:
                // console.log("Unknown character counted");
                boxCount.unknown++;
                break;
        }
    }
    return boxCount;
}

export default wordleMessage;
