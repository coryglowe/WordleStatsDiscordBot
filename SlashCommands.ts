// Only run this file to register commands
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9"
import { token } from "./src/Configs/discord-config.json";

import { SlashCommandBuilder } from "@discordjs/builders";

const commands = [];

const wordleBotCommands = [
    new SlashCommandBuilder()
        .setName("wstats")
        .setDescription("View your / another person's wordle statistics")
        .addStringOption(user => user
            .setName("User")
            .setRequired(false)
            .setDescription("@ a user to view their stats")),

    new SlashCommandBuilder()
            .setName("wregister")
            .setDescription("Register your discord for Wordle tracking"),

    new SlashCommandBuilder()
            .setName("wstreak")
            .setDescription("View your / another person's Wordle streak")
            .addStringOption(user => user
                .setName("User")
                .setRequired(false)
                .setDescription("@ a user to view their current streak"))
]
