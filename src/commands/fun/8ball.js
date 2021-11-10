const allAnswers = require("../../data/8ballAnswers.json");

module.exports = {
  commandName: "fun",
  name: "8ball",
  description: "8Ball",
  category: "fun",
  options: [{
    type: "STRING",
    description: "The question that needs to be answered",
    name: "question",
    required: true
  }],
  async execute(bot, interaction) {
    const question = interaction.options.getString("question", true);
    const answer = allAnswers[Math.floor(Math.random() * allAnswers.length)];

    const embed = bot.say.baseEmbed(interaction)
      .setTitle("8Ball")
      .addField("Question", `${question}`)
      .addField("Answer", `${answer}`);

    return interaction.reply({ embeds: [embed] });
  }
};