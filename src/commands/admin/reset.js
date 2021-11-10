module.exports = {
  commandName: "config",
  name: "reset",
  category: "admin",
  description: "Reset guild config.",
  options: [{
    type: "STRING",
    name: "option",
    description: "That specific settings",
    required: true,
    choices: [
      {
        name: "Welcome Channel",
        value: "welcome_channel"
      },
      {
        name: "Goodbye Channel",
        value: "goodbye_channel"
      },
      {
        name: "Welcome Role",
        value: "welcome_role"
      },
      {
        name: "Audit Logs",
        value: "audit_webhook"
      },
      {
        name: "Mute Role",
        value: "muted_role"
      }
    ]
  }],
  async execute(bot, interaction) {
    const choice = interaction.options.getString("option", true);

    const guildId = interaction.guild.id;

    await bot.utils.updateGuild(guildId, {
      [choice]: null
    });

    return bot.say.successMessage(interaction, `Reset the \`${choice.replace("_", " ")}\`.`);
  }
};