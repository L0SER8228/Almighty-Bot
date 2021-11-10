module.exports = {
  commandName: "config",
  groupName: "command",
  name: "enable",
  description: "Enable a disabled command on this guild",
  category: "admin",
  options: [{
    type: "STRING",
    name: "command",
    description: "The command name to enable",
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

    if (!disableCmds.includes(name))
      return bot.say.wrongMessage(interaction, "This command is already enabled.");

    await bot.utils.updateGuild(guildId, {
      disabled_commands: disableCmds.filter((c) => c !== name)
    });

    return bot.say.successMessage(interaction, `Enabled **${args}** command.`);
  }
};