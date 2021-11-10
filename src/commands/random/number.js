module.exports = {
  commandName: "random",
  name: "number",
  description: "Returns a random number",
  category: "misc",
  options: [
    {
      type: "Number",
      description: "The minimum value (default 1)",
      name: "minimum",
      required: false
    },
    {
      type: "Number",
      description: "The maximum value (default 1000000)",
      name: "maximum",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const min = interaction.options.getNumber("minimum", false) ?? 1;
    const max = interaction.options.getNumber("maximum", false) ?? 1000000;

    const number = (Math.floor(Math.random() * max) + min);

    return interaction.reply({
      content: `**${number.toString()}**`
    });
  }
};