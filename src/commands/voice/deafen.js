const DJS = require("discord.js");

module.exports = {
  commandName: "voice",
  name: "deafen",
  description: "Deafen a user who is in a voice channel",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
  memberPermissions: [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to voice deafen",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The reason to voice deafen",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason", false) ?? "Not specified";

    if (!member.voice?.channel)
      return bot.say.wrongMessage(interaction, `${member.toString()} is not in any voice channel.`);

    if (member.voice?.serverDeaf)
      return bot.say.wrongMessage(interaction, `${member.toString()} is already server deafed.`);

    member.voice.setDeaf(true, reason);

    await bot.say.directMessage(user, `You've been deafed on **${interaction.guild.name}**. Reason: \`${reason}\`.`);

    return bot.say.successMessage(interaction, `Server deafed ${member.toString()}. Reason: \`${reason}\`.`);
  }
};