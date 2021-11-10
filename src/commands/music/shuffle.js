module.exports = {
  commandName: "music",
  name: "shuffle",
  description: "Shuffle the queue.",
  category: "music",
  dj: true,
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return bot.say.wrongMessage(interaction, "Need at least \`3\` songs in the queue to shuffle.");

    queue.shuffle();

    return bot.say.successMessage(interaction, "Shuffled the queue.");
  }
};