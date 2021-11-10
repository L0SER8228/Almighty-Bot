module.exports = {
  commandName: "server",
  name: "icon",
  description: "View the icon/logo of the server",
  category: "utility",
  execute(bot, interaction) {
    const icon = interaction.guild?.iconURL({ dynamic: true, size: 4096 });

    if (!icon)
      return bot.say.worngMessage(interaction, "This guild have not set any icon yet.");

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Click here to download.](${icon})`)
      .setImage(`${icon}`);

    return interaction.reply({ embeds: [embed] });
  }
};