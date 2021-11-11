const DJS = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a member from the server",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The targetted user",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The ban reason",
      required: false
    },
    {
      type: "NUMBER",
      name: "history",
      description: "Delete message history days [0-7] (default 0)",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason") ?? "Not specified";
    const days = interaction.options.getNumber("history") ?? 0;

    if (!member.manageable || !member.bannable)
      return bot.say.wrongMessage(interaction, `Can't ban ${member.toString()}.`);

    await member.ban({
      days,
      reason: `Banned by: ${interaction.user.tag}\nReason: ${reason}`
    });

    await bot.say.directMessage(member, `You've been banned from ${interaction.guild?.name}. Reason: \`${reason}\`.`);

    return bot.say.successMessage(interaction, `Banned ${member.user.tag} from the server. Reason: \`${reason}\`.`);
  }
};