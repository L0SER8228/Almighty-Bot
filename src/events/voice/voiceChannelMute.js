const DJS = require("discord.js");

module.exports = {
  name: "voiceChannelMute",
  async execute(bot, member, muteType) {
    try {
      if (!member.guild?.available) return;
      if (!member.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(member.guild);
      if (!webhook) return;

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${member.user.tag}`, avatar)
        .setTitle("Voice Mute")
        .setDescription(`${member.toString()} has become voice ${muteType === "self-muted" ? "self muted" : "server muted"}.`)
        .setFooter(`Id: ${member.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};