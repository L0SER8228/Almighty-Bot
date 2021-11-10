module.exports = {
  commandName: "music",
  name: "clearqueue",
  description: "Clear the current queue.",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.wrongMessage(interaction, "There is currently no song in the queue.");

    queue.clear();

    return bot.say.successMessage(interaction, "Cleared the queue.");
  }
};