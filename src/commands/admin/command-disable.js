const { owners } = require("../../../config.json");
const saveCommands = ["help", "support", "invite", "enable", "disable"];

module.exports = {
  commandName: "config",
  groupName: "command",
  name: "disable",
  description: "Disable a command on this guild",
  category: "admin",
  options: [{
    type: "STRING",
    name: "command",
    description: "The command name to disable",
    required: true
  }],
  async execute(bot, interaction, db) {
    const args = interaction.options.getString("command", true);

    const guildId = interaction.guild.id;

    const disableCmds = db.disabled_commands;

    const name = args.replace(" ", "-").toLowerCase();

    const command = bot.commands.get(name);

    if (!command)
      return bot.say.wrongMessage(interaction, `${args} is not a valid command name.`)

    if (saveCommands.includes(name))
      return bot.say.wrongMessage(interaction, "This command cannot not be disabled.");

    if ((command.category === "botowner" || command.ownerOnly === true) && !owners.includes(interaction.user.id))
      return bot.say.wrongMessage(interaction, "Invalid command name provided.");

    if (disableCmds.includes(name))
      return bot.say.wrongMessage(interaction, "This Command is already disabled");

    await bot.utils.updateGuild(guildId, {
      disabled_commands: [...disableCmds, name]
    });

    return bot.say.successMessage(interaction, `Disabled **${args}** command.`);
  }
};