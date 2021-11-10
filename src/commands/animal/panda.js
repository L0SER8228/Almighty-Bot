const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "panda",
  description: "Shows a panda image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("https://some-random-api.ml/img/panda").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.link})`)
      .setImage(`${data.link}`);

    return interaction.reply({ embeds: [embed] });
  }
};