const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require('discord.js');
const { CustomClient } = require('../../structures/classes/customclient.js');
/** @type {import('../../lib/types/index.d.ts').CommandExport} */

module.exports = {
  type: ApplicationCommandType.User,
  name: 'Avater',

  dm_permission: false,
  Perms: {
    BotPermissions: ['SendMessages'],
    UserPermissions: ['SendMessages'],
    devOnly: false,
  },

  /**
   * @param {ContextMenuCommandInteraction} interaction;
   * @param {CustomClient} client;
   */

  callback: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const target = await interaction.guild.members.fetch(interaction.targetId);
    return interaction.followUp({
      content: target.displayAvatarURL({ extension: 'png', size: 4096 }),
    });
  },
};
