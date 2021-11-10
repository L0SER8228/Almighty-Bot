module.exports = {
  commandName: "music",
  name: "stop",
  description: "Stop the music.",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.stop();

    return bot.say.successMessage(interaction, "Stopped the music.");
  }
};