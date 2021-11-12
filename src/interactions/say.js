module.exports = {
  name: "say",
  description: "Cool style say commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "emojify",
      description: "Transform text to emoji block text",
      options: [{
        type: "STRING",
        name: "text",
        description: "The text that you want to transform",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "embed",
      description: "Let the bot say something in a embed",
      options: [{
        type: "STRING",
        name: "text",
        description: "The text to say",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "ascii",
      description: "Transform text to ascii",
      options: [{
        type: "STRING",
        name: "text",
        description: "The text you want to transform",
        required: true
      }],
   },
  ]
}