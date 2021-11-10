const fetch = require("node-fetch");

module.exports = {
  commandName: "image",
  name: "trash",
  description: "Put someone in the trash",
  category: "image",
  options: [{
    type: "USER",
    name: "user",
    description: "The user to be trashed",
    required: false
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user") ?? interaction.user;
    const image = `https://api.no-api-key.com/api/v2/delete?image=${user.displayAvatarURL({ format: "png" })}`;

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${image})`)
      .setImage(image);

    return interaction.editReply({ embeds: [embed] });
  }
};