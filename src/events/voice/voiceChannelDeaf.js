const DJS = require("discord.js");

module.exports = {
  name: "voiceChannelDeaf",
  async execute(bot, member, deafType) {
    try {
      if (!member.guild?.available) return;
      if (!member.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(member.guild);
      if (!webhook) return;

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${member.user.tag}`, avatar)
        .setTitle("Voice Deaf")
        .setDescription(`${member.toString()} has become voice ${deafType === "self-deafed" ? "self deafed" : "server deafed"}.`)
        .setFooter(`Id: ${member.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};