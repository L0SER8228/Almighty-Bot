const { QueueRepeatMode } = require("discord-player");

module.exports = {
  commandName: "music",
  name: "autoplay",
  description: "Autoplay related songs after queue end",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

    return bot.say.successMessage(interaction, "Autoplay mode activated.");
  }
};