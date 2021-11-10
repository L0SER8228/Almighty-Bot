module.exports = {
  commandName: "random",
  name: "color",
  description: "Show a random color",
  category: "misc",
  async execute(bot, interaction) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const preview = `https://api.no-api-key.com/api/v2/color?hex=${color.slice(1, color.length)}`;

    const embed = bot.say.baseEmbed(interaction)
      .setThumbnail(preview)
      .setColor(color)
      .setTitle(`${color}`);

    return interaction.reply({ embeds: [embed] });
  }
};