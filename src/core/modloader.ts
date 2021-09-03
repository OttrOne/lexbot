import { readdirSync, lstatSync } from 'fs';
import { Client } from 'discord.js';
import { join } from 'path';

/**
 *  Mod loader to autoload mods (extensions that rely on client instance)
 *
 * @author AlexOttr <alex@ottr.one>
 * @version 1.1
 *
 * @exports ModLoader
 */
export class ModLoader {

    private client: Client;
    /**
     * Create a new ModLoader instance
     * @param {Client} client Discord client instance
     */
    constructor(client: Client) {

        this.client = client;
        try {
            console.log(`${this._load('../mods/')} mods loaded.`);
        }
        catch (error) {
            console.log('No mods loaded.');
        }
    }

    /**
     * Recursive inner function to call the mods from the given directory
     * @param {string} dir
     * @returns {number} sum of loaded mods
     */
    _load(dir: string) : number {
        let count = 0;
        const files = readdirSync(join(__dirname, dir));
        for (const file of files) {
            const stat = lstatSync(join(__dirname, dir, file));
            if (stat.isDirectory()) {
                count += this._load(join(dir, file));
            }
            else {
                const mod = require(join(__dirname, dir, file));
                mod(this.client);
                ++count;
            }
        }
        return count;
    }
}
