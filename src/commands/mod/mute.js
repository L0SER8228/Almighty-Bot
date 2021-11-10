const DJS = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute a user",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES, DJS.Permissions.FLAGS.MANAGE_CHANNELS],
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES, DJS.Permissions.FLAGS.MANAGE_CHANNELS],
  options: [
    {
      type: "USER",
      name: "user",
      description: "The targetted member",
      required: true
    },
    {
      type: "STRING",
      name: "reason",
      description: "The mute reason",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user", true);
    const reason = interaction.options.getString("reason") ?? "Not specified";

    const muteRole = await bot.utils.findOrCreateMutedRole(interaction.guild);

    if (member.roles.cache.find((r) => r.id === muteRole?.id))
      return bot.say.worngMessage(interaction, `${member.toString()} is already muted.`);

    await bot.say.successMessage(interaction, `${member.user.toString()} has been muted. Reason: \`${reason}\`.`);
    await bot.say.directMessage(member, `You've been muted on ${interaction.guild.name}. Reason: \`${reason}\`.`);

    await bot.utils.updateMuteChannelPerms(interaction.guild, user.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false
    });
    await member.roles.add(muteRole);

    return bot.emit("guildMuteAdd", {
      member,
      executor: interaction.user,
      reason
    });
  }
};