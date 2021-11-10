module.exports = {
  commandName: "image",
  name: "invert",
  description: "Invert an user avatar",
  category: "image",
  options: [{
    type: "USER",
    name: "user",
    description: "A user (default you)",
    required: false
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user") ?? interaction.user;
    const image = `https://some-random-api.ml/canvas/invert?avatar=${user.displayAvatarURL({ format: "png" })}`;

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${image})`)
      .setImage(image);

    return interaction.editReply({ embeds: [embed] });
  }
};