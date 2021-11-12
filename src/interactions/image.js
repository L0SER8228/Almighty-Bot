module.exports = {
  name: "image",
  description: "Image manipulation commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "change-my-mind",
      description: "Change my mind..",
      options: [{
        type: "STRING",
        name: "text",
        description: "The text that needs to be displayed",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "clyde",
      description: "Let clyde say something",
      options: [{
        type: "STRING",
        name: "text",
        description: "The text that needs to be displayed",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "giphy",
      description: "Search for a image on giphy",
      options: [{
        type: "STRING",
        name: "query",
        description: "A search query for the image",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "magik",
      description: "Just Magik.",
      options: [
        {
          name: "user",
          description: "A user (default you)",
          type: "USER",
          required: false
        },
        {
          name: "intensity",
          description: "The intensity of the Magik",
          type: "NUMBER",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "pikachu",
      description: "Shows an image of a pikachu",
    },
    {
      type: "SUB_COMMAND",
      name: "invert",
      description: "Invert an user avatar",
      options: [{
        type: "USER",
        name: "user",
        description: "A user (default you)",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "threshold",
      description: "Threshold an user avatar",
      options: [{
        type: "USER",
        name: "user",
        description: "The user to be threshold",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "trash",
      description: "Put someone in the trash",
      options: [{
        type: "USER",
        name: "user",
        description: "The user to be trashed",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "tweet",
      description: "Display an image with your tweet",
      options: [{
        type: "STRING",
        name: "text",
        description: "The text that needs to be tweeted",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "web",
      description: "View a screenshot of a website",
      options: [{
        type: "STRING",
        name: "url",
        description: "The URL of the website",
        required: true
      }],
    },
  ]
}