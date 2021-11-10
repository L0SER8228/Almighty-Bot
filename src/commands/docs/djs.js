const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  commandName: "docs",
  name: "djs",
  description: "Find something on the discord.js docs",
  category: "misc",
  options: [
    {
      type: "STRING",
      name: "query",
      description: "What do you want to search for",
      required: true
    },
    {
      type: "STRING",
      name: "branch",
      description: "The branch (default 'stable')",
      required: false,
      choices: [
        {
          name: "Stable",
          value: "stable"
        },
        {
          name: "Master",
          value: "master"
        }
      ]
    }
  ],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", true);
    const branch = interaction.options.getString("branch", false) ?? "stable";

    const url = `https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${query}`;

    const data = await fetch(url).then((res) => res.json());

    if (!data || data.message || data.error)
      return bot.say.worngMessage(interaction, `Nothing found about \`${query}\` on ${branch} branch on discord.js docs.`);

    const embed = new MessageEmbed({
      ...data,
      footer: {
        text: interaction.user.tag,
        icon_url: interaction.user.displayAvatarURL({
          dynamic: true
        })
      }
    });

    return interaction.editReply({ embeds: [embed] });
  }
};