const DJS = require("discord.js");

module.exports = {
  name: "guildBannerAdd",
  async execute(bot, guild, banner) {
    try {
      if (!guild?.available) return;
      if (!guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("GREEN")
        .setAuthor(`${guild.name}`, `${guild.iconURL ?? bot.user.displayAvatarURL}`)
        .setTitle("Guild Banner Add")
        .setDescription(`**${guild.name}** added the banner.`)
        .setImage(`${banner}`)
        .setFooter(`Id: ${guild.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};