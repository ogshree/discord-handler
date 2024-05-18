import { PermissionsString, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';

interface AdditionalOptions {
  /**
   * A string or array of permissions that the bot needs to execute the current command.
   *
   * @example
   * botPermissions: 'KickMembers'
   * or
   * botPermissions: ['KickMembers', 'ModerateMembers']
   */
  botPermissions?: PermissionsString | PermissionsString[];
  /**
   * A string or array of permissions that a user needs for the current command to be executed.
   *
   * @example
   * userPermissions: 'KickMembers'
   * or
   * userPermissions: ['KickMembers', 'ModerateMembers']
   */
  userPermissions?: PermissionsString | PermissionsString[];
  /**
   * A boolean value that indicates whether the command is for developer-only registration or not.
   */
  devOnly?: boolean;
};


export interface SlashCommandsData {
  data: RESTPostAPIApplicationCommandsJSONBody,
  others: AdditionalOptions;
  callback: (options: { client: import('../../structures/classes/customclient.js').CustomClient, interaction: import('discord.js').CommandInteraction }) => Promise<any>;
};

export interface MessageCommandsData {
  /**
   * The names that the bot needs to execute the current MessageCommands.
   */
  name: string;
  /**
   * The `aliases` are an array of multiple MessageCommands names set that the bot uses to execute the current command.
   * 
   * @example
   *  aliases: ['ping','ms','ws']
   */
  aliases?: string[];
  /**
   * The name of the `MessageCommands` should ideally be between `1 to 100` characters for optimal readability and efficiency, `only for your understanding`. 
   * However, `you can extend this limit` based on your specific requirements.
   */
  description?: string;
  /**
   * The `example` of how to use MessageCommands shows that you can add multiple commands in a string or an array.
   *  
   * @example
   * example: ['!ban <user> <reason>','!ban <user>']
   */
  example?: string[];
  others: AdditionalOptions;
  callback: (options: { client: import('../../structures/classes/customclient.js').CustomClient, message: import('discord.js').Message, args: string[] }) => Promise<any>;
};

export { };