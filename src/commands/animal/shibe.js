const fetch = require("node-fetch");

module.exports = {
  commandName: "animal",
  name: "shibe",
  description: "Shows a shibe image",
  category: "animal",
  async execute(bot, interaction) {
    const data = await fetch("http://shibe.online/api/shibes").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data[0]})`)
      .setImage(`${data[0]}`);

    return interaction.reply({ embeds: [embed] });
  }
};