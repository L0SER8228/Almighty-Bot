module.exports = {
  name: "info",
  description: "Information commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "country",
      description: "Show information about a country",
      options: [{
        type: "STRING",
        name: "name",
        description: "The country name",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "covid",
      description: "Get COVID-19 information",
      options: [{
        name: "country",
        description: "The country you want extra information of",
        type: "STRING",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "github",
      description: "Get information about a GitHub user",
      options: [{
        type: "STRING",
        name: "username",
        description: "The GitHub username",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "imdb",
      description: "Get information about a series or a movie from IMDB",
      options: [{
        type: "STRING",
        name: "query",
        description: "What you're looking for",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "invite",
      description: "Get information about an invite code",
      options: [{
        type: "STRING",
        name: "code",
        description: "The invite code/url",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "ip",
      description: "Get information about an IP address",
      options: [{
        type: "STRING",
        name: "ip",
        description: "The IP address you want to lookup",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "minecraft",
      description: "Get info about a minecraft server",
      options: [{
        name: "query",
        description: "The server IP",
        type: "STRING",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "npm",
      description: "Search packages on npm by their name",
      options: [{
        type: "STRING",
        name: "query",
        description: "The search query",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "pokemon",
      description: "Show a pokémon information",
      options: [{
        type: "STRING",
        name: "query",
        description: "The pokemon name",
        required: true
     }],
    },
    {
      type: "SUB_COMMAND",
      name: "weather",
      description: "Get weather information of a place",
      options: [{
        type: "STRING",
        name: "query",
        description: "Can be a country, city, state",
        required: true
      }],
    },
  ]
}