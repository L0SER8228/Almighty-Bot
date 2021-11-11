const fetch = require("node-fetch");

module.exports = {
  commandName: "info",
  name: "country",
  description: "Show information about a country",
  category: "info",
  options: [{
    type: "STRING",
    name: "name",
    description: "The country name",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("name", true);

    const data = await fetch(`https://restcountries.eu/rest/v2/name/${encodeURIComponent(countryQuery)}`).then((r) =>
      r.json());

    const [country] = data;

    if (data.message || !country) {
      return bot.say.wrongMessage(interaction, `No data was found about the country \`${query}\`.`);
    }

    const name = country.name || "N/A";
    const nativeName = country.nativeName || "N/A";
    const domains = country.topLevelDomain?.join(", ") || "N/A";
    const callingCodes = country.callingCodes?.join(", ") || "N/A";
    const alphaCode = country.alpha2Code || "N/A";
    const capital = country.capital || "N/A";
    const timezones = country.timezones?.join(", ") || "N/A";
    const region = country.region || "N/A";
    const population = bot.utils.formatNumber(country.population);
    const languages = country.languages.map((v) => v.name).join(", ");

    const flag = `https://www.countryflags.io/${alphaCode}/flat/64.png`;

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor(name)
      .setTitle(nativeName)
      .setDescription(`**Alpha Code:** ${alphaCode}
**Region:** ${region}
**Capital:** ${capital}
**Population*:* ${population}`
      )
      .addField("Calling Codes:", callingCodes, true)
      .addField("Domains:", domains, true)
      .addField("Languages:", languages, true)
      .addField("Timezones:", timezones, false)
      .setThumbnail(flag);

    return interaction.editReply({ embeds: [embed] });
  }
};