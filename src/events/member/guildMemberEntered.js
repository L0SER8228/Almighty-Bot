const DJS = require("discord.js");

module.exports = {
  name: "guildMemberEntered",
  async execute(bot, member) {
    try {
      if (!member.guild) return;
      if (!member.guild.available) return;

      const guildDB = await bot.utils.getGuild(member.guild.id);
      const welcomeRole = guildDB.welcome_role;
      if (!welcomeRole) return;

      const role = guild.roles.cache.get(welcomeRole);
      if (!role) return;

      // member passed membership screening
      if (member.guild?.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_ROLES)) {
        member.roles.add(welcomeRole);
      }
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};