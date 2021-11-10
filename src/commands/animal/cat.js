const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "cat",
  description: "Shows a cat image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("https://nekos.life/api/v2/img/meow").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.url})`)
      .setImage(`${data.url}`);

    return interaction.reply({ embeds: [embed] });
  }
};