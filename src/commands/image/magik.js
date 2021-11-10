const fetch = require("node-fetch");

module.exports = {
  commandName: "image",
  name: "magik",
  description: "Just Magik.",
  category: "image",
  options: [
    {
      name: "user",
      description: "A user (default you)",
      type: "USER",
      required: false
    },
    {
      name: "intensity",
      description: "The intensity of the Magik",
      type: "NUMBER",
      required: false
    }
  ],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user") ?? interaction.user;
    const intensity = interaction.options.getNumber("intensity") ?? Math.floor(Math.random() * 10);

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=magik&intensity=${encodeURIComponent(intensity)}&image=${user?.displayAvatarURL({format: "png"})}`
    ).then((res) => res.json());

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.message})`)
      .setImage(data.message);

    return interaction.editReply({ embeds: [embed] });
  }
};