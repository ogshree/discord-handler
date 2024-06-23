const sleep = require('node:timers/promises').setTimeout;
const appUtil = require('../../lib/functions/application-ecs-loader.js');
const { logger } = require('../../lib/functions/common.js');
const { Events } = require('discord.js');
const { CustomClient } = require('../../structures/classes/customclient.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  /** 
   * @param {CustomClient} client;
   */

  script: async (client) => {
    await appUtil.loadMessages(client); await sleep(2000); appUtil.loadSlashCommands(client);
    logger.Info('Client', `${client.user.tag} Is Online!`)
  }
};