module.exports = {
  name: "user",
  description: "User utility commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "info",
      description: "Get information about a user",
      options: [{
        type: "USER",
        name: "user",
        description: "The user you want more information about.",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "avatar",
      description: "View the avatar of a user",
      options: [{
        type: "USER",
        name: "user",
        description: "The user you want to see the avatar of (default you)",
        required: false
      }],
    },
  ]
}