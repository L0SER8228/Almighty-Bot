module.exports = {
  commandName: "social",
  name: "cuddle",
  description: "Express your cuddle with an anime image",
  category: "social",
  options: [{
    type: "USER",
    name: "user",
    description: "Whom do you want to cuddle?",
    required: false
  }],
  async execute(bot, interaction) {
    const user = interaction.options.getUser("user", false) ?? interaction.user;
    const userTag = interaction.user.id === user.id ? "themselves" : user.username;

    const data = await neko.sfw.cuddle();

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${interaction.user.username} cuddled ${userTag}`)
      .setDescription(`[If the image failed to load, click here to view](${data.url})`)
      .setImage(`${data.url}`);

    return interaction.reply({ embeds: [embed] });
  }
};