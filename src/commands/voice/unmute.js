const DJS = require("discord.js");

module.exports = {
  commandName: "voice",
  name: "unmute",
  description: "Unmute a user that is in a voice channel",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MUTE_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.MUTE_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to voice unmute",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The reason to voice unmute",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason", false) ?? "Not specified";

    if (!member?.voice?.channel)
      return bot.say.wrongMessage(interaction, `${member.toString()} is not in any voice channel.`);

    if (!member?.voice?.serverMute)
      return bot.say.wrongMessage(interaction, `${member.toString()} is already voice unmuted.`);

    member.voice.setMute(false, reason);

    await bot.say.directMessage(user, `You've been voice unmuted on ${interaction.guild?.name}. Reason: \`${reason}\`.`);

    return bot.say.successMessage(interaction, `Voice unmuted ${member.toString()}. Reason: \`${reason}\`.`);
  }
};