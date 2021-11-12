module.exports = {
  name: "role",
  description: "Role commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "add",
      description: "Add a role to a user",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user who needs role.",
          required: true
        },
        {
          type: "ROLE",
          name: "role",
          description: "The role you want to add",
          required: true
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "info",
      description: "Get information about a role in the current guild",
      options: [{
        type: "ROLE",
        name: "role",
        description: "The role you want more information about",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "remove",
      description: "Remove a role from a user",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user, from whom role will be removed",
          required: true
        },
        {
          type: "ROLE",
          name: "role",
          description: "The role you want to remove",
          required: true
        }
      ],
    },
  ]
}