const googleTranslate = require("@iamtraction/google-translate");
const { codeBlock } = require("@discordjs/builders");

module.exports = {
  commandName: "misc",
  name: "translate",
  description: "Translate something to your favourite language",
  category: "misc",
  options: [
    {
      type: "STRING",
      name: "language",
      description: "The language you want to translate to",
      required: true
    },
    {
      type: "STRING",
      name: "sentence",
      description: "The sentence you want to translate",
      required: true
    }
  ],
  async execute(bot, interaction) {
    const language = interaction.options.getString("language", true);
    const sentence = interaction.options.getString("sentence", true);

    if (sentence.length > 1500)
      return bot.say.wrongMessage(interaction, "Please use sentence below 1500 character.");

    const result = await googleTranslate(sentence, { to: language });

    const embed = bot.say.baseEmbed(interaction)
      .setTitle("Google Translator")
      .setDescription(
        `Target Language: ${language}
Input:\n${codeBlock(sentence)}
Output:\n${codeBlock(result.text)}`
      );

    return interaction.reply({ embeds: [embed] });
  }
};