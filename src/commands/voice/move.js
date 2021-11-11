const DJS = require("discord.js");

module.exports = {
  commandName: "voice",
  name: "move",
  description: "Move a user that is in a voice channel to a different voice channel",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MOVE_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.MOVE_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to move",
      required: true
    },
    {
      type: "CHANNEL",
      name: "channel",
      description: "To which voice channel, you want to move the user",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The reason to move the user",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const channel = interaction.options.getChannel("channel", true);
    const reason = interaction.options.getString("reason", false) ?? "Not specified";

    if (!member?.voice?.channel)
      return bot.say.wrongMessage(interaction, `${member.toString()} is not in any voice channel.`);

    if (!channel.isVoice())
      return bot.say.wrongMessage(interaction, "Provide a valid guild voice channel.");

    member.voice.setChannel(channel, reason);

    await bot.say.directMessage(user, `You've been moved to ${channel.toString()} in ${interaction.guild?.name}. Reason: \`${reason}\`.`);

    return bot.say.successMessage(interaction, `Moved ${member.toString()} to ${channel.toString()} voice channel. Reason: \`${reason}\`.`);
  }
};