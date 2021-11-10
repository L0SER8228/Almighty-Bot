module.exports = {
  commandName: "music",
  groupName: "filter",
  name: "reset",
  description: "Reset all applied filters.",
  category: "music",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();

    if (!filters.length)
      return bot.say.wrongMessage(interaction, "No filter is applied now.");

    queue.setFilters({});

    return bot.say.successMessage(interaction, "Removed all applied filters.");
  }
};