import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/command";
import { VERSION } from "../version";

export = {
    name: 'version',
    category: 'LexBot',
    description: 'Version of the bot.',
    maxArgs: 0,
    slashcommand: new SlashCommandBuilder().setName('version'),
    run: async (message, args, text) => {

        const numGuilds = message.client.guilds.cache.size;
        message.reply(`LexBot version \`${VERSION}\` by AlexOttr, running on ${numGuilds} Server${numGuilds > 1 ? 's' : ''}.`);
    }
} as Command;
