const DJS = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(bot, member) {
    try {
      if (!member?.guild) return;
      if (!member.guild.available) return;

      const guild = member.guild;
      const guildDB = await bot.utils.getGuild(guild.id);
      const welcomeRole = guildDB.welcome_role;
      const welcomeChannel = guildDB.welcome_channel;
      if (!welcomeRole && !welcomeChannel) return;

      const channel = guild.channels.cache.get(welcomeChannel ?? "");
      const role = guild.roles.cache.get(welcomeRole ?? "");

      if (!role && !channel) return;

      if (
        !member.pending &&
        !!role &&
        guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_ROLES)
      ) {
        member.roles.add(welcomeRole);
      }

      if (!channel) return;

      if (!channel.permissionsFor(guild.me)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)) return;

      const embed = bot.say.baseEmbed(guild)
        .setTitle(`${member.user.tag}`)
        .setThumbnail(`${member.displayAvatarURL({ dynamic: true })}`);

      await channel.send({
        content: `Hey **${member.toString()}**, Welcome to **${guild.name}**`,
        embeds: [embed]
      });

    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};