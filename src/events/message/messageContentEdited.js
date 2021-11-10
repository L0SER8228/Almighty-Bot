const DJS = require("discord.js");

module.exports = {
  name: "messageContentEdited",
  async execute(bot, message, oldContent, newContent) {
    try {
      if (!message.guild?.available) return;
      if (!message.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(message.guild);
      if (!webhook) return;
      const guild = await bot.utils.getGuild(message.guild.id);
      if (!guild) return;

      if (!oldContent || !newContent) {
        return;
      }
      if (message.author?.id === bot.user?.id) return;
      if (oldContent === newContent) return;

      const pOldMsg = oldContent.length > 1024 ? `${oldContent.slice(0, 1010)}...` : oldContent;
      const PNewMsg = newContent.length > 1024 ? `${newContent.slice(0, 1010)}...` : newContent;

      const messageLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;

      const avatar = message.author.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor(`${message.author.tag}`, avatar)
        .setTitle(`Message edited in ${message.channel.toString()}`)
        .setDescription(
          `Message sent by **${
            message.author?.tag || message.author?.id || "Unknown"
          }** was edited [jump to message](${messageLink})`,
        )
        .addField("Old Message", `${pOldMsg}`)
        .addField("New Message", `${PNewMsg}`)
        .setFooter(`Author: ${message.author.id} | Id: ${message.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
}