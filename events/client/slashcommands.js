const { Events, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { CustomClient } = require('../../structures/classes/customclient.js');

module.exports = {
    name: Events.InteractionCreate,

    /** 
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client 
     */

    callback: async (client, interaction) => {

        if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
        const { user, guild, commandName, member } = interaction;

        if (!guild) return;
        const command = client.SlashCommands.get(commandName);
        const embed = new EmbedBuilder().setColor('Red')

        if (!command) {
            return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} This commands doest't exist!`)], ephemeral: true }) && client.SlashCommands.delete(commandName);
        }

        if (command.Perms.UserPermissions && command.Perms.UserPermissions.length !== 0)
            if (!member.permissions.has(command.Perms.UserPermissions)) return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} You need \`${command.Perms.UserPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });


        if (command.Perms.BotPermissions && command.Perms.BotPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.Perms.BotPermissions)) return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} I need \`${command.Perms.BotPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });


        if (command.Perms.devOnly && !client.Developer.includes(user.id)) return interaction.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} Warning! Access Restricted Developer Command Detected.`)], ephemeral: true });

        command.callback(client, interaction);
    }
}