const DJS = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    try {
      if (!member?.guild) return;
      if (!member.guild.available) return;

      const guild = member.guild;
      const guildDB = await bot.utils.getGuild(guild.id);

      const goodbyeChannel = guildDB.goodbye_channel;
      if (!goodbyeChannel) return;

      const channel = guild.channels.cache.get(goodbyeChannel ?? "");
      if (!channel) return;

      if (!channel.permissionsFor(guild.me)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)) return;

      const embed = bot.say.baseEmbed("RED")
        .setTitle(`${member.user.tag}`)
        .setThumbnail(`${member.displayAvatarURL({ dynamic: true })}`);

      await channel.send({
        content: `${member.toString()}, just left us.`,
        embeds: [embed]
      });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};