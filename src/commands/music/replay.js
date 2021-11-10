module.exports = {
  commandName: "music",
  name: "replay",
  description: "Replay the current song.",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.seek(0);

    return bot.say.successMessage(interaction, "Restarted the current song.");
  }
};