const DJS = require("discord.js");

module.exports = {
  name: "messageDelete",
  async execute(bot, message) {
    try {
      if (!message.guild?.available) return;
      if (!message.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(message.guild);
      if (!webhook) return;

      if (message.author?.id === bot.user?.id) return;
      if (!message.content) return;

      const avatar = message.author.displayAvatarURL({ dynamic: true });

      const embed = bot.say.logEmbed("RED")
        .setAuthor(`${message.author.tag}`, avatar)
        .setTitle(
          `Message sent by \`${message.author.tag}\` deleted in ${message.channel.toString()}
          `)
        .setDescription(`${message.content}`)
        .setFooter(`Author: ${message.author.id} | Id: ${message.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
}