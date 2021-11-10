module.exports = {
  name: "leaveguild",
  description: "Leave a guid by the Id",
  category: "botowner",
  ownerOnly: true,
  options: [{
    name: "guild",
    description: "The ID of the guild to leave",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    try {
      const id = interaction.options.getString("guild", true);

      const guild = bot.guilds.cache.get(id);

      if (!guild)
        return bot.say.wrongMessage(interaction, `No guild was found with id \`${id}\`.`);

      await guild.leave();

      return bot.say.successMessage(interaction, `Left **${guild.name}** guild with id \`${id}\`.`);
    } catch (error) {
      return bot.say.wrongMessage(interaction, `${error.message}`);
    }
  }
};