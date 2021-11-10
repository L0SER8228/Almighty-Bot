const DJS = require("discord.js");

module.exports = {
  commandName: "voice",
  name: "undeafen",
  description: "Undeafen a user that is in a voice channel",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to voice undeafen",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The reason to voice undeafen",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason", false) ?? "Not specified";

    if (!member?.voice?.channel)
      return bot.say.worngMessage(interaction, `${member.toString()} is not in any voice channel.`);

    if (!member?.voice?.serverDeaf)
      return bot.say.worngMessage(interaction, `${member.toString()} is already voice undeafened.`);

    member.voice.setDeaf(false, reason);

    await bot.say.directMessage(user, `You've been undeafed on ${interaction.guild?.name}. Reason: \`${reason}\`.`);

    return bot.say.successMessage(interaction, `Server undeafed ${member.toString()}. Reason: \`${reason}\``);
  }
};