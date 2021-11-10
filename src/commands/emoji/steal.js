const DJS = require("discord.js");

module.exports = {
  commandName: "emoji",
  name: "steal",
  description: "Steal an emoji from a different guild and add to this guild",
  category: "utility",
  botPermissions: [DJS.Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
  options: [
    {
      type: "STRING",
      name: "emoji",
      description: "The emoji you want to steal",
      required: true
    },
    {
      type: "STRING",
      name: "name",
      description: "The name of the emoji",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const emoji = interaction.options.getString("emoji", true);
    let name = interaction.options.getString("name", false);

    const customEmoji = DJS.Util.parseEmoji(emoji);

    if (!customEmoji.id)
      return bot.say.worngMessage(interaction, "Invalid emoji provided.");

    const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
        customEmoji?.animated ? "gif" : "png"
      }`;
    if (!name) name = customEmoji.name;

    try {
      await interaction.guild.emojis.create(link, name);
    } catch (err) {
      return bot.say.worngMessage(interaction, `${err.message || "An unknown error occurred"}`);
    }

    return bot.say.successMessage(interaction, `${emoji}, ${name} added successfully!`);
  }
}