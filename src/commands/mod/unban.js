const DJS = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban a member on the server",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
  options: [
    {
      type: "STRING",
      name: "user-id",
      description: "The user id of the banned member",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The unban reason",
      required: false
    }
  ],
  async execute(bot, interaction) {
    try {
      const userId = interaction.options.getString("user-id", true);
      const reason = interaction.options.getString("reason") ?? "Not specified";

      const user = await interaction.guild.members?.unban(userId);

      return bot.say.successMessage(interaction, ` ${user.tag} is unbanned. Reason: \`${reason}\`.`);
    } catch {
      return bot.say.wrongMessage(interaction, "That user is not banned.");
    }
  }
};
