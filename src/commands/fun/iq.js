module.exports = {
  commandName: "fun",
  name: "iq",
  description: "Get an IQ score returned",
  category: "fun",
  execute(bot, interaction) {
    const iq = Math.floor(Math.random() * 100) + 1;

    return bot.say.successMessage(interaction, `Your IQ is \`${iq}\`.`);
  }
};