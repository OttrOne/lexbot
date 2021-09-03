import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/command";
import { VERSION } from "../version";

const generateReplyText = (numGuilds: number) => {
    return `LexBot version \`${VERSION}\` by AlexOttr, running on ${numGuilds} Server${numGuilds > 1 ? 's' : ''}.`;
}

export = {
    name: 'version',
    category: 'LexBot',
    description: 'Version of the bot.',
    maxArgs: 0,
    slashcommand: new SlashCommandBuilder().setName('version').setDescription('Version of the bot.'),
    run: async (message, args, text) => {

        const numGuilds = message.client.guilds.cache.size;
        message.reply(generateReplyText(numGuilds));
    },
    slashcommandrun: (interaction, member) => {
        if(!interaction.channel) return;
        const numGuilds = interaction.channel.client.guilds.cache.size;
        interaction.reply(generateReplyText(numGuilds));
    }
} as Command;
