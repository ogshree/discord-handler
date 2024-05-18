const { Events, Message, ChannelType, EmbedBuilder } = require('discord.js');
const { CustomClient } = require('../../structures/classes/customclient.js');
const { clientPrefix } = require('../../lib/configuration.json');

module.exports = {
    name: Events.MessageCreate,

    /** 
     * @param {Message} message 
     * @param {CustomClient} client 
     */

    script: async (client, message) => {

        if (message.channel.type !== ChannelType.GuildText) return;

        const { author, guild, member } = message;
        const prefix = clientPrefix;

        if (author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = client.MessageCommands.get(cmd.toLowerCase()) || client.MessageCommands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;
        const embed = new EmbedBuilder().setColor('Red')

        if (command.others.userPermissions && command.others.userPermissions.length !== 0)
            if (!member.permissions.has(command.others.userPermissions)) return message.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} You need \`${command.others.userPermissions.join(", ")}\` permission(s) to execute this command!`)] });


        if (command.others.botPermissions && command.others.botPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.others.botPermissions)) return message.reply({ embeds: [embed.setDescription(`${client.Icon.Static.Wrong} I need \`${command.others.botPermissions.join(", ")}\` permission(s) to execute this command!`)] });


        if (command.others.devOnly && !client.Developer.includes(author.id)) return;

        command.script({ client, message, args });
    }
}