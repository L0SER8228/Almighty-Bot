const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  commandName: "docs",
  name: "mdn",
  description: "Find something on the MDN Web Docs.",
  category: "misc",
  options: [{
    type: "STRING",
    name: "query",
    description: "What do you want to search for",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", true);

    const url = `https://mdn.gideonbot.com/embed?q=${query}`;

    const data = await fetch(url).then((res) => res.json());

    if (!data || data.message || data.code || data.error)
      return bot.say.wrongMessage(interaction, `Nothing found about \`${query}\` on MDN docs.`);

    const embed = new MessageEmbed({ ...data });

    return interaction.editReply({ embeds: [embed] });
  }
};