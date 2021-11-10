const avlFilters = require("../../data/filters.json");
const { toCapitalize } = require("../../utils/functions");

module.exports = {
  commandName: "music",
  groupName: "filter",
  name: "toogle",
  description: "Toogle a audio filter.",
  options: [{
    type: "STRING",
    name: "name",
    description: "The name of the filter.",
    required: true,
    choices: avlFilters.map((f) => ({
      name: toCapitalize(f),
      value: `${f}`
    }))
  }],
  category: "music",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();

    const filterName = interaction.options.getString("name", true);

    await queue.setFilters({
        [filterName]: !queue.getFiltersEnabled().includes(`${filterName}`)
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes(`${filterName}`) ? "Applied" : "Removed"} the \`${filterName}\` filter.`);
  }
};