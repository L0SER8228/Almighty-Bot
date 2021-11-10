const { supportServer } = require("../../../config.json");

const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    if (!guild) return;
    await bot.utils.addGuild(guild.id);

    try {
      let channel = bot.channels.cache.get(guild.systemChannelId);

      if (!bot.utils.havePermissions(channel))
        channel = guild.channels.cache.find((ch) => bot.utils.havePermissions(ch) && ch.type === "GUILD_TEXT");

      const embed = bot.say.baseEmbed()
        .setAuthor("Thanks for inviting me!", bot.user.displayAvatarURL())
        .setTitle(`My Prefix is **\`\/\`**`)
        .setDescription(`Type \/help for all available commands.`);

      const btnRow = new MessageActionRow().addComponents([
        new MessageButton()
        .setLabel("Support")
        .setStyle("LINK")
        .setURL(`${supportServer}`)
        ]);

      return channel.send({ embeds: [embedW], components: [btnRow] }).catch(console.error);
    } catch {}
  }
};