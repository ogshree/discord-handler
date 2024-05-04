const { developerIds, clientToken, databaseToken } = require('../../lib/configuration.json');
const { logger } = require('../../lib/functions/common.js');
const { Client, Collection } = require('discord.js');
const { connect, set } = require('mongoose');

class CustomClient extends Client {
  MessageCommands = new Collection();
  SlashCommands = new Collection();
  Icon = require('../../lib/plugins/design/icons.js').Icon;
  Developer = developerIds;

  start() {
    if (!databaseToken) {
      logger.Warn('database', `No Mongoose Url`);
      return process.exit();
    }

    this.login(clientToken).then(() => {
      set('strictQuery', true);
      connect(databaseToken)
        .then((data) => { logger.Info('database', `Connected to: ${data.connection.name}`); })
        .catch((err) => { logger.Warn('database', `Mongose Connect Error.`); });
    });
  }
}

module.exports = { CustomClient };
