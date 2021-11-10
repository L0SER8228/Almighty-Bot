const DJS = require("discord.js");

module.exports = {
  name: "guildChannelTopicUpdate",
  async execute(bot, channel, oldTopic, newTopic) {
    try {
      if (!channel.guild?.available) return;
      if (!channel.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(channel.guild);
      if (!webhook) return;

      const type = channel.type === "GUILD_CATEGORY" ? "Category" : "Channel";

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${type} Topic Updated`)
        .setTitle(`${channel.name}`)
        .setDescription(`${oldTopic} ➔ ${newTopic}`)
        .setFooter(`Id: ${channel.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};