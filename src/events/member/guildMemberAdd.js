const DJS = require("discord.js");
const { CanvasSenpai } = require("canvas-senpai")
const canvas = new CanvasSenpai();

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

      const card = await canvas.welcome(member, { link: "https://wallpapercave.com/wp/wp2563380.jpg" })

      const attachment = new DJS.MessageAttachment( card, "welcome-card.png" );

      await channel.send({
        content: `Hey **${member.toString()}**, Welcome to **${guild.name}**`,
        files: [attachment]
      });

    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};
