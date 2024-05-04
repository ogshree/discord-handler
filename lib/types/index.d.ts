import { PermissionFlagsBits } from 'discord.js';

type Permission = keyof typeof PermissionFlagsBits;

interface CommandPerms {
  BotPermissions:  Permission[], UserPermissions: Permission[], 
  devOnly?: boolean
};

type executeType = (client: import('../../structures/classes/customclient.js').CustomClient, interaction: import('discord.js').CommandInteraction) => Promise<any>;

interface optionsType {
  type: number, // ApplicationCommandOptionType 
  required?: boolean,
  name: string,
  description: string,
  channelTypes?: number[], // [ChannelType.<>]
  autocomplete?: boolean,
  choices?: { name: string, value: string }[],
  maxValue?: number, minValue?: number,
};

interface CommandExportType {
  type?: number, // ApplicationCommandType 
  name: string, aliases?: string[],
  description?: string,
  localizations?: { name: string[], description: string[] }[],
  options: optionsType[],
  dm_permission?: boolean,
  Perms: CommandPerms,
  callback: executeType
};

export type CommandExport = CommandExportType;