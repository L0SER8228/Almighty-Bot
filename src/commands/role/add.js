const DJS = require("discord.js");

module.exports = {
  commandName: "role",
  name: "add",
  description: "Add a role to a user",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES],
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user who needs role.",
      required: true
    },
    {
      type: "ROLE",
      name: "role",
      description: "The role you want to add",
      required: true
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const role = interaction.options.getRole("role", true);

    if (interaction.guild.me.roles.highest.comparePositionTo(role) < 0)
      return bot.say.wrongMessage(interaction, `My role is not high enough than ${role.toString()} role.`);

    if (!member.manageable)
      return bot.say.wrongMessage(interaction, `Can't add role to ${member.toString()}.`);

    if (member.roles.cache.some((r) => role.id === r.id))
      return bot.say.wrongMessage(interaction, `${member.toString()} already has ${role.toString()} role.`);

    await member.roles.add(role.id);

    return bot.say.successMessage(interaction, `Added ${role.toString()} role to ${member.toString()}.`);
  }
};