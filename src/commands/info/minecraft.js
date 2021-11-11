const fetch = require("node-fetch");

module.exports = {
  commandName: "info",
  name: "minecraft",
  description: "Get info about a minecraft server",
  category: "info",
  options: [{
    name: "query",
    description: "The server IP",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", true);

    const url = `http://api.xaliks.xyz/info/minecraft?type=server&query=${encodeURIComponent(query)}`;

    const data = await fetch(url).then((res) => res.json());

    if (data.error)
      return bot.say.wrongMessage(interaction, `No minecraft info was found about \`${query}\`.`);

    const status = data.status === "online" ? "Online" : "Offline";
    const players = data.players?.now.toString() ?? "Unknown";
    const maxPlayers = data.players?.max.toString() ?? "Unknown";
    const description = data.motd || "None";
    const version = data.version;
    const port = data.port.toString();

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(query)
      .addField("Status", status, true)
      .addField("Players", players, true)
      .addField("Maximum Players", maxPlayers, true)
      .addField("Version", version, true)
      .addField("Port", port, true)
      .setDescription(description);

    return interaction.editReply({ embeds: [embed] });
  }
};