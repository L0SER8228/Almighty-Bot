module.exports = {
  commandName: "server",
  name: "banner",
  description: "View the banner of the server",
  category: "utility",
  execute(bot, interaction) {
    const banner = interaction.guild?.bannerURL({ dynamic: true, size: 4096 });

    if (!banner)
      return bot.say.worngMessage(interaction, "This guild have not set any icon yet.");

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Click here to download.](${banner})`)
      .setImage(`${banner}`);

    return interaction.reply({ embeds: [embed] });
  }
};