module.exports = {
  name: "giveaway",
  description: "Giveaway commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "end",
      description: "Ends a giveaway",
      options: [{
        type: "STRING",
        name: "id",
        description: "The messageId of the giveaway",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "reroll",
      description: "Re-roll a giveaway",
      options: [{
        type: "STRING",
        name: "id",
        description: "The messageId of the giveaway",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "start",
      description: "Start a new giveaway",
      options: [
        {
          type: "STRING",
          name: "time",
          description: "When the giveaway should end",
          required: true
        },
        {
          type: "STRING",
          name: "prize",
          description: "The giveaway prize",
          required: true
        },
        {
          type: "NUMBER",
          name: "winner",
          description: "The amount of people that can win",
          required: true
        }
      ],
    },
  ]
}