const DJS = require("discord.js");

module.exports = {
  name: "stageInstanceCreate",
  async execute(bot, stageInstance) {
    try {
      if (!stageInstance.guild?.available) return;
      if (!stageInstance.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(stageInstance.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("GREEN")
        .setTitle("Stage Instance Created")
        .setDescription(
          `**Channel**: ${stageInstance.channel.name}
          **Id**: ${stageInstance.id}
          **Topic**: ${stageInstance.topic}
          **Privacy Level**: ${stageInstance.privacyLevel}
        `);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};