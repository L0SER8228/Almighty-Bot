const fetch = require("node-fetch");

module.exports = {
  commandName: "random",
  name: "dad-joke",
  description: "Tells a dad joke",
  category: "fun",
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const data = await fetch("https://icanhazdadjoke.com/slack").then((res) => res.json());

    return bot.say.successMessage(interaction, `${data.attachments[0].fallback}`);
  }
};