const catDetails = require("../../data/categoryDetails.json");
const categories = require("../../data/categories.json");
const config = require("../../../config.json");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show the help commands menu",
  category: "misc",
  options: [{
    name: "command",
    type: "STRING",
    description: "The command you’r looking for",
    required: false
  }],
  execute(bot, interaction) {
    const args = interaction.options.getString("command", false);
    const arg = args?.replace(" ", "_");
    const cmdArg = arg?.toLowerCase();

    if (cmdArg) {
      const cmd = bot.commands.get(cmdArg);
      if (!cmd)
        return bot.say.wrongMessage(interaction, `No command was found named \`${arg}\`.`);

      const cmdUsage = cmd.options?.length >= 1 ? `\/${args.toLowerCase()} ${cmd.options.map(o => o.required ?
      `<${o.name}>`:`[${o.name}]`).join(" ")}` : `\/${args.toLowerCase()}`;

      const embed = bot.say.baseEmbed(interaction)
        .setAuthor(`${cmd.category} command: ${cmdArg}`, bot.user.displayAvatarURL())
        .addField(`${cmdUsage}`, `${cmd.description ?? "Not specified"}`)
        .setFooter("[] : optional • <> : required • | : or");

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    const cates = [];
    for (let i = 0; i < categories.length; i++) {
      const category = bot.commands.filter(({ category }) => category === categories[i])
        .map(({ name }) => name);
      cates.push(category);
    }

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Help Commands", bot.user.displayAvatarURL())
      .setFooter(`Type '\/help <command>' for more details on a command`);

    for (let j = 0; j < cates.length; j++) {
      const name = catDetails[categories[j]];

      if (categories[j] === "botowner" && !config.owners.includes(interaction.user.id)) continue;

      embed.addField(`${name}`, `\`\`\`${cates[j].join(", ")}\`\`\``);
    };

    const supportBtn = new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL(`${config.supportServer}`);

    const inviteBtn = new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(`${config.inviteLink}`);

    const buttonRow = new MessageActionRow().addComponents([supportBtn, inviteBtn]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [buttonRow] });
  }
};