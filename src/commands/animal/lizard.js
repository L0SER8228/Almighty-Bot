const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "lizard",
  description: "Shows a lizard image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("https://nekos.life/api/v2/img/lizard").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.url})`)
      .setImage(`${data.url}`);

    return interaction.reply({ embeds: [embed] });
  }
};