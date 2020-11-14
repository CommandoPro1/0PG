import { Client } from 'discord.js';
import config from './config.json';
import { CommandHandler } from './handlers/command-handler.js';
import Deps from './utils/deps.js';

const bot = new Client();
const handler = Deps.get(CommandHandler);

handler.init();

bot.on('ready', () => console.log('Bot is ready!'));
bot.on('message', async (msg) => {
  if (msg.author.bot) return;

  await handler.handle(msg);
});

bot.login(config.token);
