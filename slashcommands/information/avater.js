const { ApplicationCommandType } = require('discord.js');
/** @type {import('../../lib/types/index.ts').SLASH} */

module.exports = {
  type: ApplicationCommandType.User,
  name: 'Avater',

  dmPermission: false,
  perms: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'],
    devOnly: false,
  },

  callback: async ({ client, interaction }) => {
    const target = await interaction.guild.members.fetch(interaction.targetId);
    return interaction.reply({ content: target.displayAvatarURL({ extension: 'png', size: 4096 }), ephemeral: true });
  }
}