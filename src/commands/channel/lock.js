const DJS = require("discord.js");

module.exports = {
  commandName: "channel",
  name: "lock",
  description: "Lock a channel",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
  options: [
    {
      type: "CHANNEL",
      name: "channel",
      description: "Mention the channel (default current)",
      required: false
    },
    {
      type: "STRING",
      name: "reason",
      description: "Channel lock reason if any",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const reason = interaction.options.getString("reason", false);
    const channel = interaction.options.getChannel("channel", false) ?? interaction.channel;

    const threadChannels = ["GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"];
    if (threadChannels.includes(channel.type))
      return bot.say.worngMessage(interaction, `Can’t run this command for ${channel.toString()} channel.`);

    if (!channel.permissionsFor(interaction.guildId)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES))
      return bot.say.worngMessage(interaction, `${channel.toString()} channel is already locked.`);

    await channel.permissionOverwrites.create(interaction.guildId, {
      SEND_MESSAGES: false
    });

    return bot.say.successMessage(interaction, `Locked ${channel.toString()} channel. ${reason ? `Reason: \`${reason}\`` : ""}.`);
  }
};