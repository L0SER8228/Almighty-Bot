module.exports = {
  commandName: "social",
  name: "poke",
  description: "Express your poke with an anime image",
  category: "social",
  options: [{
    type: "USER",
    name: "user",
    description: "Whom do you want to poke?",
    required: false
  }],
  async execute(bot, interaction) {
    const user = interaction.options.getUser("user", false) ?? interaction.user;
    const userTag = interaction.user.id === user.id ? "themselves" : user.username;

    const data = await bot.neko.sfw.poke();

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${interaction.user.username} poked ${userTag}`)
      .setDescription(`[If the image failed to load, click here to view](${data.url})`)
      .setImage(`${data.url}`);

    return interaction.reply({ embeds: [embed] });
  }
};