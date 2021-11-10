const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  commandName: "activity",
  name: "spellcast",
  description: "Make a spellcast game voice channel.",
  category: "activity",
  options: [{
    type: "CHANNEL",
    name: "channel",
    description: "Mention the voice channel.",
    required: false
  }],
  async execute(bot, interaction) {
    const channel = interaction.options.getChannel("channel", false) ?? interaction.member?.voice?.channel;

    if (!channel)
      return bot.say.wrongMessage(interaction, "You have to join or mention a voice channel.");

    if (!channel.viewable)
      return bot.say.wrongMessage(interaction, "I need \`View Channel\` permission.");

    if (channel.type !== "GUILD_VOICE")
      return bot.say.wrongMessage(interaction, "Provide a valid guild voice channel.");

    if (!channel.permissionsFor(interaction.guild.me)?.has(1n))
      return bot.say.wrongMessage(interaction, "I need \`Create Invite\` permission.");

    const invite = await channel.createInvite({
      targetApplication: "879863881349087252",
      targetType: 2
    });

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`Successfully setup **Spell Cast** game activity to **${channel.name}** channel.`);

    const btnRow = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Join")
      .setStyle("LINK")
      .setURL(`https:\/\/discord.com\/invite\/${invite.code}`)
      ]);

    return interaction.reply({ embeds: [embed], components: [btnRow] }).catch(console.error);
  }
};
