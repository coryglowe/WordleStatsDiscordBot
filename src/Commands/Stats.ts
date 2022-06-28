// Database imports
import getUserData from "../Database/GetUserData";
import { getUserAvgBoxCount, getAvgUserAttempts, getUserTotalBoxCount } from "../Database/GetPlayedData";

// Type imports
import { BoxCount } from "../Types/types";

export async function userStats(userID: string): Promise<string> {
    let dbRes = await getUserData(userID);
    if (!dbRes.dataExists()) {
        return "No stats found";
    }

    // let streak: number = dbRes.data.steak;
    let userBoxCount: BoxCount = await getUserTotalBoxCount(userID);

    let avg_attempts = await getAvgUserAttempts(userID);

    let statsMessage: Array<string> = [
        `**Stats for:** <@${userID}>`,
        `\n**Average Tries:** ${avg_attempts}`,
        `\n**Letter Accuracy:** ${calculateAccuracy(userBoxCount)}`
    ];

    let message: string = "";
    for (let i = 0; i < statsMessage.length; i++) {
        message += statsMessage[i];
    }

    return message;
}

function calculateAccuracy(boxCount: BoxCount): string {
    let accuracy: number = (boxCount.green + boxCount.yellow) / boxCount.total();
    accuracy *= 100;
    return `${accuracy}%`;
}
