const DJS = require("discord.js");

module.exports = {
  commandName: "say",
  name: "embed",
  description: "Let the bot say something in a embed",
  category: "misc",
  options: [{
    type: "STRING",
    name: "text",
    description: "The text to say",
    required: true
  }],
  execute(bot, interaction) {
    const text = interaction.options.getString("text", true);

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(text);

    return interaction.reply({ embeds: [embed] });
  }
};