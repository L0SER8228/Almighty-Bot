module.exports = {
  name: "random",
  description: "Random stuff commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "advice",
      description: "Gives you some advice",
    },
    {
      type: "SUB_COMMAND",
      name: "meme",
      description: "Show a funny meme",
    },
    {
      type: "SUB_COMMAND",
      name: "joke",
      description: "Tells a random joke",
    },
    {
      type: "SUB_COMMAND",
      name: "dadjoke",
      description: "Tells a dad joke",
    },
    {
      type: "SUB_COMMAND",
      name: "compliment",
      description: "Get a compliment",
    },
    {
      type: "SUB_COMMAND",
      name: "color",
      description: "Show a random color",
    },
    {
      type: "SUB_COMMAND",
      name: "quote",
      description: "Shows a random quote",
    },
    {
      type: "SUB_COMMAND",
      name: "number",
      description: "Returns a random number",
    },
  ]
}