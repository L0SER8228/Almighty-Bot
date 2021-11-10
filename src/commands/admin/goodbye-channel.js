module.exports = {
  commandName: "config",
  groupName: "goodbye",
  name: "channel",
  category: "admin",
  description: "Set the goodbye channel",
  options: [{
    type: "CHANNEL",
    name: "channel",
    description: "Mention a text channel",
    required: true
  }],
  async execute(bot, interaction, db) {
    const guildId = interaction.guild.id;

    const channel = interaction.options.getChannel("channel", true);

    await bot.utils.updateGuild(guildId, {
      goodbye_channel: channel.id
    });

    return bot.say.successMessage(interaction, `${channel.toString()} has been set as goodbye channel.`);
  }
};