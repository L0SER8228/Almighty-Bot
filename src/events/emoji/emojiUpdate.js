const DJS = require("discord.js");

module.exports = {
  name: "emojiUpdate",
  async execute(bot, oldEmoji, newEmoji) {
    try {
      if (!newEmoji.guild?.available) return;
      if (!newEmoji.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const emoji = newEmoji;

      const webhook = await bot.utils.getLogHook(emoji.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${emoji.name}`, `${emoji.url}`)
        .setFooter(`Id: ${emoji.id}`);

      if (oldEmoji.name !== newEmoji.name) {
        embed
          .setTitle("Emoji Renamed")
          .setDescription(`${oldEmoji.name} ➔ ${newEmoji.name}`);
      } else {
        return;
      }

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
}