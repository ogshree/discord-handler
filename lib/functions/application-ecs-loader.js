const { loadFiles } = require('./fileloader.js');
const { ApplicationCommandType, Events } = require('discord.js');
const { ChatInput, User, Message } = ApplicationCommandType;
const { logger, print } = require('../functions/common.js');

async function loadEvents(client) {
  console.log(
    print.underscore(`\n✎ ᴇᴠᴇɴᴛ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`.padEnd(80) + '.')
  );

  const files = await loadFiles('events');
  const allEvents = Object.values(Events);

  files.forEach((file) => {
    const event = require(file);

    if (!event.name || !allEvents.includes(event.name)) {
      logger.Warn(file, `Event Name is either invalid or missing. Please provide a valid name.`);
      return;
    }

    if (typeof event.callback !== 'function') {
      logger.Warn(file, `Please provide a valid callback function.`);
      return;
    }

    if (event.once)
      client.once(event.name, (...args) => event.callback(client, ...args));
    else client.on(event.name, (...args) => event.callback(client, ...args));

    logger.Info(event.name, `Successfully Loaded.`);
  });
}

async function loadMessages(client) {
  console.log(
    print.underscore(`\n✎ ᴍᴇssᴀɢᴇ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`.padEnd(80) + '.')
  );

  const files = await loadFiles('commands');
  await client.MessageCommands.clear();

  files.forEach((file) => {
    const command = require(file);

    if (!command.name) {
      logger.Warn(file, `Missing command name, please provide command name.`);
      return;
    } 

    if (
      !command.aliases ||
      command.aliases.length == 0 ||
      (command.aliases && command.aliases.some((alias) => alias === ''))
    ) {
      logger.Warn(file, `Missing command aliases. Please provide a valid command aliases to proceed.`);
      return;
    }

    client.MessageCommands.set(command.name, command);
    logger.Info(command.name, `Successfully Loaded.`);
  });
}

async function loadSlashCommands(client) {
  console.log(
    print.underscore(`\n✎ sʟᴀsʜ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`.padEnd(80) + '.')
  );

  const files = await loadFiles('slashcommands');
  await client.SlashCommands.clear();

  let CommandsArray = [];

  files.forEach((file) => {
    const command = require(file);

    if (!command.name) {
      logger.Warn(file, 'Missing command name. Please provide a valid command to proceed.');
      return;
    }

    if ([ChatInput].includes(command.type)) {
      if (!command.description) return logger.Warn(file, 'A command requires a description. Please provide a description for your commands name.');
    }

    if ([User, Message].includes(command.type)) {
      if (command.description) return logger.Warn(file, 'Context commands do not support descriptions.');
    }

    if (typeof command.callback !== 'function') {
      logger.Warn(file, `Please provide a valid callback function.`);
      return;
    }

    client.SlashCommands.set(command.name, command);
    const { Perms, callback, ...commandWithoutExtras } = command;
    
    CommandsArray.push(commandWithoutExtras);

    logger.Info(command.name, `Successfully Loaded.`);
  });

  client.application.commands.set(CommandsArray);
}

module.exports = {
  loadEvents,
  loadMessages,
  loadSlashCommands,
};

