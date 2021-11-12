module.exports = {
  name: "social",
  description: "Social anime image commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "cuddle",
      description: "Express your cuddle with an anime image",
      options: [{
        type: "USER",
        name: "user",
        description: "Whom do you want to cuddle?",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "feed",
      description: "Express your feed with an anime image",
      options: [{
        type: "USER",
        name: "user",
        description: "Whom do you want to feed?",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "hug",
      description: "Express your hug with an anime image",
      options: [{
        type: "USER",
        name: "user",
        description: "Whom do you want to hug?",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "kiss",
      description: "Express your kiss with an anime image",
      options: [{
        type: "USER",
        name: "user",
        description: "Whom do you want to kiss?",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "pat",
      description: "Express your pat with an anime image",
      options: [{
        type: "USER",
        name: "user",
        description: "Whom do you want to pat?",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "slap",
      description: "Express your slap with an anime image",
      options: [{
        type: "USER",
        name: "user",
        description: "Whom do you want to slap?",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "poke",
      description: "Express your poke with an anime image",
      options: [{
        type: "USER",
        name: "user",
        description: "Whom do you want to poke?",
        required: false
      }],
    },
  ]
}