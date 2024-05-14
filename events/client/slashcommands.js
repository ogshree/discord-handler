const { Events, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { CustomClient } = require('../../structures/classes/customclient.js');

module.exports = {
    name: Events.InteractionCreate,

    /** 
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client 
     */

    callback: async (client, interaction) => {

        if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand() && !interaction.isAutocomplete()) return;
        const { user, guild, commandName, member } = interaction;

        if (!guild) return;
        const command = client.SlashCommands.get(commandName);
        const embed = new EmbedBuilder().setColor('Red')

        if (!command) {
            return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} This commands doest't exist!`)], ephemeral: true }) && client.SlashCommands.delete(commandName);
        }

        if (command.perms.userPermissions && command.perms.userPermissions.length !== 0)
            if (!member.permissions.has(command.perms.userPermissions)) return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} You need \`${command.perms.userPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });


        if (command.perms.botPermissions && command.perms.botPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.perms.botPermissions)) return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} I need \`${command.perms.botPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });


        if (command.perms.devOnly && !client.Developer.includes(user.id)) return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} Warning! Access Restricted Developer Command Detected.`)], ephemeral: true });

        command.callback({ client, interaction });
    }
}