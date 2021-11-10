module.exports = {
  commandName: "util",
  name: "avatar",
  description: "View the avatar of a user",
  category: "utility",
  options: [{
    type: "USER",
    name: "user",
    description: "The user you want to see the avatar of (default you)",
    required: false
  }],
  execute(bot, interaction) {
    const user = interaction.options.getUser("user") ?? interaction.user;

    const png = getAvatar(user, "png");
    const webp = getAvatar(user, "webp");
    const jpg = getAvatar(user, "jpg");
    const gif = getAvatar(user, "gif");

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Avatar", `${webp}`)
      .setTitle(`${user.tag}`)
      .setDescription(`[png](${png}) | [webp](${webp}) | [jpg](${jpg}) | [gif](${gif})`)
      .setImage(`${webp}`);

    return interaction.reply({ embeds: [embed] });
  }
};

function getAvatar(user, format) {
  return user.displayAvatarURL({
    dynamic: true,
    size: 4096,
    format: format
  });
}