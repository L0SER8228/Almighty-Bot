const DJS = require("discord.js");
const { CanvasSenpai } = require("canvas-senpai")
const canvas = new CanvasSenpai();

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

      const card = await canvas.welcome(member, { link: "https://wallpapercave.com/wp/wp2563380.jpg" })

      const attachment = new DJS.MessageAttachment( card, "goodbye-card.png" );

      await channel.send({
        content: `${member.toString()}, just left us.`,
        files: [attachment]
      });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};
