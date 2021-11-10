const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "dog",
  description: "Shows a dog image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("https://dog.ceo/api/breeds/image/random").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.message})`)
      .setImage(`${data.message}`);

    return interaction.reply({ embeds: [embed] });
  }
};