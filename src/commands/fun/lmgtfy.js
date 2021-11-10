module.exports = {
  commandName: "fun",
  name: "lmgtfy",
  description: "Let me google that for ya?",
  category: "fun",
  options: [{
    type: "STRING",
    name: "query",
    description: "The search query",
    required: true
  }],
  execute(bot, interaction) {
    const query = interaction.options.getString("query", true);

    const url = `https://lmgtfy.com/?s=g&q=${encodeURIComponent(query)}`;

    return interaction.reply({ content: url });
  }
};