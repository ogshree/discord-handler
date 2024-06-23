const { Message } = require('discord.js');
/** @type {import('../../lib/types/index.ts').MessageCommandsData} */

module.exports = {
  name: 'ping',
  aliases: ['ms', 'ws'],
  description: 'Get info about bot',
  example: [],

  others: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'], devOnly: true
  },

  script: async ({ client, message, args }) => {
    return message.reply({ content: `Ping: **${client.ws.ping} ms**` });
  }
};
