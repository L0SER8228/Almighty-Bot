module.exports = {
  commandName: "config",
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

    const oldHookId = db.audit_webhook;

    await bot.utils.createLogHook(bot, channel.id,oldHookId);

    return bot.say.successMessage(interaction, `${channel.toString()} has been set as auditlog channel.`);
  }
};