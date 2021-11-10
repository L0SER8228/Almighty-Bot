const DJS = require("discord.js");

module.exports = {
  name: "emojiCreate",
  async execute(bot, emoji) {
    try {
      if (!emoji.guild?.available) return;
      if (!emoji.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(emoji.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("GREEN")
        .setTitle("Emoji Created")
        .setAuthor(`${emoji.name}`, `${emoji.url}`)
        .setDescription(
          `**Name**: ${emoji.name}
          **Id**: ${emoji.id}
          **Created by**: ${emoji.author.tag}
          [Preview url](${emoji.url})
        `);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};