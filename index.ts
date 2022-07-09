import Discord, { Message, MessageEmbed } from "discord.js"

import { token } from "./src/configs/discord-config.json"

import isWordleMessage from "./src/Utils/WordleMessageRegex";

// Command imports
import wordleMessage from "./src/Commands/WordleMessage";
import { allUserStats } from "./src/Commands/Stats";
import { UserStats } from "./src/Types/types";


const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

client.once("ready", () => {
    console.log("The bot is now running!");
});

// Event listener for when an interaction is created
client.on("interactionCreate", async (interaction: Discord.Interaction): Promise<void> => {
    if (!interaction.isCommand()) {
        return;
    }

    const commandSent = interaction.commandName;
    const commandArgs = interaction.options;

    if (commandSent === "wordle-stats") {
        let stats: UserStats | undefined;

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

});

// Event listener for when a message is created
client.on("messageCreate", async (message: Discord.Message): Promise<void> => {
    if (message.author.bot) {
        return; // Do not respond if a bot sends a message
    }

    if (!isWordleMessage(message.content)) {
        return; // If the word does not match Wordle regex message, go back
    }

    let user: Discord.User = message.author;
    let response = await wordleMessage(message.content, user.id);

    message.reply(response);
});

client.login(token);
