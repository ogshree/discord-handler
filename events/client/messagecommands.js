const { Events, Message, ChannelType, EmbedBuilder } = require('discord.js');
const { CustomClient } = require('../../structures/classes/customclient.js');
const { clientPrefix } = require('../../lib/configuration.json');

module.exports = {
    name: Events.MessageCreate,

    /** 
     * @param {Message} message 
     * @param {CustomClient} client 
     */

    callback: async (client, message) => {
        const { author, guild, member } = message;

        if (message.channel.type !== ChannelType.GuildText) return;
        const prefix = clientPrefix;

        if (author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = client.MessageCommands.get(cmd.toLowerCase()) || client.MessageCommands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;
        const embed = new EmbedBuilder().setColor('Red')

        if (command.Perms.UserPermissions && command.Perms.UserPermissions.length !== 0)
            if (!member.permissions.has(command.Perms.UserPermissions)) return message.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} You need \`${command.Perms.UserPermissions.join(", ")}\` permission(s) to execute this command!`)] });


        if (command.Perms.BotPermissions && command.Perms.BotPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.Perms.BotPermissions)) return message.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} I need \`${command.Perms.BotPermissions.join(", ")}\` permission(s) to execute this command!`)] });


        if (command.Perms.devOnly && !client.Developer.includes(author.id)) return;

        command.callback({ client, message, args });
    }
}