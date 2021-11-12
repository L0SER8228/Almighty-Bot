module.exports = {
  name: "bot",
  description: "Bot stuff commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "info",
      description: "Shows info about the bot",
    },
    {
      type: "SUB_COMMAND",
      name: "invite",
      description: "Invite the bot to your server",
    },
    {
      type: "SUB_COMMAND",
      name: "ping",
      description: "Ping? Pong!",
    },
    {
      type: "SUB_COMMAND",
      name: "support",
      description: "Join the discord support server and get some help",
    },
    {
      type: "SUB_COMMAND",
      name: "uptime",
      description: "Returns the uptime of the bot",
   },
  ]
}