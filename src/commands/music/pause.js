module.exports = {
  commandName: "music",
  name: "pause",
  description: "Pause the current playing song.",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.connection.paused)
      return bot.say.wrongMessage(interaction, "The song is already paused.");

    queue.setPaused(true);

    return bot.say.successMessage(interaction, "Paused the current song.");
  }
};