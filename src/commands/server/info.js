module.exports = {
  commandName: "server",
  name: "info",
  description: "Get information about the server",
  category: "utility",
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;

    const roles = bot.utils.formatNumber(guild.roles.cache.size);
    const channels = bot.utils.formatNumber(guild.channels.cache.size);
    const emojis = bot.utils.formatNumber(guild.emojis.cache.size);

    const owner = await guild.fetchOwner();
    const inviteBanner = guild.bannerURL({
      size: 4096,
      format: "png"
    });

    const verLevel = guild.verificationLevel;
    const mfaLevel = guild.mfaLevel;

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${guild.name}`)
      .setDescription(`
**Owner:** ${owner.toString()}
**MFA Level:** ${mfaLevel}
**Varification Level:** ${verLevel}
      `)
      .addField("Stats",
        `
**Roles:** ${roles}
**Channels:** ${channels}
**Emojis:** ${emojis}
**Members:** ${guild.memberCount}
      `);

    if (inviteBanner !== null) {
      embed.setImage(inviteBanner);
    }

    if (guild.icon !== null) {
      embed.setThumbnail(`${guild.iconURL({ format: "png", dynamic: true, size: 1024 })}`);
    }

    return interaction.editReply({ embeds: [embed] });
  }
};