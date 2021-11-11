const DJS = require("discord.js");

module.exports = {
  commandName: "emoji",
  name: "enlarge",
  description: "Enlarge an emoji",
  category: "utility",
  options: [{
    type: "STRING",
    name: "emoji",
    description: "The emoji you want to enlarge",
    required: true
  }],
  execute(bot, interaction) {
    const emoji = interaction.options.getString("emoji", true);

    const custom = DJS.Util.parseEmoji(emoji);

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`Enlarged ${emoji}`);

    if (custom?.id) {
      embed.setImage(
        `https://cdn.discordapp.com/emojis/${custom.id}.${custom?.animated ? "gif" : "png"}`,
      );
    } else {
      const [parsed] = parse(emoji, { assetType: "png" });
      if (!parsed)
        return bot.say.wrongMessage(interaction, "Provided emoji is invalid.");
      embed.setImage(parsed.url);
    }

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  }
};