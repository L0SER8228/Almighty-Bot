const DJS = require("discord.js");

module.exports = {
  name: "purge",
  description: "Delete up to 100 messages within 14 days",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
  options: [
    {
      type: "NUMBER",
      name: "amount",
      description: "The amount of message to be deleted (0-100)",
      required: true
    }
 ],
  async execute(bot, interaction) {
    const amount = interaction.options.getNumber("amount", true);

    if (amount < 1 || amount > 100)
      return bot.say.worngMessage(interaction, "Provide a valid amount between 1 to 100");

    const deleted = interaction.channel.bulkDelete(amount);

    return bot.say.successMessage(interaction, `${deleted.size} messages has been deleted.`, true);
  }
};