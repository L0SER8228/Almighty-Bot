module.exports = {
  commandName: "config",
  groupName: "blacklist",
  name: "add",
  description: "Blacklist a role from using this bot",
  category: "admin",
  options: [{
    type: "ROLE",
    name: "role",
    description: "Mention the role to blacklist.",
    required: true
  }],
  async execute(bot, interaction, db) {
    const role = interaction.options.getRole("role", true);

    const guildId = interaction.guild.id;

    const banRoles = db.blacklisted_roles;
    const djRole = db.dj_role;

    if (role.permissions.has(8n) || role.permissions.has(32n))
      return bot.say.wrongMessage(interaction, "You can't exclude roles with the following permissions: \`Manage Server\`, \`Administrator\`.");

    if (banRoles.includes(role.id))
      return bot.say.wrongMessage(interaction, `${role.toString()} role is already blacklisted.`);

    if (djRole === role.id)
      return bot.say.wrongMessage(interaction, "Can’t blacklist the dj role.");

    await bot.utils.updateGuild(guildId, {
      blacklisted_roles: [...banRoles, role.id]
    });

    return bot.say.successMessage(interaction, `${role.toString()} has been blacklisted from using this bot.`);
  }
};