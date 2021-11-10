const DJS = require("discord.js");

module.exports = {
  name: "stageInstanceUpdate",
  async execute(bot, oldStageInstance, newStageInstance) {
    try {
      if (!newStageInstance.guild?.available) return;
      if (!newStageInstance.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const stage = newStageInstance;

      const webhook = await bot.utils.getLogHook(stageInstance.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("ORANGE")
      .setAuthor(`${stageInstance.channel.name}`)
      .setFooter(`Id: ${stageInstance.id}`);

      if (oldStageInstance.topic !== newStageInstance.topic) {
        embed
          .setTitle("Stage Topic Updated")
          .setDescription(
            `${oldStageInstance.topic} ➔ ${newStageInstance.topic}`
            );
      } else if (oldStageInstance.privacyLevel !== newStageInstance.privacyLevel) {
        embed
          .setTitle("Stage Permission Updated")
          .setDescription(
            `${oldStageInstance.privacyLevel} ➔ ${newStageInstance.privacyLevel}`
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