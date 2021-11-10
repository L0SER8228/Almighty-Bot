const fetch = require("node-fetch");

module.exports = {
  commandName: "image",
  name: "threshold",
  description: "Threshold an user avatar",
  category: "image",
  options: [{
    type: "USER",
    name: "user",
    description: "The user to be threshold",
    required: false
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user") ?? interaction.user;
    const image = `https://some-random-api.ml/canvas/threshold?avatar=${user.displayAvatarURL({ format: "png" })}`;

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${image})`)
      .setImage(image);

    return interaction.editReply({ embeds: [embed] });
  }
};