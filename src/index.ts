import { Client, Intents } from 'discord.js';
import { VERSION } from './version';
import { Kevin } from './core/kevin';
import { ModLoader } from './core/modloader';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.on('ready', () => {
    if (!client.user) return;

    console.log(`LexBot v${VERSION} logged in as ${client.user.tag}!`);
    new Kevin(client, '?');
    new ModLoader(client);
});


client.login(process.env.TOKEN);
