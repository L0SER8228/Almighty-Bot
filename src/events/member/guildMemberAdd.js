const DJS = require("discord.js");
const canvas = require("canvacord");

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

      const user = member.user;

      let image = await new canvas.Welcome()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setGuildName(guild.name)
        .setMemberCount(guild.memberCount)
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setColor("border", "#4D5E94")
        .setColor("username", "#D8BFD8")
        .setColor("discriminator", "#D8BFD8")
        .setColor("member-count", "#D8BFD8")
        .setBackground("https://wallpapercave.com/wp/wp2563380.jpg")
        .toAttachment();

      let attachment = new DJS.MessageAttachment(image.toBuffer(), "welcome-card.png");

      await channel.send({
        content: `Hey **${member.toString()}**, Welcome to **${guild.name}**`,
        attachment
      });

    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};