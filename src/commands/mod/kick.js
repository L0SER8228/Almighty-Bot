const DJS = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick a user from the current guild",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.KICK_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.KICK_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The targetted member.",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The kick reason",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason", false) ?? "Not specified";

    if (!member.manageable | !member.kickable)
      return bot.say.wrongMessage(interaction, `Can't kick ${member.toString()}`);

    member.kick(reason);

    await bot.say.directMessage(member, `You've been kicked from ${interaction.guild?.name}. Reason: \`${reason}\`.`);

    await bot.say.successMessage(interaction, `Kicked ${member.user.tag} from the server. Reason*: \`${reason}\`.`);

    return bot.emit("guildKickAdd", {
      user,
      executor: interaction.user,
      reason
    });
  }
};