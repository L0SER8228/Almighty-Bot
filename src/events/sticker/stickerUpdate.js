const DJS = require("discord.js");

module.exports = {
  name: "stickerUpdate",
  async execute(bot, oldSticker, newSticker) {
    try {
      if (!newSticker.guild?.available) return;
      if (!newSticker.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const sticker = newSticker;

      const webhook = await bot.utils.getLogHook(sticker.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${sticker.name}`, `${sticker.url}`)
        .setFooter(`Id: ${sticker.id}`);

      if (oldSticker.name !== newSticker.name) {
        embed
          .setTitle("Sticker Renamed")
          .setDescription(`${oldSticker.name} ➔ ${newSticker.name}`);
      } else if (oldSticker?.description !== newSticker?.description) {
        embed
          .setTitle("Sticker Description Updated")
          .setDescription(
            `${oldSticker?.description ?? "None"} ➔ ${newSticker?.description ?? "None"}`
          );
      } else if (oldSticker?.tags.every(v, i) !== newSticker?.tags[i]) {
        embed
          .setTitle("Sticker Tags Updated")
          .setDescription(
            `${oldSticker?.tags.join(", ") ?? "None"} ➔ ${newSticker?.tags.join(", ") ?? "None"}`
            );
      } else {
        return;
      }

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
}