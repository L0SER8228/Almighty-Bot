const fetch = require("node-fetch");

module.exports = {
  commandName: "image",
  name: "pikachu",
  description: "Shows an image of a pikachu",
  category: "image",
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const data = await fetch("https://some-random-api.ml/img/pikachu").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.link})`)
      .setImage(data.link);

    return interaction.editReply({ embeds: [embed] });
  }
};