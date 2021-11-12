module.exports = {
  name: "docs",
  description: "Docs commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "djs",
      description: "Find something on the discord.js docs",
      options: [
        {
          type: "STRING",
          name: "query",
          description: "What do you want to search for",
          required: true
        },
        {
          type: "STRING",
          name: "branch",
          description: "The branch (default 'stable')",
          required: false,
          choices: [
            {
              name: "Stable",
              value: "stable"
            },
            {
              name: "Master",
              value: "master"
            }
          ]
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "mdn",
      description: "Find something on the MDN Web Docs.",
      options: [{
        type: "STRING",
        name: "query",
        description: "What do you want to search for",
        required: true
      }],
    },
  ]
}