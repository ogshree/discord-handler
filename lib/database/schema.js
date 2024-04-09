const { model, Schema } = require('mongoose');

const testSchema = new Schema(
  {
    guildId: {
      type: String,
      required: true
    },
    guildName: {
      type: String,
      required: true
    },
  }
);

module.exports = model('test', testSchema);
