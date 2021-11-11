const { time } = require("@discordjs/builders");

module.exports = {
  commandName: "channel",
  name: "info",
  description: "Get information about a channel",
  category: "utility",
  options: [{
    type: "CHANNEL",
    description: "Mention the channel (default current)",
    name: "channel",
    required: false
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const channel = interaction.options.getChannel("channel", false) ?? interaction.channel;

    if (!channel)
      return bot.say.wrongMessage(interaction, "The channel was not found", true);

    const topic = channel.topic ?? "\`None\`";
    const type = channel.type;
    const createdAt =
      "createdAt" in channel ? time(new Date(channel.createdAt), "F") : "Unknown";

    let region = undefined;
    if (channel.isVoice()) region = channel.rtcRegion ?? "Automatic";

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${channel?.name}`)
      .setDescription(
        `
**Id**: ${channel.id}
**Type**: ${type}
**Topic**: ${topic}
**Created at**: ${createdAt}
${region ? `**Region**: ${region}` : ""}
      `);

    return interaction.editReply({ embeds: [embed] });
  }
};