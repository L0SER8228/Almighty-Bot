const DJS = require("discord.js");

module.exports = {
  commandName: "channel",
  name: "nuke",
  description: "Nuke a channel. Note: The channel will instantly be deleted and re-created.",
  category: "mod",
  botPermissions: [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
  memberPermissions: [DJS.Permissions.FLAGS.ADMINISTRATOR],
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
      description: "Channel nuke reason if any",
      required: false
    }
  ],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const reason = interaction.options.getString("reason", false);
    const channel = interaction.options.getChannel("channel", false) ?? interaction.channel;

    const threadChannels = ["GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"];
    if (threadChannels.includes(channel.type))
      return bot.say.worngMessage(interaction, `Cannot use this command for ${channel.toString()} channel.`);

    if (!channel.deletable)
      return bot.say.worngMessage(interaction, `${channel.toString()} channel can’t be nuked.`);

    const embed = bot.say.baseEmbed("YELLOW")
      .setTitle(`Nuking ${channel.name} channel`)
      .setDescription(`The following will be done and it **can't be undone.**
      
- All **exiting messages** will be **deleted**
- This **channel** will be **deleted**
- A **new channel** will be **created**. (Note: The new channel will a clone of this channel, so name, topic, permissions, position will remain same.`);

    const cancelEmbed = bot.say.baseEmbed("ORANGE")
      .setDescription("Alright, nuke cancelled");

    const confirEmbed = bot.say.baseEmbed(interaction).setDescription(`💥 Nuked this channel.${reason ? ` Reason: \`${reason}\`` : ""}.`);

    const confirmBtn = new MessageButton()
      .setStyle("SUCCESS")
      .setLabel("Sure, nuke it.")
      .setCustomId("confirm");

    const cancelBtn = new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("Nah, don't nuke.")
      .setCustomId("cancel");

    const btnRow = new MessageActionRow()
      .addComponents([confirmBtn, cancelBtn]);

    const msg = await interaction.editReply({
      embeds: [embed],
      components: [btnRow]
    });

    const collector = msg.createMessageComponentCollector({
      filter: (ctx) => ctx.customId.endsWith(ra),
      time: 60000
    });

    collector.on("collect", async (ctx) => {

      if (ctx.customId === "confirm") {
        const position = channel.position;
        const topic = channel.topic ?? "";

        const channel2 = await channel.clone({ position, topic });

        await channel.delete();

        return channel2.send({ embeds: [confirmEmbed] });

      } else {
        interaction.editReply({ embeds: [cancelEmbed], components: [] });
        collector.stop();
      }

      ctx.deferUpdate();
    });

    collector.on("end", (_, reason) => {
      if (reason === "time") {
        interaction.editReply({ embeds: [cancelEmbed], components: [] });
      }
    });
  }
};