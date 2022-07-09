// Database imports
import getUserData from "../Database/GetUserData";
import { getAvgUserAttempts, getUserTotalBoxCount, getAllAttempts } from "../Database/GetPlayedData";

// Type imports
import { BoxCount, DatabaseResponse, UserStats } from "../Types/types"
import { CommandInteraction, MessageEmbed } from "discord.js";

export async function statsCommand(interaction: CommandInteraction) {
    let stats: UserStats | undefined;

    const commandArgs = interaction.options;

    if (commandArgs.data.length === 0) {
        stats = await allUserStats(interaction.user.id);
    } else {
        // Do regex matching for ping <@[0-9]+>
        let optionParam: string | number | boolean | undefined = commandArgs.data[0].value;

        if (optionParam === undefined || typeof optionParam !== "string") {
            interaction.reply("Invalid user");
            return;
        }

        const regex = /^[<][@][!][0-9]+[>]$/;

        if (!regex.test(<string>optionParam)) {
            interaction.reply("Invalid user");
            return;
        }

        let userID: string = optionParam.match(/[0-9]+/)![0]; // There are already numbers in here from regex test above

        // Note: userID is a string of numbers
        stats = await allUserStats(userID);
    }

    if (stats === undefined) {
        interaction.reply({
            embeds: [new MessageEmbed()
                .setColor("DARK_GREY")
                .setAuthor({ name: "Wordle Bot" })
                .setTitle("No results found")
            ]
        });
        return;
    }

    const messageEmbed = new MessageEmbed()
        .setColor("DARK_GREY")
        .setTitle(`Player Wordle Stats`)
        .addFields(
            { name: "Average tries per game", value: `${stats.average_attempts.toFixed(2)}/6`, inline: true },
            { name: "Success rate", value: `${stats?.success_rate.toFixed(2)}%`, inline: true },
            { name: '\u200B', value: '\u200B' }, // Line break / empty field for embed
            { name: "Letter accuracy", value: `${stats?.letter_accuracy.toFixed(2)}%`, inline: true },
            { name: "Total played", value: `${stats?.total_played}`, inline: true }
        );

    interaction.reply({ embeds: [messageEmbed] });
}

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
