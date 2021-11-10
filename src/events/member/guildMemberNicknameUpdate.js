const DJS = require("discord.js");

module.exports = {
  name: "guildMemberNicknameUpdate",
  async execute(bot, member, oldNick, newNick) {
    try {
      if (!member.guild?.available) return;
      if (!member.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(member.guild);
      if (!webhook) return;

      const oldNickname = oldNick || "`None`";
      const newNickname = newNick || "`None`";

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("ORANGE")
        .setTitle("Member Nickname Updated")
        .setAuthor(`${member.user.tag}`, avatar)
        .setDescription(`${oldNickname} ➔ ${newNickname}`)
        .setFooter(`Id: ${member.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};