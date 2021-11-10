module.exports = {
  commandName: "music",
  name: "back",
  description: "Back to the previous song",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.previousTracks.length <= 1)
      return bot.say.wrongMessage(interaction, "No previous track was found.");

    queue.back();

    return bot.say.successMessage(interaction, "Backed to the previous song.");
  }
};