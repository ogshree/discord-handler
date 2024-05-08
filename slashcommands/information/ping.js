const { ApplicationCommandType } = require('discord.js');
/** @type {import('../../lib/types/index.ts').SlashCommands} */

module.exports = {
  type: ApplicationCommandType.ChatInput,
  name: 'ping',
  description: 'Get information about the bot.',

  dmPermission: false,
  Perms: {
    BotPermissions: ['SendMessages'], UserPermissions: ['SendMessages'],
    devOnly: false,
  },

  callback: async ({ client, interaction }) => {
    return interaction.reply({ content: `Ping: **${client.ws.ping} ms**` });
  }
}