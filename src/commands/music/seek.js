module.exports = {
  commandName: "music",
  name: "seek",
  description: "Seek to a specific position in the current song.",
  usage: "<mm:ss>",
  category: "music",
  dj: true,
  options: [{
    name: "duration",
    description: "The duration to seek (i,e. 1m 20s)",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    const timeString = interaction.options.getString("duration", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const song = queue.current;

    if (song.live)
      return bot.say.wrongMessage(interaction, "Can't seek this live streaming song.");

     const seekTime = bot.utils.parseMilliseconds(timeString);
     
    if (!seekTime || seekTime > song.durationMS || seekTime < 0)
      return bot.say.wrongMessage(interaction, "Provide a valid duration to seek.");

    queue.seek(seekTime);

    return bot.say.successMessage(interaction, `Seeked to \`${bot.utils.formatDuration(timeString)}\`.`);
  }
};
