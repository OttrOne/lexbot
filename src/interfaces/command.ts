import { SlashCommandBuilder } from "@discordjs/builders";
import { Message } from "discord.js";

export interface Command {

    name: string;
    slashcommand?: SlashCommandBuilder;
    aliases?: Array<string>;
    minArgs?: number;
    maxArgs?: number;
    expectedArgs?: string;
    permissions?: Array<string>;
    roles?: Array<string>;
    category: string;
    description: string;
    run: (message: Message, args: Array<string>, text: string) => void;
}