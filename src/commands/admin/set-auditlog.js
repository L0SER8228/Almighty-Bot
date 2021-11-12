module.exports = {
  commandName: "config",
  groupName: "set",
  name: "auditlog",
  category: "admin",
  description: "Set the auditlog channel",
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

    const oldHookId = db.audit_webhook;

    await bot.utils.createLogHook(bot, channel.id, oldHookId);

    return bot.say.successMessage(interaction, `${channel.toString()} has been set as auditlog channel.`);
  }
};