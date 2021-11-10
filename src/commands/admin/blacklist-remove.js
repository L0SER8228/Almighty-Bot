module.exports = {
  commandName: "config",
  groupName: "blacklist",
  name: "remove",
  description: "Unblacklist a role and allow to use this bot",
  category: "admin",
  options: [{
    type: "ROLE",
    name: "role",
    description: "Mention the role to unblacklist.",
    required: true
  }],
  async execute(bot, interaction, db) {
    const role = interaction.options.getRole("role", true);

    const guildId = interaction.guild.id;

    const banRoles = db.blacklisted_roles;

    if (!banRoles.includes(role.id))
      return bot.say.wrongMessage(interaction, `${role.toString()} role is already unblacklisted.`);

    await bot.utils.updateGuild(guildId, {
      blacklisted_roles: banRoles.filter((r) => r !== role.id)
    });

    return bot.say.successMessage(interaction, `${role.toString()} has been unblacklisted and uss this bot now.`);
  }
};