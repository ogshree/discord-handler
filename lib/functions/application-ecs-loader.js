const { loadFiles } = require('./fileloader.js');
const { ApplicationCommandType, Events } = require('discord.js');
const { ChatInput, User, Message } = ApplicationCommandType;
const { logger, print } = require('../functions/common.js');

exports.loadEvents = async function (client) {
  console.log(print.underscore(`\n✎ ᴇᴠᴇɴᴛ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`.padEnd(80) + '.'));

  const files = await loadFiles('events');
  const validEvents = Object.values(Events);

  for (const file of files) {
    const event = require(file);

    if (!event.name || !validEvents.includes(event.name)) {
      logger.Warn(file, `Event Name is either invalid or missing. Please provide a valid name.`);
      continue;
    }

    if (typeof event.script !== 'function') {
      logger.Warn(file, `Command does not have a callback function.`);
      continue;
    }

    if (event.once) client.once(event.name, (...args) => event.script(client, ...args));
    else client.on(event.name, (...args) => event.script(client, ...args));

    logger.Info(event.name, `Successfully Loaded.`);
  }
};

exports.loadMessages = async function (client) {
  console.log(print.underscore(`\n✎ ᴍᴇssᴀɢᴇ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`.padEnd(80) + '.'));

  const files = await loadFiles('commands');
  await client.MessageCommands.clear();

  for (const file of files) {
    const command = require(file);

    if (!command.name) {
      logger.Warn(file, `Missing command name, please provide command name.`);
      continue;
    }

    if (
      !command.aliases ||
      command.aliases.length === 0 ||
      (command.aliases && command.aliases.some((alias) => alias === ''))
    ) {
      logger.Warn(file, `Missing command aliases. Please provide a valid command aliases to proceed.`);
      continue;
    }

    if (typeof command.script !== 'function') {
      logger.Warn(file, `Command file ${command.data.name} does not export "script" as a function.`);
      continue;
    }

    client.MessageCommands.set(command.name, command);
    logger.Info(command.name, `Successfully Loaded.`);
  }
};

exports.loadSlashCommands = async function (client) {
  console.log(print.underscore(`\n✎ sʟᴀsʜ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`.padEnd(80) + '.'));

  const files = await loadFiles('slashcommands');
  await client.SlashCommands.clear();

  let CommandsArray = [];

  for (const file of files) {
    const command = require(file);

    if (!command.data) {
      logger.Warn(file, 'Command file does not export "data"\n@example\n data: {  }');
      continue;
    }

    if (!command.data.name) {
      logger.Warn(file, 'Missing command name. Please provide a valid command to proceed.');
      continue;
    }

    if ([ChatInput].includes(command.data.type)) {
      if (!command.data.description) {
        logger.Warn(file, 'A command requires a description. Please provide a description for your commands name.');
        continue;
      }
    }

    if ([User, Message].includes(command.data.type)) {
      if (command.data.description) {
        logger.Warn(file, 'Context commands do not support descriptions.');
        continue;
      }
    }

    if (typeof command.script !== 'function') {
      logger.Warn(file, `Command file ${command.data.name} does not export "script" as a function.`);
      continue;
    }

    client.SlashCommands.set(command.data.name, command);

    CommandsArray.push(command.data);
    logger.Info(command.data.name, `Successfully Loaded.`);
  }

  client.application.commands.set(CommandsArray);
};
