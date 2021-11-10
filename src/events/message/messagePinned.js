const DJS = require("discord.js");

module.exports = {
  name: "messagePinned",
  async execute(bot, message) {
    try {
      if (!message.guild?.available) return;
      if (!message.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(message.guild);
      if (!webhook) return;
      const guild = await bot.utils.getGuild(message.guild.id);
      if (!guild) return;

      const messageLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;

      const avatar = message.author.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("GREEN")
        .setAuthor(`${message.author.tag}`, avatar)
        .setTitle("Message pinned")
        .setDescription(
          `Message sent by **${
            message.author?.tag || message.author?.id || "Unknown"
          }** was pinned in ${message.channel.toString()}.
          [jump to message](${messageLink})
          `)
        .setFooter(`Author: ${message.author.id} | Id: ${message.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};