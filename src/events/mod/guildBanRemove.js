const DJS = require("discord.js");

module.exports = {
  name: "guildBanRemove",
  async execute(bot, ban) {
    try {
      if (!ban.guild?.available) return;
      if (!ban.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(ban.guild);
      if (!webhook) return;
      
      const avatar = ban.user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${ban.user.tag}`, avatar)
        .setTitle("Member Unbanned")
        .setDescription(
          `${ban.user.tag} was **unbanned**.
          Reason: \`${ban.reason}\`
          `)
        .setFooter(`Id: ${ban.user.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};