const DJS = require("discord.js");

module.exports = {
  commandName: "voice",
  name: "mute",
  description: "Mute a user that is in a voice channel",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MUTE_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.MUTE_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to voice mute",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The reason to voice mute",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason", false) ?? "Not specified";

    if (!member?.voice?.channel)
      return bot.say.wrongMessage(interaction, `${member.toString()} is not in any voice channel.`);

    if (member?.voice?.serverMute)
      return bot.say.wrongMessage(interaction, `${member.toString()} is already voice muted.`);

    member.voice.setMute(true, reason);

    await bot.say.directMessage(user, `You've been voice muted on ${interaction.guild?.name}. Reason: \`${reason}\`.`);

    return bot.say.successMessage(interaction, `Voice muted ${member.toString()}. Reason: \`${reason}\`.`);
  }
};