const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "racoon",
  description: "Shows a racoon image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("https://some-random-api.ml/img/racoon").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.link})`)
      .setImage(`${data.link}`);

    return interaction.reply({ embeds: [embed] });
  }
};