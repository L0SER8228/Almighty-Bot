const allStyles = {
  "3d": "3d",
};

module.exports = {
  commandName: "fun",
  name: "imgfy",
  description: "Transform text to image",
  category: "fun",
  options: [
    {
      type: "STRING",
      name: "text",
      description: "The text that needs to be imgfy",
      required: true
    },
    {
      type: "STRING",
      name: "style",
      description: "The font style",
      required: false,
      choices: Object.entries(allStyles).map(([name, value]) => ({
        name,
        value
      }))
    }
  ],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const text = interaction.options.getString("text", true);
    const style = interaction.options.getString("style", false) ?? "3d";

    const image = `https://flamingtext.com/net-fu/proxy_form.cgi?script=${style}-logo&text=${encodeURIComponent(text)}&_loc=generate&imageoutput=true`;

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[If the image failed to load, click here to view](${image})`)
      .setImage(image);

    return interaction.editReply({ embeds: [embed] });
  }
};