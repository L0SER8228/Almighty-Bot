const fetch = require("node-fetch");

module.exports = {
  commandName: "image",
  name: "tweet",
  description: "Display an image with your tweet",
  category: "image",
  options: [{
    type: "STRING",
    name: "text",
    description: "The text that needs to be tweeted",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const text = interaction.options.getString("text", true);

    const data = await fetch(`https://nekobot.xyz/api/imagegen?type=tweet&text=${encodeURIComponent(text)}`).then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.message})`)
      .setImage(data.message);

    return interaction.editReply({ embeds: [embed] });
  }
};