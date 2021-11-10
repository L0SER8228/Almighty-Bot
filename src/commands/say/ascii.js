const figlet = require("figlet");
const { codeBlock } = require("@discordjs/builders");

module.exports = {
  commandName: "say",
  name: "ascii",
  description: "Transform text to ascii",
  category: "misc",
  options: [{
    type: "STRING",
    name: "text",
    description: "The text you want to transform",
    required: true
  }],
  execute(bot, interaction) {
    const text = interaction.options.getString("text", true);

    figlet.text(text, (e, txt) => {
      if (e) return;

      return interaction.reply({
        content: codeBlock(txt?.trimRight() ?? "UNKNOWN")
      });
    });
  }
};