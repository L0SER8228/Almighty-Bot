const fetch = require("node-fetch");

module.exports = {
  commandName: "random",
  name: "advice",
  category: "fun",
  description: "Gives you some advice",
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const data = await fetch("https://api.adviceslip.com/advice").then((res) => res.json());

    return bot.say.successMessage(interaction, `${data.slip.advice}`);
  }
};