const { ApplicationCommandType } = require('discord.js');
/** @type {import('../../lib/types/index.ts').SlashCommandsData} */

module.exports = {
  data: {
    type: ApplicationCommandType.ChatInput,
    name: 'ping',
    description: 'Get information about the bot.',
    dmPermission: false,
  },

  others: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'],
    devOnly: false,
  },

  script: async ({ client, interaction }) => {
    return interaction.reply({ content: `Ping: **${client.ws.ping} ms**` });
  }
}