const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "redpanda",
  description: "Shows a redpanda image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("https://some-random-api.ml/img/red_panda").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.url})`)
      .setImage(`${data.url}`);

    return interaction.reply({ embeds: [embed] });
  }
};