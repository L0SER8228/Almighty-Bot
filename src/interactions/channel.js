module.exports = {
  name: "channel",
  description: "Channel commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "info",
      description: "Get information about a channel",
      options: [{
        type: "CHANNEL",
        description: "Mention the channel (default current)",
        name: "channel",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "lock",
      description: "Lock a channel",
      options: [
        {
          type: "CHANNEL",
          name: "channel",
          description: "Mention the channel (default current)",
          required: false
        },
        {
          type: "STRING",
          name: "reason",
          description: "Channel lock reason if any",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "nuke",
      description: "Nuke a channel.",
      options: [
        {
          type: "CHANNEL",
          name: "channel",
          description: "Mention the channel (default current)",
          required: false
        },
        {
          type: "STRING",
          name: "reason",
          description: "Channel nuke reason if any",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "unlock",
      description: "Unlock a channel",
      category: "mod",
      options: [
        {
          type: "CHANNEL",
          name: "channel",
          description: "Mention the channel (default current)",
          required: false
        },
        {
          type: "STRING",
          name: "reason",
          description: "Channel unlock reason if any",
          required: false
        }
      ],
    },
  ]
}