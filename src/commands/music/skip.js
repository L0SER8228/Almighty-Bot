module.exports = {
  commandName: "music",
  name: "skip",
  description: "Skip to the next song",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1 && queue.repeatMode !== 3)
      return bot.say.wrongMessage(interaction, "No more songs in the queue to skip.");

    queue.skip();

    return bot.say.successMessage(interaction, "Skipped to the next song.");
  }
};