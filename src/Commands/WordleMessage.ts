// Node module imports
import { User } from "discord.js";

// Types imports
import { BoxCount } from "../Types/types"

// Utils imports
import { reconstructMatrix } from "../Utils/CleanEmojis";
import { extractAttempts, extractDay, extractMatrix } from "../Utils/ExtractFromMessage";

// Database import
import getUserData from "../Database/GetUserData";
import insertUser from "../Database/InsertUser";
import addGameToDB from "../Database/AddGameToDB";

async function wordleMessage(message: string, user: User): Promise<string> {
    let day = extractDay(message);
    let attempts = extractAttempts(message);
    let matrix = extractMatrix(message);

    if (day === undefined || attempts === undefined || matrix === undefined) {
        return "Invalid Wordle read";
    }

    // Confirm the score (Regex doesn't cover Matrix counting)

    let cleanMatrix = reconstructMatrix(matrix); // Replaces emojis with characters

    let boxCount = getBoxCount(cleanMatrix); 

    let boxCountTotal = (): number => boxCount.green + boxCount.yellow + boxCount.black;

    if (boxCountTotal() != (attempts * 5)) {
        // If the number of boxes do not match the attempts, then the matrix/board is invalid
        return "Invalid game board";
    }

    // Then check if user exists
    let doesUserExist = await getUserData(user.id);
    if (doesUserExist.success === false && doesUserExist.data === null) {
        // Register the user, if the user isn't in the database
        let insertUserResponse = await insertUser(user.id, 0);
        if (insertUserResponse.success === false) {
            return "Could not save wordle game. User not registered.";
        }
    }

    let addGameResponse = await addGameToDB(user.id, day, attempts, boxCount.green, boxCount.yellow, boxCount.black);

    if (addGameResponse.success === false) {
        return "Could not save wordle game";
    }

    return "Wordle saved!";
}

function getBoxCount(matrix: string): BoxCount {
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
