module.exports = {
  commandName: "config",
  groupName: "dj",
  category: "admin",
  name: "set",
  description: "Set music dj role",
  options: [{
    type: "ROLE",
    name: "role",
    description: "The role to set",
    required: true
  }],
  async execute(bot, interaction, db) {
    const guildId = interaction.guild.id;
    const djMode = db.dj_mode;
    const djRole = db.dj_role;
    const banRoles = db.blacklisted_roles;

    const role = interaction.options.getRole("role", true);

    if (banRoles.includes(role.id))
      return bot.say.wrongMessage(interaction, "Can’t set a blacklisted role as dj role.");

    await bot.utils.updateGuild(guildId, {
      dj_role: role.id
    });

    if (!djMode) {
      await bot.utils.updateGuild(guildId, {
        dj_mode: true
      });
    }

    return bot.say.successMessage(interaction, `${role.toString()} role has been set as dj role.`);
  }
};