const fetch = require("node-fetch");

module.exports = {
  commandName: "random",
  name: "quote",
  description: "Shows a random quote",
  category: "random",
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const data = await fetch("https://api.tovade.xyz/v1/fun/quote").then((r) => r.json());

    const embed = bot.say.baseEmbed(interaction)
      .setTitle("Quote")
      .setDescription(`${data.content}`)
      .setFooter(`${data.author} \(${data.id}\)`)
      .addField("Tags", data.tags.join(", "));

    return interaction.editReply({ embeds: [embed] });
  }
};