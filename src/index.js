require("dotenv/config");
require("./modules/checkValid");
require("./modules/database");

const DJS = require("discord.js");
const { Player } = require("discord-player");
const logs = require("discord-logs");
const NekoClient = require("nekos.life");
const MongoGiveawayManager = require("./modules/GiveawayManager");

const logger = require("./utils/logger");
const Embeds = require("./utils/Embeds");
const Utils = require("./utils/functions");

const bot = new DJS.Client({
  intents: [
    DJS.Intents.FLAGS.GUILDS,
    DJS.Intents.FLAGS.GUILD_MESSAGES,
    DJS.Intents.FLAGS.GUILD_BANS,
    DJS.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    DJS.Intents.FLAGS.GUILD_MEMBERS,
    DJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    DJS.Intents.FLAGS.GUILD_VOICE_STATES,
    DJS.Intents.FLAGS.GUILD_INTEGRATIONS
  ],
  partials: [
    DJS.Constants.PartialTypes.GUILD_MEMBER,
    DJS.Constants.PartialTypes.USER,
    DJS.Constants.PartialTypes.REACTION,
    DJS.Constants.PartialTypes.CHANNEL,
    DJS.Constants.PartialTypes.MESSAGE
  ],
  restRequestTimeout: 25000,
  allowedMentions: { parse: ["roles", "users"], repliedUser: false }
});
logs(bot);

bot.commands = new DJS.Collection();

bot.logger = logger;
bot.utils = Utils;
bot.say = Embeds;

bot.player = new Player(bot, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 60000,
  autoSelfDeaf: true,
  initialVolume: 100
});

bot.giveawayManager = new MongoGiveawayManager(bot, {
  updateCountdownEvery: 10000,
  storage: undefined,
  default: {
    embedColor: "#5865f2",
    botsCanWin: false,
    reaction: "🎉",
    embedColorEnd: "#5865f2"
  }
});

bot.neko = new NekoClient();

require("./handler/EventHandler")(bot);

bot.login(process.env["DISCORD_BOT_TOKEN"]);

// Unhandled errors
process.on("unhandledRejection", (error) => Utils.sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) => Utils.sendErrorLog(bot, error, "error"));

process.on("warning", (warning) => {
  Utils.sendErrorLog(bot, warning, "warning");
});