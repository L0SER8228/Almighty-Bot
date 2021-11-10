const DJS = require("discord.js");

module.exports = {
  name: "guildMuteRemove",
  async execute(bot, mute) {
    try {
      if (!mute.member.guild?.available) return;
      if (!mute.member.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(mute.member.guild);
      if (!webhook) return;

      const { member, executor, reason } = mute;
      const user = mute.member.user;
      const avatar = user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("RED")
        .setAuthor(`${user.tag}`, avatar)
        .setTitle("User muted")
        .setDescription(
          `${user.tag} was **unmuted** by ${executor.tag}.
          Reason: \`${reason}\`
          `)
        .setFooter(`Id: ${user.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};