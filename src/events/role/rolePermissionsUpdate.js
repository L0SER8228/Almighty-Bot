const DJS = require("discord.js");

module.exports = {
  name: "rolePermissionsUpdate",
  async execute(bot, role, oldPermissions, newPermissions) {
    try {
      if (!role.guild?.available) return;
      if (!role.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(role.guild);
      if (!webhook) return;


      const embed = bot.say.logEmbed("ORANGE")
        .setAuthor("Role Permissions Updated")
        .setTitle(`${role.name}`)
        .setDescription(`${oldPermissions} ➔ ${newPermissions}`)
        .setFooter(`Id: ${role.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};