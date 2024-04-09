const {
  ApplicationCommandType,
  ChatInputCommandInteraction,
} = require('discord.js');
const { CustomClient } = require('../../structures/classes/customclient.js');

module.exports = {
  type: ApplicationCommandType.ChatInput,
  name: 'help',
  description: 'Get information about the bot.',

  dm_permission: false,
  Perms: {
    BotPermissions: ['SendMessages'],
    UserPermissions: ['SendMessages'],
    devOnly: false,
  },

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {CustomClient} client
   */

  callback: async (client, interaction) => {
    interaction.reply({ content: `Ping: **${client.ws.ping} ms**` });
  },
};
