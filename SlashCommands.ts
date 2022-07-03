// Only run this file to register commands
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9"
import { token } from "./src/Configs/discord-config.json";
import GuildConfig from "./src/Configs/guild-config.json";

import { SlashCommandBuilder } from "@discordjs/builders";

const wordleBotCommands = [
    new SlashCommandBuilder()
        .setName("wstats")
        .setDescription("View your / another person's wordle statistics")
        .addStringOption(user => user
            .setName("user")
            .setRequired(false)
            .setDescription("@ a user to view their stats")),

    new SlashCommandBuilder()
            .setName("wregister")
            .setDescription("Register your discord for Wordle tracking"),
];


const rest = new REST({ version: "9" }).setToken(token);



rest.put(Routes.applicationGuildCommands(GuildConfig.client_id, GuildConfig.guild_id), {
    body: wordleBotCommands
})
.then(() => console.log("Successfully registered commands"))
.catch((err) => console.log(err));
