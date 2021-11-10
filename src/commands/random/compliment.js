const fetch = require("node-fetch");

module.exports = {
  commandName: "random",
  name: "compliment",
  description: "Get a compliment",
  category: "fun",
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const data = await fetch("https://complimentr.com/api").then((res) => res.json());

    return bot.say.successMessage(interaction, `${data.complement}`);
  }
};