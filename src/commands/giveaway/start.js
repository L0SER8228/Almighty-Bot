const DJS = require("discord.js");

module.exports = {
  commandName: "giveaway",
  name: "start",
  description: "Start a new giveaway",
  category: "giveaway",
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
  options: [
    {
      type: "STRING",
      name: "time",
      description: "When the giveaway should end",
      required: true
    },
    {
      type: "STRING",
      name: "prize",
      description: "The giveaway prize",
      required: true
    },
    {
      type: "NUMBER",
      name: "winner",
      description: "The amount of people that can win",
      required: true
    }
  ],
  async execute(bot, interaction) {
    const timeString = interaction.options.getString("time", true);
    const prize = interaction.options.getString("prize", true);
    const winner = interaction.options.getNumber("winner", true);

    const duration = bot.utils.parseMilliseconds(timeString);

    if (!duration)
      return bot.say.wrongMessage(interaction, "Provide a valid end time. (i,e. 1h, 2days, 5min)");

    await bot.giveawayManager.start(interaction.channel, {
      duration,
      prize,
      winnerCount: +winner,
      messages: {
        giveaway: "**🎉 New Giveaway 🎉**",
        giveawayEnded: "**Giveaway Ended**"
      }
    });

    return bot.say.successMessage(interaction, "Successfully started the giveaway.");
  }
}