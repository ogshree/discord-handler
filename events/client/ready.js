const delay = require('node:timers/promises').setTimeout;
const { Events, ActivityType } = require('discord.js');
const { loadMessages, loadSlashCommands } = require('../../lib/functions/application-ecs-loader.js');
const { logger } = require('../../lib/functions/common.js');
const { CustomClient } = require('../../structures/classes/customclient.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  /** 
   * @param {CustomClient} client;
   */

  callback: async (client) => {
    await loadMessages(client);
    await delay(2000); loadSlashCommands(client);
    await delay(1000); logger.Info('Client', `${client.user.tag} Is Online!`)

    client.user.setActivity({ name: `/help`, type: ActivityType.Competing })
  }
}