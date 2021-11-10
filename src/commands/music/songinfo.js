module.exports = {
  commandName: "music",
  name: "songinfo",
  description: "Show details of a specific song.",
  category: "music",
  options: [{
    name: "index",
    type: "NUMBER",
    description: "That song index in queue.",
    required: true
  }],
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return bot.say.wrongMessage(interaction, "I’m currently not playing in this server.");

    const index = interaction.options.getNumber("index", true) - 1;

    if (!queue.tracks[index] || index > queue.tracks.length || index < 0)
      return bot.say.wrongMessage(interaction, "Provided Song Index does not exist.");

    const song = queue.tracks[index]

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Songinfo 🎵")
      .setTitle(`${song.title}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`~ **Requested by**: ${song.requestedBy.toString()}
**Duration**: ${song.duration}
**Position in queue**: ${index}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};