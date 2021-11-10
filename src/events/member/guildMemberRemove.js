const DJS = require("discord.js");
const canvas = require("canvacord");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    try {
      if (!member?.guild) return;
      if (!member.guild.available) return;

      const guild = member.guild;
      const guildDB = await bot.utils.getGuild(guild.id);

      const goodbyeChannel = guildDB.goodbye_channel;
      if (!goodbyeChannel) return;

      const channel = guild.channels.cache.get(goodbyeChannel ?? "");
      if (!channel) return;

      if (!channel.permissionsFor(guild.me)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)) return;

      const user = member.user;

      let image = await new canvas.Goodbye()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setGuildName(guild.name)
        .setMemberCount(`Now we are ${member.guild.members.cache.size}`)
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setColor("border", "#4D5E94")
        .setColor("username", "#D8BFD8")
        .setColor("discriminator", "#D8BFD8")
        .setColor("member-count", "#D8BFD8")
        .setBackground("https://wallpapercave.com/wp/wp2563380.jpg")
        .toAttachment();

      let attachment = new DJS.MessageAttachment(image.toBuffer(), "goodbye-card.png");

      await channel.send({
        content: `${member.toString()}, just left us.`,
        attachment
      });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};