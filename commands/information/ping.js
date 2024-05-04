const { CustomClient } = require('../../structures/classes/customclient.js');
const { Message } = require('discord.js');
/** @type {import('../../lib/types/index.d.ts').CommandExport} */

module.exports = {
  name: 'ping',
  aliases: ['ms', 'ws'],
  description: 'Get info about bot',

  Perms: {
    BotPermissions: ['SendMessages'], UserPermissions: ['SendMessages'],
    devOnly: true,
  },

  /**
   * @param {CustomClient} client;
   * @param {Message} message;
   * @param {String[]} args;
   */

  callback: async (client, message, args) => {
    return message.reply({ content: `Ping: **${client.ws.ping} ms**` });
  },
};
