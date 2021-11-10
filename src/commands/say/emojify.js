module.exports = {
  commandName: "say",
  name: "emojify",
  description: "Transform text to emoji block text",
  category: "misc",
  options: [{
    type: "STRING",
    name: "text",
    description: "The text that you want to transform",
    required: true
  }],
  execute(bot, interaction) {
    const text = interaction.options.getString("text", true);

    const blocks = text
      .toLowerCase()
      .replace(/[a-z]/g, ":regional_indicator_$&:")
      .replace(/1/g, ":one:")
      .replace(/2/g, ":two:")
      .replace(/3/g, ":three:")
      .replace(/4/g, ":four:")
      .replace(/5/g, ":five:")
      .replace(/6/g, ":six:")
      .replace(/7/g, ":seven:")
      .replace(/8/g, ":eight:")
      .replace(/9/g, ":nine:")
      .replace(/0/g, ":zero:");

    return interaction.reply({ content: `${blocks}` });
  }
};