module.exports = {
  commandName: "music",
  name: "nowplaying",
  description: "Show the current playing song.",
  category: "music",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    const song = queue.current;
    
    const embed = bot.say.baseEmbed(interaction)
      .setAuthor(`Now playing 🎶`)
      .setTitle(`${song.title}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(
        `~ Played by: ${song.requestedBy.toString()}
${queue.createProgressBar()}`
      );

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};