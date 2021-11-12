module.exports = {
  name: "emoji",
  description: "Emoji commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "enlarge",
      description: "Enlarge an emoji",
      options: [{
        type: "STRING",
        name: "emoji",
        description: "The emoji you want to enlarge",
        required: true
     }],
    },
    {
      type: "SUB_COMMAND",
      name: "info",
      description: "Get information about an emoji",
      options: [{
        type: "STRING",
        name: "emoji",
        description: "The emoji, you want information about",
        required: true
     }],
    },
    {
      type: "SUB_COMMAND",
      name: "steal",
      description: "Steal an emoji from a different guild and add to this guild",
      options: [
        {
          type: "STRING",
          name: "emoji",
          description: "The emoji you want to steal",
          required: true
        },
        {
          type: "STRING",
          name: "name",
          description: "The name of the emoji",
          required: false
        }
      ],
    },
  ]
}