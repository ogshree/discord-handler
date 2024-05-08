import { PermissionFlagsBits } from 'discord.js';

type Permission = keyof typeof PermissionFlagsBits;

interface CommandPerms {
  BotPermissions: Permission[]; UserPermissions: Permission[];
  devOnly?: boolean;
};

interface CommandOptions {
  type: number; /* ApplicationCommandOptionType.<> */
  required?: boolean;
  name: string;
  description: string;
  channelTypes?: number[]; /* [ChannelType.<>] */
  autocomplete?: boolean;
  choices?: { name: string, value: string }[];
  maxValue?: number;
  minValue?: number;
};

interface SlashCommandType {
  type?: number; /* ApplicationCommandType.<> */
  name: string;
  description?: string;
  nsfw?: boolean;
  options: CommandOptions[];
  dmPermission?: boolean;
  defaultMemberPermissions: Permission[];
  minLength?: number;
  maxLength?: number;
  Perms: CommandPerms;
  callback: (parameter: { client: import('../../structures/classes/customclient.js').CustomClient, interaction: import('discord.js').CommandInteraction }) => Promise<any>;
};

interface MessageCommandType {
  name: string;
  aliases?: string[];
  description?: string;
  Perms: CommandPerms;
  callback: (parameter: { client: import('../../structures/classes/customclient.js').CustomClient, message: import('discord.js').Message, args: string[] }) => Promise<any>;
};


export type SlashCommands = SlashCommandType;
export type MessageCommands = MessageCommandType;