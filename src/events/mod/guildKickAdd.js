const DJS = require("discord.js");

module.exports = {
  name: "guildKickAdd",
  async execute(bot, kick) {
    try {
      if (!kick.guild?.available) return;
      if (!kick.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(kick.guild);
      if (!webhook) return;
      
      const avatar = kick.user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("RED")
        .setAuthor(`${kick.user.tag}`, avatar)
        .setTitle("Member Kicked")
        .setDescription(
          `${kick.user.tag} was **kicked** by ${kick.executor.tag}.
          Reason: \`${kick.reason}\`
          `)
        .setFooter(`Id: ${kick.user.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};