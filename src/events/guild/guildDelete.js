module.exports = {
  name: "guildDelete",
  async execute(bot, guild) {
    if (!guild) return;
    await bot.utils.removeGuild(guild.id);
  }
};