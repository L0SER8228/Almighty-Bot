const fetch = require("node-fetch");
const { time } = require("@discordjs/builders");

module.exports = {
  commandName: "info",
  name: "covid",
  description: "Get COVID-19 information",
  category: "info",
  options: [{
    name: "country",
    description: "The country you want extra information of",
    type: "STRING",
    required: false
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("country");

    let data;

    if (!query) {
      data = await fetch("https://disease.sh/v3/covid-19/all").then(res => res.json());
    } else {
      data = await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(query)}`).then(res => res.json());
    }

    if (data.message)
      return bot.say.worngMessage(interaction, `Covid data was not found for \`${query}\` country.`);

    const title = data.country ? `Covid: ${data.country}` : "Covid";

    const formatNum = bot.utils.formatNumber;

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${title}`)
      .addField("**__Total__**",
        `**Cases:** ${formatNum(data.cases)}
**Recovered:** ${formatNum(data.recovered)}
**Deaths:** ${formatNum(data.deaths)}
**Population:** ${formatNum(data.population)}`, true)
      .addField("**__Today__**",
        `**Cases:** ${formatNum(data.todayCases)}
**Recovered:** ${formatNum(data.todayRecovered)}
**Deaths:** ${formatNum(data.todayDeaths)}`, true)
      .addField("Critical", formatNum(data.critical), true)
      .addField("Tests", formatNum(data.tests), true)
      .setThumbnail(data.countryInfo?.flag || "")
      .setFooter(
        `Data last updated on: ${time(new Date(country.updated), "f")}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      );

    return interaction.editReply({ embeds: [embed] });
  }
};