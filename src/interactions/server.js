module.exports = {
  name: "server",
  description: "Server utility commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "info",
      description: "Get information about the server",
    },
    {
      type: "SUB_COMMAND",
      name: "icon",
      description: "View the icon/logo of the server",
    },
    {
      type: "SUB_COMMAND",
      name: "banner",
      description: "View the banner of the server",
   },
  ]
}