module.exports = {
  commandName: "music",
  groupName: "filter",
  name: "show",
  description: "Shows all filters.",
  category: "music",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

   const enabledFilters = queue.getFiltersEnabled();
    const disabledFilters = queue.getFiltersDisabled();

    const enabledFiltersDescription = enabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** ---> ✅`).join("\n");

    const disabledFiltersDescription = disabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** ---> ❌`).join("\n");

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
      .setTitle("Audio Filters")
      .setDescription(`${enabledFiltersDescription}

${disabledFiltersDescription}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  }
};