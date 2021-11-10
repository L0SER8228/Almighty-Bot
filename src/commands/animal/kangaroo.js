const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "kangaroo",
  description: "Shows a kangaroo image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("https://some-random-api.ml/animal/kangaroo").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.image})`)
      .setImage(`${data.image}`);

    return interaction.reply({ embeds: [embed] });
  }
};