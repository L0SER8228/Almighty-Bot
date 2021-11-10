const fetch = require("node-fetch");

module.exports = {
  commandName: "image",
  name: "giphy",
  description: "Search for a image on giphy",
  category: "image",
  options: [{
    type: "STRING",
    name: "query",
    description: "A search query for the image",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const api_key = process.env["GIPHY_API_KEY"];

    const query = interaction.options.getString("query", true);
    const q = encodeURIComponent(query);

    const limit = 1;
    const rating = "pg-13";
    const randomInt = Math.floor(Math.random() * 100);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&lang=en&rating=${rating}&limit=${limit}&offset=${randomInt}`;
    const res = await fetch(url).then(res => res.json());
    const [data] = res.data;

    if (!data)
      return bot.say.wrongMessage(interaction, `No giphy was found for \`${query}\`.`)

    const image = data.images.original.url;

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${data.title}`)
      .setDescription(`[If the image failed to load, click here to view](${data.url})`)
      .setImage(`${image}`);

    return interaction.editReply({ embeds: [embed] });
  }
};