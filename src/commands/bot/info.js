const { supportServer, inviteLink } = require("../../../config.json");
const { version: djsVersion, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  commandName: "bot",
  name: "info",
  description: "Shows info about the bot",
  category: "misc",
  async execute(bot, interaction) {
    const util = bot.utils;
    const uptime = util.formatDuration(bot.uptime);
    const createdAt = new Date(bot.user.createdAt);
    const users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor(`${bot.user.username}’s Information`, bot.user.displayAvatarURL())
      .addField("__**General Info**__",
        `**Bot Id:** ${bot.user.id}
**Bot Tag:** ${bot.user.tag}
**Created At :** ${createdAt.toDateString()}
**Developer: [L0SER#8228](https:\/\/l0ser.is-a.dev)**
**Prefix:** \/`
      )
      .addField("__**Bot Stats**__",
        `**Users:** ${util.formatNumber(users)}
**Servers:** ${util.formatNumber(bot.guilds.cache.size)}
**Channels:** ${util.formatNumber(bot.channels.cache.size)}
**Command Count:** ${util.formatNumber(bot.commands.size)}`
      )
      .addField("__**System Info**__",
        `**RAM Usage:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
**Bot Uptime:** ${uptime}
**Node Version:** ${process.version}
**Discord.js Version:** ${djsVersion}
**Platform:** ${util.toCapitalize(process.platform)}`
      );

    const supportBtn = new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL(`${supportServer}`);

    const inviteBtn = new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(`${inviteLink}`);

    const buttonRow = new MessageActionRow().addComponents([supportBtn, inviteBtn]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [buttonRow] });
  }
};