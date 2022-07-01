// Database imports
import getUserData from "../Database/GetUserData";
import { getAvgUserAttempts, getUserTotalBoxCount, getAllAttempts } from "../Database/GetPlayedData";

// Type imports
import { BoxCount, DatabaseResponse, UserStats } from "../Types/types"

export async function allUserStats(userID: string): Promise<UserStats | undefined> {
    let dbRes: DatabaseResponse = await getUserData(userID);
    if (!dbRes.dataExists()) {
        // return "No stats found";
        return undefined;
    }

    // let streak: number = dbRes.data.steak;
    let userBoxCount: BoxCount | null = await getUserTotalBoxCount(userID);
    let avg_attempts: number | null = await getAvgUserAttempts(userID);
    let all_attempts: Array<number> | null = await getAllAttempts(userID);

    if (avg_attempts === null) {
        avg_attempts = 0;
    }

    if (all_attempts === null) {
        all_attempts = [];
    }

    // let statsMessage: Array<string> = [
    //     `**Stats for:** <@!${userID}>`, 
    //     `\n**Average Tries:** ${avg_attempts}`,
    //     // `\n**Letter Accuracy:** ${userBoxCount === null ? 0 : calculateAccuracy(userBoxCount)}`
    // ];

    // let message: string = "";
    // for (let i = 0; i < statsMessage.length; i++) {
    //     message += statsMessage[i];
    // }

    let letter_accuracy: number = (userBoxCount === null) ? 0 : calculateLetterAccuracy(userBoxCount);
    let success_rate: number = (all_attempts === null) ? 0 : calculateSuccessRate(all_attempts);
    return {
        user_id: userID,
        average_attempts: avg_attempts,
        letter_accuracy,
        success_rate,
        total_played: all_attempts.length
    }
}

function calculateLetterAccuracy(boxCount: BoxCount): number {
    let accuracy: number = (boxCount.green + boxCount.yellow) / boxCount.total();
    accuracy *= 100;
    return accuracy;
    // return `${accuracy.toFixed(2)}%`; // Round two two decimals
}

function calculateSuccessRate(attempts: Array<number>): number {
    if (attempts.length === 0) {
        return 0;
    }
    
    let success: number = 0;
    let fails: number = 0;
    
    attempts.forEach((element: number) => {
        if (element < 7) {
            success++;
        } else {
            fails++;
        }
    });

    return (success / (success + fails)) * 100;
}
