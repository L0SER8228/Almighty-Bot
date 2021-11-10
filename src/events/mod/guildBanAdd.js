const DJS = require("discord.js");

module.exports = {
  name: "guildBanAdd",
  async execute(bot, ban) {
    try {
      if (!ban.guild?.available) return;
      if (!ban.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(ban.guild);
      if (!webhook) return;
      
      const avatar = ban.user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("RED")
        .setAuthor(`${ban.user.tag}`, avatar)
        .setTitle("Member Banned")
        .setDescription(
          `${ban.user.tag} was **banned**.
          Reason: \`${ban.reason}\`
          `)
        .setFooter(`Id: ${ban.user.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};