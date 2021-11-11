const fetch = require("node-fetch");

module.exports = {
  commandName: "info",
  name: "ip",
  description: "Get information about an IP address",
  category: "info",
  options: [{
    type: "STRING",
    name: "ip",
    description: "The IP address you want to lookup",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const ipAddress = interaction.options.getString("ip", true);

    const data = await fetch(`https://ipwhois.app/json/${ipAddress}?lang=en`).then((res) => res.json());

    if (!data.success)
      return bot.say.wrongMessage(interaction, `No info was found about the ip \`${ipAddress}\`.`);

    const {
      ip,
      type,
      country,
      country_code,
      region,
      city,
      latitude,
      longitude,
      org,
      isp,
      timezone
    } = data;
    const flag = `https:\/\/www.countryflags.io\/${country_code}\/flat\/64.png` || "";

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${city}\/${region} - ${country}`)
      .setDescription(
        `**IP:** ${ip}
**Type:** ${type}
**Lon\/Lot:** ${latitude}\/${longitude}
**ISP:** ${isp}
**Org:** ${org || "None"}
**Timezone:** ${timezone}
        `)
      .setThumbnail(flag);

    return interaction.editReply({ embeds: [embed] });
  }
};