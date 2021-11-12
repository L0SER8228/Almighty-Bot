const allStyles = {
  "3d": "3d",
};

module.exports = {
  name: "fun",
  description: "Fun commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "8ball",
      description: "8Ball question and answer",
      options: [{
        type: "STRING",
        description: "The question that needs to be answered",
        name: "question",
        required: true
     }],
    },
    {
      type: "SUB_COMMAND",
      name: "imgfy",
      description: "Transform text to image",
      category: "fun",
      options: [
        {
          type: "STRING",
          name: "text",
          description: "The text that needs to be imgfy",
          required: true
        },
        {
          type: "STRING",
          name: "style",
          description: "The font style",
          required: false,
          choices: Object.entries(allStyles).map(([name, value]) => ({
            name,
            value
          }))
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "iq",
      description: "Get an IQ score returned",
    },
    {
      type: "SUB_COMMAND",
      name: "lmgtfy",
      description: "Let me google that for ya?",
      options: [{
        type: "STRING",
        name: "query",
        description: "The search query",
        required: true
      }],
    },
  ]
}