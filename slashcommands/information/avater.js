const { ApplicationCommandType } = require('discord.js');
/** @type {import('../../lib/types/index.ts').SlashCommandsData} */

module.exports = {
  data: {
    type: ApplicationCommandType.User,
    name: 'Avater',
    dmPermission: false,
  },

  others: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'],
    devOnly: false,
  },

  script: async ({ client, interaction }) => {
    const target = await interaction.guild.members.fetch(interaction.targetId);
    return interaction.reply({ content: target.displayAvatarURL({ extension: 'png', size: 4096 }), ephemeral: true });
  }
}