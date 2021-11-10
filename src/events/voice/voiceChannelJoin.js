const DJS = require("discord.js");

module.exports = {
  name: "voiceChannelJoin",
  async execute(bot, member, channel) {
    try {
      if (!member.guild?.available) return;
      if (!member.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(member.guild);
      if (!webhook) return;

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("GREEN")
        .setAuthor(`${member.user.tag}`, avatar)
        .setDescription(`${member.toString()} has joined voice channel ${channel.toString()}`)
        .setFooter(`Id: ${member.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};
