const DJS = require("discord.js");

module.exports = {
  commandName: "giveaway",
  name: "reroll",
  description: "Re-roll a giveaway",
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

    const reroll = await bot.giveawayManager.reroll(messageId).catch(() => null);

    if (reroll === null)
      return bot.say.worngMessage(interaction, `No giveaway is found with id \`${id}\`.`);

    return bot.say.successMessage(interaction, `Successfully rerolled the giveaway with id \`${id}\`.`);
  }
}
