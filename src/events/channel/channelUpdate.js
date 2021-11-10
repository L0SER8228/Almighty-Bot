const DJS = require("discord.js");

module.exports = {
  name: "channelUpdate",
  async execute(bot, oldChannel, newChannel) {
    try {
      if (!newChannel.guild?.available) return;
      if (!newChannel.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const channel = newChannel;

      const webhook = await bot.utils.getLogHook(channel.guild);
      if (!webhook) return;

      const type = channel.type === "GUILD_CATEGORY" ? "Category" : "Channel";

      let embed = bot.say.logEmbed("ORANGE")
      .setTitle(`${channel.name}`)
      .setFooter(`Id: ${channel.id}`);

      if (oldChannel.name !== newChannel.name) {
        embed
          .setAuthor(`${type} Renamed`)
          .setDescription(`${oldChannel.name} ➔ ${newChannel.name}`);
      } else if (oldChannel.type !== newChannel.name) {
        embed
          .setAuthor(`${type} Type Updated`)
          .setDescription(`${oldChannel.type} ➔ ${newChannel.type}`);
      } else {
        return;
      }

      await webhook.send({ embeds: [embed] });
    } catch (err) {
     return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
}