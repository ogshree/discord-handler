const { CustomClient } = require('./classes/customclient.js');
require('../lib/plugins/crashdefender.js').Shield();
const { loadEvents } = require('../lib/functions/application-ecs-loader.js');
const { GatewayIntentBits, Partials } = require('discord.js');

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates
    ],
    partials: [
        Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember, Partials.Message
    ],
    failIfNotExists: false
});

client.setMaxListeners(0); loadEvents(client); client.start();