const DJS = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute a user",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES, DJS.Permissions.FLAGS.MANAGE_CHANNELS],
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES, DJS.Permissions.FLAGS.MANAGE_CHANNELS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to unmute",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The unmute reason",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason") ?? "Not specified";

    const muteRole = await bot.utils.findOrCreateMutedRole(interaction.guild);

    if (member.roles.cache.find((r) => r.id !== muteRole?.id))
      return bot.say.wrongMessage(interaction, `${member.toString()} is not muted.`);

    interaction.guild.channels.cache.forEach((channel) => {
      if (channel instanceof DJS.ThreadChannel) return;

      channel.permissionOverwrites.delete(member.id);
    });


    await bot.say.successMessage(interaction, `${member.toString()} is unmuted. Reason: \`${reason}\`.`);
    await bot.say.directMessage(user, `You've been unmuted on ${interaction.guild.name}. Reason: \`${reason}\`.`);

    member.roles.remove(mutedRole);

    return bot.emit("guildMuteRemove", {
      member,
      executor: interaction.user,
      reason
    });
  }
};