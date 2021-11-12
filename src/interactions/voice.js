module.exports = {
  name: "voice",
  description: "Voice moderation commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "deafen",
      description: "Deafen a user who is in a voice channel",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to voice deafen",
          required: true
        },
        {
          type: "STRING",
          name: "reason",
          description: "The reason to voice deafen",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "kick",
      description: "Kick a user that is in a voice channel",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to voice kick",
          required: true
        },
        {
          type: "STRING",
          name: "reason",
          description: "The reason to voice kick",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "move",
      description: "Move a user that is in a voice channel to a different voice channel",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to move",
          required: true
        },
        {
          type: "CHANNEL",
          name: "channel",
          description: "To which voice channel, you want to move the user",
          required: true
        },
        {
          type: "STRING",
          name: "reason",
          description: "The reason to move the user",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "mute",
      description: "Mute a user that is in a voice channel",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to voice mute",
          required: true
        },
        {
          type: "STRING",
          name: "reason",
          description: "The reason to voice mute",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "undeafen",
      description: "Undeafen a user that is in a voice channel",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to voice undeafen",
          required: true
        },
        {
          type: "STRING",
          name: "reason",
          description: "The reason to voice undeafen",
          required: false
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "unmute",
      description: "Unmute a user that is in a voice channel",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to voice unmute",
          required: true
        },
        {
          type: "STRING",
          name: "reason",
          description: "The reason to voice unmute",
          required: false
        }
      ],
    },
  ]
}