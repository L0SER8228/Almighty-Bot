const { owners } = require("../../../config.json");
const permData = require("../../data/permissions.json");

module.exports = {
  name: "interactionCreate",
  async execute(bot, interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return;

    await bot.application?.commands.fetch(interaction.commandId).catch(() => null);

    try {
      const commandName = interaction.commandName;
      const subCmdGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = interaction.options.getSubcommand(false);

      let cmdArg;
      if (subCommand) {
        if (subCmdGroup) {
          cmdArg = `${commandName}-${subCmdGroup}-${subCommand}`;
        } else {
          cmdArg = `${commandName}-${subCommand}`;
        }
      } else {
        cmdArg = commandName;
      }

      const command = bot.commands.get(cmdArg);

      if (!command) return;
      if (!interaction.commandId) return;

      const db = await bot.utils.getGuild(interaction.guildId);
      // an error occurred
      if (!db) return;
      
      if (interaction.member.roles.cache.some(r => db.blacklisted_roles.includes(r.id)) && !interaction.member.permissions.has(8n))
        return bot.say.wrongMessage(interaction, "You’re blacklisted from using this bot on this guild.");

      if (db.disabled_commands.includes(cmdArg))
        return bot.say.wrongMessage(interaction, "This command is disabled on this guild.");

      if (command.botPermissions) {
        const neededBotPerms = [];
        command.botPermissions.forEach((perm) => {
          if (
            !interaction.channel.permissionsFor(interaction.guild.me)?.has(perm)
          ) {
            neededBotPerms.push(perm);
          }
        });

        if (neededBotPerms.length >= 1) {
          return bot.say.wrongMessage(interaction, `I need ${neededBotPerms.map((p) => `**\`${permData[p]}\`**`).join(", ")} permissions!`);
        }
      }

      if (command.memberPermissions) {
        const neededMemberPerms = [];
        command.memberPermissions.forEach((perm) => {
          if (
            !interaction.channel.permissionsFor(interaction.member)?.has(perm)
          ) {
            neededMemberPerms.push(perm);
          }
        });

        if (neededMemberPerms.length >= 1) {
          return bot.say.wrongMessage(interaction, `You don’t have ${neededMemberPerms.map((p) => `**\`${permData[p]}\`**`).join(", ")} permissions!`);
        }
      }

      if (command.category === "admin" && !interaction.member.permissions.has(8n))
        return bot.say.wrongMessage(interaction, "You need \`Administrator\` permission to run this command.");

      if ((command.category === "botowner" || command.ownerOnly === true) && !owners.includes(interaction.user.id))
        return bot.say.wrongMessage(interaction, "This command can only be used by the bot owners.");

      if (!!db.djRole && command.dj && !interaction.member.roles.cache.some((r) => r.id !== djRole))
        return bot.say.wrongMessage(interaction, "Non DJs can't use this command.");

      await command.execute(bot, interaction, db);
    } catch (err) {
      bot.utils.sendErrorLog(bot, err, "error");
      if (interaction.replied) return;
      return bot.say.wrongMessage(interaction, "Something went wrong. Sorry for the inconveniences.");
    }
  }
};