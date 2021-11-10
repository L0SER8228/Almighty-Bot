const fetch = require("node-fetch");
const { hyperlink } = require("@discordjs/builders");

module.exports = {
  commandName: "info",
  name: "github",
  description: "Get information about a GitHub user",
  category: "info",
  options: [{
    type: "STRING",
    name: "username",
    description: "The GitHub username",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const username = interaction.options.getString("username", true);

    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
    const user = await fetch(url).then((res) => res.json());

    if (user?.message === "Not Found")
      return bot.say.worngMessage(interaction, `No github account was found matching \`${query}\`.`);

    const twitter = user.twitter_username ?
      hyperlink(`@${user.twitter_username}`, `https://twitter.com/${user.twitter_username}`) : "N/A";

    const website = user.blog || "N/A";
    const location = user.location || "N/A";
    const bio = user.bio || "N/A";

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${user.login} Profile`)
      .addField("Twitter", twitter, true)
      .addField("Following", user.following.toString(), true)
      .addField("Followers", user.followers.toString(), true)
      .addField("Website", website, true)
      .addField("Location", location, true)
      .addField("URL", user.html_url)
      .setDescription(`**Bio** ${bio}`)
      .setThumbnail(user.avatar_url);

    if (user.name) {
      embed.setAuthor(`${user.name}`);
    }

    return interaction.editReply({ embeds: [embed] });
  }
};