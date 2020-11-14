import { readdirSync } from 'fs';
import { resolve } from 'path';

export class CommandHandler {
  commands = new Map();

  async init() {
    const commandsDir = resolve('./commands');
    const files = readdirSync(commandsDir);
    
    for (const file of files) {
      const { default: command } = await import(`../commands/${file}`);
      if (!command?.name) continue;
    
      this.commands.set(command.name, command);
    }
  }

  async handle(msg) {
    try {
      const prefix = '.';
      const args = msg.content
        .split(' ')
        .slice(1);
  
      const commandName = msg.content
        .split(' ')[0]
        .slice(prefix.length);
    
      const command = this.commands.get(commandName);
      await command?.execute(msg, ...args);
    } catch (error) {
      await msg.channel.send(`⚠ ${error?.message}`);
    }
  }
}
