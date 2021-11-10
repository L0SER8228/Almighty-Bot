const DJS = require("discord.js");

module.exports = {
  name: "stickerCreate",
  async execute(bot, sticker) {
    try {
      if (!sticker.guild?.available) return;
      if (!sticker.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(sticker.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("GREEN")
        .setTitle("Sticker Created")
        .setDescription(
          `${sticker}
          Name: ${sticker.name}
          Id: ${sticker.id}
          Description: ${sticker?.description ?? "No description"}
          Tags: ${sticker?.tags.join(", ") ?? "None"}
          Created by: ${sticker.user.tag}
          [Preview url](${sticker.url})
        `);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};