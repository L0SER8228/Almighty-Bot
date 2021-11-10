const DJS = require("discord.js");

module.exports = {
  name: "channelCreate",
  async execute(bot, channel) {
    try {
      if (!channel.guild?.available) return;
      if (!channel.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(channel.guild);
      if (!webhook) return;

      const type = channel.type === "GUILD_CATEGORY" ? "Category" : "Channel";

      const embed = bot.say.logEmbed("GREEN")
        .setTitle(`${type} Created`)
        .setDescription(
          `**Name**: ${channel.name}
          **Id**: ${channel.id}
          **Type**: ${channel.type}
        `);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};