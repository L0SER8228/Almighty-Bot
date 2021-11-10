module.exports = {
  commandName: "config",
  groupName: "welcome",
  name: "role",
  category: "admin",
  description: "Set the welcome role",
  options: [{
    type: "ROLE",
    name: "role",
    description: "Mention the role",
    required: true
  }],
  async execute(bot, interaction, db) {
    const guildId = interaction.guild.id;

    const role = interaction.options.getRole("role", true);

    await bot.utils.updateGuild(guildId, {
      welcome_role: role.id
    });

    return bot.say.successMessage(interaction, `${role.toString()} role has been set as dj role.`);
  }
};