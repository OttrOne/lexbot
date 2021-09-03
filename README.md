[![GitHub license](https://badgen.net/github/license/ottrone/lexbot)](LICENSE)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)
[![GitHub open issues](https://badgen.net/github/open-issues/ottrone/lexbot)](https://github.com/OttrOne/lexbot/issues)

# LexBot
A port of the LexBot Discord bot template to discord.js v13 and TypeScript.

## Setup
1. Install all dependencies via `npm install` after cloning the repo.

1. Rename the `example.env` file to `.env` and add your Discord bot token.
```
TOKEN=
DEBUG=True
```
`.env` is part of the `.gitignore` file so changes won't be committed.

**Production environment:** remove the `DEBUG` line in the `.env`

## npm Commands
| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `npm run prebuild`  | Extract version from package.json.      |
| `npm run build`     | Build the typescript code.              |
| `npm run lint`      | Runs the linter on the code.            |
| `npm run start`     | Runs the bot from the built JavaScript. |
| `npm run debug`     | Debug the TypeScript in watch mode.     |


## Adding new commands
To add new commands add a `.ts` file in `/commands/` or any subdirectory of `/commands/`.
The command implements the `Command` interface with the following required properties:
```javascript
export = {
    name: '',
    category: '',
    description: '',
    run: ({  }: CallbackOptions) => {
        // do stuff
    }
} as Command;
```
Check the `CallbackOptions` interface for possible properties.
`member` is available for every `CommandType`. `message` and `args` are only available for `NORMAL` commands aka `!command`s while `interaction` is only available for `SLASH` commands.

**Its mandatory to define the type if it's supposed to be `SLASH` command only**

Example:
```javascript
import { Command, CommandType } from '../interfaces/command';
import { CallbackOptions } from '../interfaces/CallbackOptions';

export = {
    name: 'ping',
    type: CommandType.SLASH,
    category: 'LexBot',
    description: 'Sends back pong',
    run: ({ interaction }: CallbackOptions) => {

        if (!interaction) return;
        interaction.reply('Pong!');
    },
} as Command;
```
Is the `type` set to `SLASH` or `BOTH` it will be added dynamically to the Discord command list. (Remember to set up a proper `run` function for it)

## Writing a mod
*(coming soon)*
