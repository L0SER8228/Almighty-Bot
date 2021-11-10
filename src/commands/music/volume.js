module.exports = {
  commandName: "music",
  name: "volume",
  description: "Check or change the volume",
  category: "music",
  options: [{
    name: "amount",
    description: "The new volume (1-200)",
    type: "NUMBER",
    required: false
  }],
  async execute(bot, interaction) {
    const newVol = interaction.options.getNumber("amount", false);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (!newVol) {
      const embed = bot.say.baseEmbed(interaction)
        .setDescription(`Volume is at \`${queue.volume}%\`.`)
        .setFooter(`Use \'\/volume <1-200>\' to change the volume.`);

      return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    if (!Number.isInteger(newVol) || newVol > 200 || newVol < 0)
      return bot.say.wrongMessage(interaction, "Provide a valid number between 1 to 200.");

    queue.setVolume(newVol);

    return bot.say.successMessage(interaction, `Volume is updated to \`${queue.volume}%\`.`);
  }
};