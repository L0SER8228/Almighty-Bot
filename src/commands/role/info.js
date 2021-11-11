const DJS = require("discord.js");
const { codeBlock, time } = require("@discordjs/builders");

module.exports = {
  commandName: "role",
  name: "info",
  description: "Get information about a role in the current guild",
  category: "utility",
  options: [{
    type: "ROLE",
    name: "role",
    description: "The role you want more information about",
    required: true
  }],
  async execute(bot, interaction) {
    const role = interaction.options.getRole("role", true);

    const permissions = getPermissions(role, bot);

    const mentionable = role.mentionable ? "Yes" : "No";
    const color = role.color || "#5865f2";
    const position = (interaction.guild.roles.cache.size ?? 0) - role.position;
    const createdAt = "createdAt" in role ? time(new Date(role.createdAt), "F") : "Unknown";
    const hexColor = "hexColor" in role ? role.hexColor : `#${role.color.toString(16).padStart(6, "0")}`;

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`**${role.name}**`)
      .setColor(color)
      .setDescription(
        `**Position:** ${position}
**Mentionable:** ${mentionable}
**Id:** ${role.id}
**Hex Color:** ${hexColor}
**Created On:** ${createdAt}
**Role Mention:** ${role.toString()}`
      )
      .addField("Permissions", permissions);

    return interaction.reply({ embeds: [embed] });
  }
};

function getPermissions(role, bot) {
  const perms = new DJS.Permissions(role.permissions);

  return perms.toArray().length <= 0 ?
    "\`none\`" :
    `${codeBlock(perms.toArray().map((p) => formatCase(p, bot)).join(", "))}`;
}

function formatCase(arg, bot) {
  const text = arg.replace("_", " ");
  return bot.utils.toCapitalize(text);
}