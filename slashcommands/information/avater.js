const { ApplicationCommandType } = require('discord.js');
/** @type {import('../../lib/types/index.ts').SlashCommands} */

module.exports = {
  type: ApplicationCommandType.User,
  name: 'Avater',

  dmPermission: false,
  Perms: {
    BotPermissions: ['SendMessages'], UserPermissions: ['SendMessages'],
    devOnly: false,
  },

  callback: async ({ client, interaction }) => {
    const target = await interaction.guild.members.fetch(interaction.targetId);
    return interaction.reply({ content: target.displayAvatarURL({ extension: 'png', size: 4096 }) });
  }
}