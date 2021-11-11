const DJS = require("discord.js");

module.exports = {
  commandName: "voice",
  name: "kick",
  description: "Kick a user that is in a voice channel",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MOVE_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.MOVE_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to voice kick",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The reason to voice kick",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason", false) ?? "Not specified";

    if (!member?.voice?.channel)
      return bot.say.wrongMessage(interaction, `${member.toString()} is not in any voice channel.`);

    member.voice.disconnect(reason);

    await bot.say.directMessage(user, `You've been disconnected on ${interaction.guild?.name}. Reason: \`${reason}\`.`);

    return bot.say.successMessage(interaction, `Disconnected ${member.toString()} from voice channel. Reason: \`${reason}\`.`);
  }
};