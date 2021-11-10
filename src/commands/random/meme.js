const fetch = require("node-fetch");

module.exports = {
  commandName: "random",
  name: "meme",
  description: "Show a funny meme",
  category: "fun",
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const data = await fetch("https://meme-api.herokuapp.com/gimme").then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${data.title}`)
      .setDescription(`[If the image failed to load, click here to view](${data.url})`)
      .setImage(`${data.url}`);

    return interaction.editReply({ embeds: [embed] });
  }
};