const fetch = require("node-fetch");

module.exports = {
  commandName: "info",
  name: "weather",
  description: "Get weather information of a place",
  category: "info",
  options: [{
    type: "STRING",
    name: "query",
    description: "Can be a country, city, state",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", true);
    const encodeQuery = encodeURIComponent(query);
    const apiKey = process.env["WEATHER_API_KEY"];

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeQuery}&appid=${apiKey}&units=metric`;
    const data = await fetch(url).then((res) => res.json());

    if (data.cod === 404 || data.cod === 401)
      return bot.say.wrongMessage(interaction, `No data was found about \`${query}\`.`);

    const main = data.weather[0].main.toString();
    const desc = data.weather[0].description.toString();
    const icon = data.weather[0].icon.toString();
    const feelsLike = data.main.feels_like.toString();
    const temp = data.main.temp.toString();
    const windSpeed = data.wind.speed.toString();
    const windDeg = getWindDirection(data.wind.deg);

    const country = data.sys.country.toString();
    const flag = `https://www.countryflags.io/${country}/flat/64.png`;

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor(`${data.name} (${country}) Weather`, flag)
      .setDescription(
        `**Main:** ${main}
  **Current:** ${desc}
  **Wind Speed:** ${windSpeed}km/h
  **Wind Degrees:** ${windDeg}`
      )
      .addField("**__Temperature__**",
        `**Current:** ${temp}°C
  **Feels Like:** ${feelsLike}°C`
      )
      .setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`);

    return interaction.editReply({ embeds: [embed] });
  }
};

function getWindDirection(v) {
  if (v === 0) {
    return "North";
  } else if (v > 0 && v < 90) {
    return "North East";
  } else if (v === 90) {
    return "EAST";
  } else if (v > 90 && v < 180) {
    return "South East";
  } else if (v === 180) {
    return "South";
  } else if (v > 180 && v < 270) {
    return "South West";
  } else if (v === 270) {
    return "West";
  } else if (v > 270 && v < 360) {
    return "North West";
  } else {
    return "Unknown";
  }
}