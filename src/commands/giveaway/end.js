const DJS = require("discord.js");

module.exports = {
  commandName: "giveaway",
  name: "end",
  description: "Ends a giveaway",
  category: "giveaway",
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
  options: [{
    type: "STRING",
    name: "id",
    description: "The messageId of the giveaway",
    required: true
  }],
  async execute(bot, interaction) {
    const messageId = interaction.options.getString("id", true);

    const deleted = await bot.giveawayManager.delete(messageId).catch(() => null);

    if (deleted === null)
      return bot.say.wrongMessage(interaction, `Giveaway with id \`${id}\` was already ended.`);

    return bot.say.successMessage(interaction, `Successfully ended giveaway with id \`${id}\`.`);
  }
}
