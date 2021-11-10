const { inlineCode, time } = require("@discordjs/builders");
const badges = require("../../data/badges");

module.exports = {
  commandName: "util",
  name: "userinfo",
  description: "Get information about a user",
  category: "utility",
  options: [{
    type: "USER",
    name: "user",
    description: "The user you want more information about.",
    required: false
  }],
  async execute(bot, interaction) {
    const member = interaction.options.getMember("user") ?? interaction.member;

    const { username, id, tag } = member.user;
    const joinedAt = member.joinedAt ? time(new Date(member.joinedAt), "F") : "Unknown";

    const nickname = member.nickname || "\`none\`";

    const userFlags =
      (await member.user.fetchFlags(true))
      .toArray()
      .map((flag) => badges[flag])
      .join(" ") || "\`none\`";

    const roles =
      member.roles.cache
      .filter((r) => r.id !== interaction.guildId)
      .sort((a, b) => b.rawPosition - a.rawPosition)
      .map((r) => r)
      .join(", ") || "\`none\`";

    const roleCount = member.roles.cache.filter((r) => r.id !== interaction.guildId).size;

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${username}’s Info`)
      .setDescription(
        `**Id** ${inlineCode(id)}
**Tag** ${tag}
**Badges** ${userFlags}
**Created on** ${time(new Date(member.user.createdAt), "F")}`
      )
      .addField("**__Information__**",
        `**Nickname** ${nickname}
**Joined at** ${joinedAt}`
      )
      .addField(`**Roles - ${roleCount}**`, roles)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

    return interaction.reply({ embeds: [embed] });
  }
};