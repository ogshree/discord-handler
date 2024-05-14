import { PermissionsString } from 'discord.js';


interface CommandPermissionOptions {
  botPermissions: PermissionsString[]; userPermissions: PermissionsString[];
  devOnly?: boolean;
};

interface SubAndGroupCommandOptions {
  type: number; /* ApplicationCommandOptionType.<> */
  required?: boolean; // required (default): false
  name: string;
  description: string;
  channelTypes?: number[]; /* [ChannelType.<>] */
  autocomplete?: boolean;
  choices?: { name: string, value: string }[];
  maxValue?: number;
  minValue?: number;
  minLength?: number;
  maxLength?: number;
};

interface CommandOptions {
  type: number; /* ApplicationCommandOptionType.<> */
  required?: boolean; // required (default): false
  name: string;
  description: string;
  options: SubAndGroupCommandOptions[];
  channelTypes?: number[]; /* [ChannelType.<>] */
  autocomplete?: boolean;
  choices?: { name: string, value: string }[];
  maxValue?: number;
  minValue?: number;
  minLength?: number;
  maxLength?: number;
};

interface SlashCommandsData {
  type?: number; /* ApplicationCommandType.<> */
  name: string;
  description: string;
  nsfw?: boolean;
  options?: CommandOptions[];
  dmPermission?: boolean;
  defaultMemberPermissions?: PermissionsString[];
  perms: CommandPermissionOptions;
  callback: (options: { client: import('../../structures/classes/customclient.js').CustomClient, interaction: import('discord.js').CommandInteraction }) => Promise<any>;
};

interface MessageCommandsData {
  name: string;
  aliases?: string[];
  description?: string;
  perms: CommandPermissionOptions;
  callback: (options: { client: import('../../structures/classes/customclient.js').CustomClient, message: import('discord.js').Message, args: string[] }) => Promise<any>;
};


export type SLASH = SlashCommandsData;
export type MESSAGE = MessageCommandsData;