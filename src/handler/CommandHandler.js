const glob = require("glob");

module.exports = async function loadCommands(bot) {
  const commandFiles = glob.sync("./src/commands/**/*.js");

  for (const file of commandFiles) {
    const command = require(`../../${file}`);

    if (!command.name) {
      throw new TypeError(`[ERROR][COMMANDS]: name is required for commands! (${file})`);
    }

    if (!command.execute) {
      throw new TypeError(
        `[ERROR][COMMANDS]: execute function is required for commands! (${file})`
      );
    }

    if (!command.category) {
      bot.logger.warn("[COMMANDS]", `${command.name} command will not be shown in the help command because no category is set.`);
    }

    let commandName;

    if ("commandName" in command) {
      const groupName = command.groupName;
      const topLevelName = command.commandName;

      if (groupName) {
        commandName = `${topLevelName}-${groupName}-${command.name}`;
      } else {
        commandName = `${topLevelName}-${command.name}`;
      }
    } else {
      commandName = command.name;

      const data = {
        type: "CHAT_INPUT",
        name: command.name,
        description: command.description ?? "Empty description",
        options: command.options ?? []
      };

      await bot.application?.commands.create(data);
    }

    delete require.cache[require.resolve(`../../${file}`)];

    bot.commands.set(commandName, command);

    //debug
    //  bot.logger.debug("COMMANDS", `Loaded: ${commandName}`);
  }
};