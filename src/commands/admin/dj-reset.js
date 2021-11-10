module.exports = {
  commandName: "config",
  groupName: "dj",
  category: "admin",
  name: "reset",
  description: "Reset music dj role",
  async execute(bot, interaction) {
    const guildId = interaction.guild.id;

    await bot.utils.updateGuild(guildId, {
      dj_role: null
    });

    return bot.say.successMessage(interaction, "Reset the dj role");
  }
};