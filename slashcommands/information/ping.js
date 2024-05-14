const { ApplicationCommandType } = require('discord.js');
/** @type {import('../../lib/types/index.ts').SLASH} */

module.exports = {
  type: ApplicationCommandType.ChatInput,
  name: 'ping',
  description: 'Get information about the bot.',

  dmPermission: false,
  perms: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'],
    devOnly: false,
  },

  callback: async ({ client, interaction }) => {
    return interaction.reply({ content: `Ping: **${client.ws.ping} ms**` });
  }
}