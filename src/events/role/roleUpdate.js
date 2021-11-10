const DJS = require("discord.js");

module.exports = {
  name: "roleUpdate",
  async execute(bot, oldRole, newRole) {
    try {
      if (!newRole.guild?.available) return;
      if (!newRole.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const role = newRole;

      const webhook = await bot.utils.getLogHook(role.guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("ORANGE")
        .setTitle(`${role.name}`)
        .setFooter(`Id: ${role.id}`);

      if (oldRole.name !== newRole.name) {
        embed
          .setAuthor(`${type} Renamed`)
          .setDescription(`${oldRole.name} ➔ ${newRole.name}`);
      } else if (oldRole.color !== newRole.color) {
        embed
          .setAuthor("Role Color Updated")
          .setDescription(`${getHexColor(oldRole)} ➔ ${getHexColor(newRole)}`);
      } else {
        return;
      }

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};

function getHexColor(role) {
  return "hexColor" in role ? role.hexColor : `#${role.color.toString(16).padStart(6, "0")}`;
}