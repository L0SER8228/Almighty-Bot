const DJS = require("discord.js");

module.exports = {
  name: "guildBoostLevelDown",
  async execute(bot, guild, oldLevel, newLevel) {
    try {
      if (!guild?.available) return;
      if (!guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${guild.name}`, `${guild.iconURL ?? bot.user.displayAvatarURL}`)
        .setTitle("Guild Boost Level Down")
        .setDescription(`${oldLevel} ➔ ${newLevel}`)
        .setFooter(`Id: ${guild.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};