const { Message } = require('discord.js');
/** @type {import('../../lib/types/index.ts').MESSAGE} */

module.exports = {
  name: 'ping',
  aliases: ['ms', 'ws'],
  description: 'Get info about bot',

  perms: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'],
    devOnly: true,
  },

  callback: async ({ client, message, args }) => {
    return message.reply({ content: `Ping: **${client.ws.ping} ms**` });
  }
}
