const DJS = require("discord.js");

module.exports = {
  name: "guildVanityURLRemove",
  async execute(bot, guild, vanity) {
    try {
      if (!guild?.available) return;
      if (!guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getLogHook(guild);
      if (!webhook) return;

      const embed = bot.say.logEmbed("RED")
        .setAuthor(`${guild.name}`, `${guild.iconURL ?? bot.user.displayAvatarURL}`)
        .setTitle("Guild Vanity URL Remove")
        .setDescription(`**${guild.name}** removed the vanity url ${vanity}`)
        .setFooter(`Id: ${guild.id}`);

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};