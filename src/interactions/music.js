const avlFilters = require("../data/filters.json");
const { toCapitalize } = require("../utils/functions");

module.exports = {
  name: "music",
  description: "Music commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "autoplay",
      description: "Autoplay related songs after queue end"
    },
    {
      type: "SUB_COMMAND",
      name: "back",
      description: "Back to the previous song",
    },
    {
      type: "SUB_COMMAND",
      name: "clearqueue",
      description: "Clear the current queue.",
    },
    {
      type: "SUB_COMMAND_GROUP",
      name: "filter",
      description: "Music filter commands.",
      options: [
        {
          type: "SUB_COMMAND",
          name: "toogle",
          description: "Toogles a audio filter.",
          options: [{
            type: "STRING",
            name: "name",
            description: "The name of the filter.",
            required: true,
            choices: avlFilters.map((f) => ({
              name: toCapitalize(f),
              value: `${f}`
            }))
          }]
        },
        {
          type: "SUB_COMMAND",
          name: "reset",
          description: "Removes/ reset all applied audio filters."
        },
        {
          type: "SUB_COMMAND",
          name: "show",
          description: "Shows all audio filters."
        }
      ]
    },
    {
      type: "SUB_COMMAND",
      name: "jump",
      description: "Jump to a specific track in the queue.",
      options: [{
        name: "index",
        description: "The song index to jump to",
        type: "NUMBER",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND_GROUP",
      name: "loop",
      description: "Change the loop mode (track|queue|off)",
      category: "music",
      options: [
        {
          type: "SUB_COMMAND",
          name: "mode",
          description: "Shows current set loop mode."
        },
        {
          type: "SUB_COMMAND",
          name: "off",
          description: "Turn the looping off"
        },
        {
          type: "SUB_COMMAND",
          name: "queue",
          description: "Loop the queue (all songs)"
        },
        {
          type: "SUB_COMMAND",
          name: "track",
          description: "Repeat the currently playing song"
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "lyrics",
      description: "Get lyrics for a song.",
      options: [{
        type: "STRING",
        name: "query",
        description: "The song title to search lyrics",
        required: false
     }],
    },
    {
      type: "SUB_COMMAND",
      name: "move",
      description: "Move the selected song to the provided position in the queue",
      options: [
        {
          name: "from",
          description: "The current position of the song",
          type: "NUMBER",
          required: true
        },
        {
          name: "to",
          description: "To which position, the song be moved",
          type: "NUMBER",
          required: true
        }
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "nowplaying",
      description: "Show the current playing song.",
    },
    {
      type: "SUB_COMMAND",
      name: "pause",
      description: "Pause the current playing song.",
    },
    {
      type: "SUB_COMMAND",
      name: "play",
      description: "Play a song or playlist from url or name",
      options: [{
        name: "song",
        description: "The song name/url, you want to play.",
        type: "STRING",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "queue",
      description: "Shows the queue.",
      options: [{
        name: "page",
        description: "The page number of the queue",
        type: "NUMBER",
        required: false
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "remove",
      description: "Remove a specific song from the queue",
      options: [{
        name: "index",
        description: "The song index to remove",
        type: "NUMBER",
        required: true
     }],
    },
    {
      type: "SUB_COMMAND",
      name: "replay",
      description: "Replay the current song.",
    },
    {
      type: "SUB_COMMAND",
      name: "resume",
      description: "Resume the current paused song.",
    },
    {
      type: "SUB_COMMAND",
      name: "seek",
      description: "Seek to a specific position in the current song.",
      options: [{
        name: "duration",
        description: "The duration to seek (i,e. 1m 20s)",
        type: "STRING",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "shuffle",
      description: "Shuffle the queue.",
    },
    {
      type: "SUB_COMMAND",
      name: "skip",
      description: "Skip to the next song",
    },
    {
      type: "SUB_COMMAND",
      name: "songinfo",
      description: "Show details of a specific song.",
      options: [{
        name: "index",
        type: "NUMBER",
        description: "That song index in queue.",
        required: true
      }],
    },
    {
      type: "SUB_COMMAND",
      name: "stop",
      description: "Stop the music.",
    },
    {
      type: "SUB_COMMAND",
      name: "volume",
      description: "Check or change the volume",
      options: [{
        name: "amount",
        description: "The new volume (1-200)",
        type: "NUMBER",
        required: false
      }],
    }
  ]
}