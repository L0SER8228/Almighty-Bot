module.exports = {
  commandName: "music",
  name: "resume",
  description: "Resume the current paused song.",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (!queue.connection.paused)
      return bot.say.wrongMessage(interaction, "The song is not paused.");

    queue.setPaused(false);

    return bot.say.successMessage(interaction, "Resumed the corrent song.");
  }
};