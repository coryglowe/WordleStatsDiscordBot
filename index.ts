import Discord, { Message, MessageEmbed } from "discord.js"

import { token } from "./src/configs/discord-config.json"

import isWordleMessage from "./src/Utils/WordleMessageRegex";

// Command imports
import wordleMessage from "./src/Commands/WordleMessage";
import { statsCommand } from "./src/Commands/Stats";
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
    
    if (commandSent === "wordle-stats") {
        statsCommand(interaction);
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
