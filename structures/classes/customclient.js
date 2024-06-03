const { developerIds, clientToken } = require('../../lib/configuration.json');
const { Client, Collection } = require('discord.js');

class CustomClient extends Client {
  MessageCommands = new Collection();
  SlashCommands = new Collection();

  Icon = require('../../lib/plugins/design/icons.js').Icon;
  Developer = developerIds;

  start() {
    this.login(clientToken)
  }
}

module.exports = { CustomClient };
