module.exports = {
  commandName: "config",
  groupName: "dj",
  category: "admin",
  name: "mode",
  description: "Toogle music dj mode.",
  async execute(bot, interaction, db) {
    const guildId = interaction.guild.id;
    const djMode = db.dj_mode;

    await bot.utils.updateGuild(guildId, {
      dj_mode: !djMode
    });

    return bot.say.successMessage(interaction, `Turned \`${djMode ? "off" : "on"}\` DJ mode.`);
  }
};