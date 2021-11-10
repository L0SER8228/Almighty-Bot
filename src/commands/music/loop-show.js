module.exports = {
  commandName: "music",
  groupName: "loop",
  name: "mode",
  description: "Shows current set loop mode.",
  category: "music",
   execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    let mode = "none";
    if (queue.repeatMode == 2) {
      mode = "queue";
    } else if (queue.repeatMode == 1) {
      mode = "track";
    } else if (queue.repeatMode == 0) {
      mode = "off";
    }

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`Loop mode is set to: \`${mode}\`.`)
      .setFooter(`Use \'\/loop <off|track|queue>\' to change loop mode.`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};