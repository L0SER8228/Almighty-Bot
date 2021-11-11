module.exports = {
  commandName: "config",
  groupName: "welcome",
  name: "channel",
  category: "admin",
  description: "Set the welcome channel",
  options: [{
    type: "CHANNEL",
    name: "channel",
    description: "Mention a text channel",
    required: true
  }],
  async execute(bot, interaction, db) {
    const guildId = interaction.guild.id;

    const channel = interaction.options.getChannel("channel", true);

    if (channel.type !== "GUILD_TEXT")
      return bot.say.wrongMessage(interaction, `${channel.toString()} is not a valid text channel.`);

    await bot.utils.updateGuild(guildId, {
      welcome_channel: channel.id
    });

    return bot.say.successMessage(interaction, `${channel.toString()} has been set as welcome channel.`);
  }
};
