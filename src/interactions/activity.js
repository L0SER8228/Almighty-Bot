module.exports = {
  name: "activity",
  description: "Activity game commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "awkword",
      description: "Mix and match clever prompts and phrases in this hilarious word game!",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "betrayal",
      description: "Play this mystery game together to solve who among you is a betrayer to the crew!",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "chess",
      description: "Play chess in the park together with your friends!",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "doodlecrew",
      description: "Paint, Illustrate, Communicate, in this competitive doodling game!",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "fishington",
      description: "Play fishington.io with your friends together.",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "lettertile",
      description: "Craft words from a set of tiles, and let your lexicon fly!",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "pokernight",
      description: "Play poker with your friends together.",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "putts",
      description: "Make a putts game voice channel.",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "spellcast",
      description: "Make a spellcast game voice channel.",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "watchtogether",
      description: "Watch YouTube together with your friends.",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "wordsnack",
      description: "Whip up letter combinations in this sizzling fast word game!",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "checkers",
      description: "Play checkers with your friends together.",
      options: [{
        type: "CHANNEL",
        name: "channel",
        description: "Mention the voice channel.",
        required: false
      }],
    },
  ]
}