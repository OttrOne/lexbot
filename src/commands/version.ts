import { Command, CommandType } from "../interfaces/command";
import { VERSION } from "../version";

const generateReplyText = (numGuilds: number) => {
    return `LexBot version \`${VERSION}\` by AlexOttr, running on ${numGuilds} Server${numGuilds > 1 ? 's' : ''}.`;
}

export = {
    name: 'version',
    type: CommandType.BOTH,
    category: 'LexBot',
    description: 'Version of the bot.',
    maxArgs: 0,
    run: async ({message, interaction}) => {

        if(message) {
            const numGuilds = message.client.guilds.cache.size;
            message.reply(generateReplyText(numGuilds));

        } else if(interaction) { // slash command
            if(!interaction.channel) return;
            const numGuilds = interaction.channel.client.guilds.cache.size;
            interaction.reply(generateReplyText(numGuilds));
        }
    }
} as Command;
