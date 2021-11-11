const { inviteLink } = require("../../../config.json");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  commandName: "bot",
  name: "invite",
  description: "Invite the bot to your server",
  category: "misc",
  execute(bot, interaction) {
    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Click to invite me to your server.](${inviteLink})`);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Invite Link")
      .setStyle("LINK")
      .setURL(`${inviteLink}`)
    ]);

    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};