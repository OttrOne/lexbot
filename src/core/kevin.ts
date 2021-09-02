import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import { Client, Permissions } from 'discord.js';
import { Command } from '../interfaces/command'

/**
 *  Command handler to autoload commands
 *
 * @author AlexOttr <alex@ottr.one>
 * @version 1.0
 *
 * @exports Kevin
 */
export class Kevin {

    private commands: Map<string,Command>;
    private client: Client;
    private prefix: string;

    /**
     * Create a new Kevin command handler instance
     * @param {Client} client Bot client instance
     * @param {string} prefix Command prefix, defaults to '!'
     */
    constructor(client: Client, prefix: string = '!') {

        this.commands = new Map<string, Command>();
        this.client = client;
        this.prefix = prefix;

        try {
            console.log(`${this._load('../commands/')} commands loaded.`)
        } catch(error) {
            console.log(`No commands loaded.`)
            return;
        }
        this._listen()
    }

    /**
     * Recursive inner function to call the commands from the given directory
     * @param {string} dir directory to load from
     * @returns {number} sum of loaded commands
     */
    _load(dir: string) : number {

        let count = 0;
        // recursively read directory for commands
        const files = readdirSync(join(__dirname, dir))
        for(const file of files) {
            const stat = lstatSync(join(__dirname, dir, file))
            if (stat.isDirectory()) {
                count += this._load(join(dir, file))
            } else {
                const command = require(join(__dirname, dir, file))
                // call the command
                this._register(command)
                ++count;
            }
        }
        return count
    }

    /**
     * Add the loaded command with given options to the command map
     * @param {Command} command to register
     */
    _register(command: Command) {

        if(command.permissions) {
            for(const permission of command.permissions) {
                if(!Permissions.FLAGS.hasOwnProperty(permission))
                    return;
            }
        }
        this.commands.set(command.name, command)
    }

    _listen() {
        this.client.on('messageCreate', message => {

            const { member, content, guild } = message;
            if(member === null) return;
            if(guild === null) return;
            if(!content.startsWith(this.prefix)) return;
            // split command on spaces
            const args = content.split(/[ ]+/)
            if(args === undefined) return;

            // get the command name
            const cmd = args.shift()!.toLowerCase().replace(this.prefix, '');

            let command: Command = {
                name: '',
                category: '',
                description: '',
                expectedArgs: '',
                run: () => {}
            };

            this.commands.forEach((eeeee) => {

                if(eeeee.name === cmd || eeeee.aliases?.includes(cmd)) {
                    command = eeeee;
                    return;
                }
            })
            if(command.name === '') return; // command not found

            const { permissions, roles, minArgs, maxArgs, expectedArgs } = command;

            // check permissions
            if(permissions) {

                // convert PermissionStrings to Strings
                const userPermissions = member.permissions.toArray().map(p => `${p}`)

                for(const permission of permissions) {
                    if(!userPermissions.includes(permission)) {
                        message.reply(`You must have the "${permission}" permission to use this command.`);
                        return;
                    }

                }

            }
            // check roles
            if(roles) {

                for(const roleName of roles) {
                    const role = guild.roles.cache.find(role => role.name === roleName)
                    if( (!role || !member.roles.cache.has(role.id)) && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                        message.reply(`You must have the "${roleName}" role to use this command.`);
                        return;
                    }
                }
            }

            // check number of arguments
            if ((minArgs !== undefined && args.length < minArgs) || (maxArgs  !== undefined && args.length > maxArgs)) {
                message.reply(`Incorrect usage! Use \`${this.prefix}${`${cmd} ${expectedArgs || ''}`.trimEnd()}\``)
                return;
            }

            // handle command
            command.run(message, args, args.join(' '))
        })

        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            if (interaction.commandName === 'version') {
                await interaction.reply({ content: 'Pong!', ephemeral: true });
            }
        });
    }
}
