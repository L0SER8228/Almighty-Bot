const { QueueRepeatMode } = require("discord-player");

module.exports = {
  commandName: "music",
  groupName: "loop",
  name: "off",
  description: "Turn the looping off",
  category: "music",
  dj: true,
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.setRepeatMode(QueueRepeatMode.OFF);

    return bot.say.successMessage(interaction, "Turned off loop mode.");
  }
};