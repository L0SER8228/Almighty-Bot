const DJS = require("discord.js");

module.exports = {
  name: "roleDelete",
  async execute(bot, role) {
    try {
      if (!role.guild?.available) return;
      if (!role.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(role.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("RED")
        .setTitle("Role Deleted")
        .setDescription(
          `**Name** ${role.name}
**Id** ${role.id}`
        );

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};