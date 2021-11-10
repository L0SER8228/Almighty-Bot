const { Client: ImdbClient } = require("imdb-api");
const imdb = new ImdbClient({ apiKey: process.env["IMDB_API_KEY"] });

module.exports = {
  commandName: "info",
  name: "imdb",
  description: "Get information about a series or a movie from IMDB",
  category: "info",
  options: [{
    type: "STRING",
    name: "query",
    description: "What you're looking for",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", true);

    const movie = await imdb.get({ name: query }).catch(() => null);

    if (!movie)
      return bot.say.worngMessage(interaction, `No data was found about \`${query}\`on IMDB.`);

    const released = new Date(Number(movie.released)).toLocaleDateString();

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${movie.title}`)
      .setThumbnail(`${movie.poster}`)
      .setDescription(`${movie.plot}`)
      .addField("Ratings", movie.rating.toString(), true)
      .addField("Country", movie.country, true)
      .addField("Genres", movie.genres, true)
      .addField("Awards", movie.awards, true)
      .addField("Languages", movie.languages, true)
      .addField("Released on", released, true)
      .addField("Type", movie.type, true);

    return interaction.editReply({ embeds: [embed] });
  }
};
