const DJS = require("discord.js");

module.exports = {
  commandName: "emoji",
  name: "info",
  description: "Get information about an emoji",
  category: "utility",
  options: [{
    type: "STRING",
    description: "The emoji, you want information about",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const emoji = interaction.options.getString("emoji", true);
    const foundEmoji = findEmoji(interaction.guild, emoji);

    if (!foundEmoji)
      return bot.say.wrongMessage(interaction, "That emoji was not found.");

    let emojiAuthor = null;

    try {
      emojiAuthor = await foundEmoji.fetchAuthor().then((v) => v.tag);
    } catch {
      emojiAuthor = "Invalid permissions";
    }

    const accessibleBy = foundEmoji.roles.cache.map((r) => roleMention(r.id)).join(", ") || "everyone";

    const embed = bot.say.baseEmbed(interaction)
      .setURL(`${foundEmoji.url}`)
      .setTitle(`Emoji info: ${foundEmoji}`)
      .setThumbnail(`${foundEmoji.url}`)
      .setDescription(`
**Name:** ${foundEmoji.name}
**Id:** ${foundEmoji.id}
**Created at:** ${time(new Date(foundEmoji.createdAt), "F")}
**Created by:** ${emojiAuthor}
**Access by:** ${accessibleBy}
      `);

    return interaction.editReply({ embeds: [embed] });
  }
}

function findEmoji(guild, arg) {
  const regEx = /^<a?:\w+:(\d+)>$/;
  const regId = arg.replace(regEx, "$1");
  return (
    guild.emojis.cache.find((emoji) => emoji.name === arg) ||
    guild.emojis.cache.find((emoji) => emoji.id === regId)
  );
}