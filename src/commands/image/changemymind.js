const fetch = require("node-fetch");

module.exports = {
  commandName: "image",
  name: "change-my-mind",
  description: "Change my mind..",
  category: "image",
  options: [{
    type: "STRING",
    name: "text",
    description: "The text that needs to be displayed",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const text = interaction.options.getString("text", true);

    const data = await fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${encodeURIComponent(text)}`).then((res) =>
      res.json(),
    );

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${data.message})`)
      .setImage(`${data.message}`);

    return interaction.editReply({ embeds: [embed] });
  }
};