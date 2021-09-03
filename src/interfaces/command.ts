import { CommandInteraction, GuildMember, Message } from "discord.js";
import { CallbackOptions } from './CallbackOptions'

export interface Command {

    name: string;
    type?: CommandType;
    aliases?: Array<string>;
    minArgs?: number;
    maxArgs?: number;
    expectedArgs?: string;
    permissions?: Array<string>;
    roles?: Array<string>;
    category: string;
    description: string;
    run: (args: CallbackOptions) => void;
    slashcommandrun?: (interaction: CommandInteraction, member: GuildMember) => void;
}

export enum CommandType {
    NORMAL,
    SLASH,
    BOTH
}
