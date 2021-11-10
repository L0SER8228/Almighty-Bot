const { getRandomJoke } = require("one-liner-joke");

module.exports = {
  commandName: "random",
  name: "joke",
  description: "Tells a random joke",
  category: "fun",
  async execute(bot, interaction) {
    const joke = await getRandomJoke({ exclude_tags: ["dirty", "racist", "marriage", "sex", "death"] }).body;

    return bot.say.successMessage(interaction, `${joke}`);
  }
};