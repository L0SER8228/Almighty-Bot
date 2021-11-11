const fetch = require("node-fetch");

module.exports = {
  commandName: "info",
  name: "pokemon",
  description: "Show a pokémon information",
  category: "info",
  options: [{
    type: "STRING",
    name: "query",
    description: "The pokemon name",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", true).toLowerCase();

    const data = await fetch(`https://some-random-api.ml/pokedex?pokemon=${encodeURIComponent(query)}`).then((res) => res.json());

    if (!data)
      return bot.say.wrongMessage(interaction, `No info was found about \`${query}\`.`);

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${data.name}`)
      .setDescription(`${data.description}`)
      .addField("Id", data.id, true)
      .addField("Species", data.species.join(", "), true)
      .addField("Abilities", data.abilities.join(", "), true)
      .addField("Height", data.height, true)
      .addField("Weight", data.weight, true)
      .addField("Experience", data.base_experience, true)
      .addField("Gender", data.gender.join(" / "), true)
      .addField("Egg Groups", data.egg_groups.join(", "), true)
      .addField(`**Family")}`,
        `
**Evolution Stage:** ${data.family.evolutionStage}
**Evolution Line:** ${data.family.evolutionLine.join(" -> ")}
      `)
      .addField(`**Stats")}`
        `
**HP:** ${data.stats.hp}
**Attack:** ${data.stats.attack}
**Defense:** ${data.stats.defense}
**Sp Atk:** ${data.stats.sp_atk}
**Sp Def:** ${data.stats.sp_def}
**Speed** ${data.stats.speed}
**Total:** ${data.stats.total}
      `)
      .setThumbnail(`${data.sprites.animated}`);

    return interaction.editReply({ embeds: [embed] });
  }
};