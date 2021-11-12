module.exports = {
  name: "config",
  description: "Guild configuration commands",
  options: [
    {
      type: "SUB_COMMAND_GROUP",
      name: "blacklist",
      description: "Blacklist add, remove, show commands.",
      options: [
        {
          type: "SUB_COMMAND",
          name: "add",
          description: "Blacklist a role from using this bot",
          options: [{
            type: "ROLE",
            name: "role",
            description: "Mention the role to blacklist.",
            required: true
          }],
        },
        {
          type: "SUB_COMMAND",
          name: "remove",
          description: "Unblacklist a role and allow to use this bot",
          options: [{
            type: "ROLE",
            name: "role",
            description: "Mention the role to unblacklist.",
            required: true
          }],
        },
        {
          type: "SUB_COMMAND",
          name: "show",
          description: "Show all blacklisted",
        },
      ]
    },
    {
      type: "SUB_COMMAND_GROUP",
      name: "command",
      description: "Command disable, enable.",
      options: [
        {
          type: "SUB_COMMAND",
          name: "disable",
          description: "Disable a command on this guild",
          options: [{
            type: "STRING",
            name: "command",
            description: "The command name to disable",
            required: true
          }],
        },
        {
          type: "SUB_COMMAND",
          name: "enable",
          description: "Enable a disabled command on this guild",
          options: [{
            type: "STRING",
            name: "command",
            description: "The command name to enable",
            required: true
          }],
        },
      ]
    },
    {
      type: "SUB_COMMAND_GROUP",
      name: "set",
      description: "Set guild specific config",
      options: [
        {
          type: "SUB_COMMAND",
          name: "welcome-channel",
          description: "Set the welcome channel",
          options: [{
            type: "CHANNEL",
            name: "channel",
            description: "Mention a text channel",
            required: true
          }],
        },
        {
          type: "SUB_COMMAND",
          name: "welcome-role",

          description: "Set the welcome role",
          options: [{
            type: "ROLE",
            name: "role",
            description: "Mention the role",
            required: true
          }],
        },
        {
          type: "SUB_COMMAND",
          name: "goodbye-channel",
          description: "Set the goodbye channel",
          options: [{
            type: "CHANNEL",
            name: "channel",
            description: "Mention a text channel",
            required: true
          }],
        },
        {
          type: "SUB_COMMAND",
          name: "auditlog",
          description: "Set the auditlog channel",
          options: [{
            type: "CHANNEL",
            name: "channel",
            description: "Mention a text channel",
            required: true
          }],
        },
        {
          type: "SUB_COMMAND",
          name: "djrole",
          description: "Set music dj role",
          options: [{
            type: "ROLE",
            name: "role",
            description: "The role to set",
            required: true
          }],
        },
      ]
    },
    {
      type: "SUB_COMMAND",
      name: "reset",
      description: "Reset guild specific config.",
      options: [{
        type: "STRING",
        name: "option",
        description: "That specific setting",
        required: true,
        choices: [
          {
            name: "Welcome Channel",
            value: "welcome_channel"
          },
          {
            name: "Goodbye Channel",
            value: "goodbye_channel"
          },
          {
            name: "Welcome Role",
            value: "welcome_role"
          },
          {
            name: "Audit Logs",
            value: "audit_webhook"
          },
          {
            name: "Mute Role",
            value: "muted_role"
          },
          {
            name: "DJ Role",
            value: "dj_role"
          },
        ]
      }],
    },
 ]
}