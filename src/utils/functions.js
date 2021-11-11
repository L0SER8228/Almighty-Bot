const GuildModel = require("../models/Guild.model");
const DJS = require("discord.js");
const logger = require("./logger");

/**
 * Get guild data from database
 * @param {string} guildId
 * @returns {object}
 */
async function getGuild(guildId) {
  try {
    let guild = await GuildModel.findOne({ guild_id: guildId });

    if (!guild && guildId) {
      guild = await addGuild(guildId);
    }

    return guild;
  } catch (error) {
    logger.error("GET_GUILD", error);
  }
}

/**
 * Add guild to database
 * @param {string} guildId
 */
async function addGuild(guildId) {
  try {
    const guild = new GuildModel({ guild_id: guildId });

    await guild.save();

    return guild;
  } catch (error) {
    logger.error("ADD_GUILD", error);
  }
}

/**
 * Update guild database
 * @param {string} guildId
 * @param {object} data
 */
async function updateGuild(guildId, data) {
  try {
    if (typeof data !== "object") {
      throw Error("'data' must be an object (updateGuild)");
    }

    // check if guild exists
    const guild = await getGuild(guildId);

    if (!guild) {
      await addGuild(guildId);
    }

    await GuildModel.findOneAndUpdate({ guild_id: guildId }, data);
  } catch (error) {
    logger.error("UPDATE_GUILD", error);
  }
}

/**
 * Remove a guild from database
 * @param {string} guildId
 */
async function removeGuild(guildId) {
  try {
    await GuildModel.findOneAndDelete({ guild_id: guildId });
  } catch (error) {
    logger.error("REMOVE_GUILD", error);
  }
}

/**
 * Logs error through discord webhook
 * @param {DJS.Client} bot
 * @param {DJS.DiscordAPIError | DJS.HTTPError | Error } error
 * @param {"warning" | "error"} type
 */
async function sendErrorLog(bot, error, type) {
  try {
    if (error.message?.includes("Missing Access")) return;
    if (error.message?.includes("Unknown Message")) return;
    if (error.stack?.includes?.("DeprecationWarning: Listening to events on the Db class")) {
      return;
    }

    if (
      error.stack?.includes("TypeError: Cannot read properties of undefined (reading 'messages')")
    ) {
      return bot.logger.error("ERR_LOG", error);
    }

    const { logsChannel } = require("../../config.json");
    if (!logsChannel) {
      return bot.logger.error("ERR_LOG", error);
    }

    const channel = bot.channels.cache.get(logsChannel) ||
      (await bot.channels.fetch(logsChannel));

    if (!channel) {
      return bot.logger.error("ERR_LOG", error);
    }

    const code = "code" in error ? error.code : "N/A";
    const httpStatus = "httpStatus" in error ? error.httpStatus : "N/A";
    const requestData = "requestData" in error ? error.requestData : { json: {} };

    const name = error.name || "N/A";
    let stack = error.stack || error;
    let jsonString = "";

    try {
      jsonString = JSON.stringify(requestData.json, null, 2);
    } catch {
      jsonString = "";
    }

    if (typeof stack === "string" && stack.length >= 2048) {
      console.error(stack);
      stack = "An error occurred but was too long to send to Discord, check your console.";
    }

    const { codeBlock } = require("@discordjs/builders");

    const embed = new DJS.MessageEmbed()
      .setTitle("An error occurred")
      .addField("Name", name, true)
      .addField("Code", code.toString(), true)
      .addField("httpStatus", httpStatus.toString(), true)
      .addField("Timestamp", bot.logger.now, true)
      .addField("Request data", codeBlock(jsonString?.substr(0, 2045)))
      .setDescription(codeBlock(`${stack}`))
      .setColor(type === "error" ? "RED" : "ORANGE");

    await channel.send({ embeds: [embed] });
  } catch (e) {
    console.error({ error });
    console.error(e);
  }
}

/**
 * Create a webhook for audit logs
 * @param {DJS.Client} bot
 * @param {string} channelId
 * @param {string} [oldHookId]
 */
async function createLogHook(bot, channelId, oldHookId) {
  const channel = bot.channels.cache.get(channelId);
  if (!channel) return;
  if (!bot.user) return;
  if (!channel
    .permissionsFor(bot.user?.id)?.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)
  ) {
    return;
  }

  if (!!oldHookId) {
    const webhooks = await channel.guild.fetchWebhooks();
    await webhooks.find((w) => w.id === oldHookId)?.delete();
  }

  const newHook = await channel.createWebhook(bot.user.username, {
    avatar: bot.user.displayAvatarURL({ format: "png" })
  });

  await updateGuild(channel.guild.id, {
    audit_webhook: newHook.id
  })
}

/**
 * Get audit log webhook
 * @param {DJS.Guild} guild
 */
async function getLogHook(guild) {
  if (!guild) return;
  if (!guild.me) return;
  if (!guild.me.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return undefined;

  const webhooks = await guild.fetchWebhooks().catch(() => null);
  if (!webhooks) return undefined;
  const guildDB = await getGuild(guild.id);
  if (!guildDB) return undefined;
  const hook = webhooks.find((w) => w.id === guildDB.audit_webhook);
  if (!hook) return undefined;

  return hook;
}

/**
 * Find or create the muted role
 * @param {DJS.Guild} guild
 */
async function findOrCreateMutedRole(guild) {
  const guildDB = await getGuild(guild.id);

  return (
    guild.roles.cache.get(guildDB.muted_role) ||
    guild.roles.cache.find((r) => r.name === "muted") ||
    guild.roles.create({
      name: "muted",
      color: "GREY",
      reason: "Mute a user"
    })
  );
}

/**
 * Update all channel permissions for muted role
 * @param {DJS.Guild} guild
 * @param {string} memberId
 * @param {DJS.PermissionOverwriteOptions} perms
 */
function updateMuteChannelPerms(guild, memberId, perms) {
  guild.channels.cache.forEach((channel) => {
    if (channel instanceof DJS.ThreadChannel) return;

    channel.permissionOverwrites
      .create(memberId, perms)
      .catch((e) => {
        logger.error("UPDATE_MUTE_CHANNEL_PERMS", e);
      });
  });
}

/** Check if the bot has the default permissions
 * @param {DJS.Interaction | DJS.TextChannel} resolveable
 * @returns {boolean}
 */
function havePermissions(resolveable) {
  const ch = "channel" in resolveable ? resolveable.channel : resolveable;
  if (ch instanceof DJS.ThreadChannel || ch instanceof DJS.DMChannel) return true;
  const perms = ch.permissionsFor(resolveable.guild.me);
  return (
    perms?.has(DJS.Permissions.FLAGS.VIEW_CHANNEL) &&
    perms?.has(DJS.Permissions.FLAGS.SEND_MESSAGES) &&
    perms?.has(DJS.Permissions.FLAGS.EMBED_LINKS)
  );
}

/**
 * @param {string} str
 * @returns {string}
 */
function toCapitalize(str) {
  if (!str) return null;
  str = str.toString();

  return str.replace(/\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() +
        txt.substr(1).toLowerCase();
    });
}

/**
 * Format number to local string
 * @param {number | string} n
 * @returns {string}
 */
function formatNumber(n) {
  return Number.parseFloat(String(n)).toLocaleString("en-IN");
}

/**
 * @param {number} int
 * @returns {string}
 */
function formatInt(int) {
  return (int < 10 ? `0${int}` : int);
}

/**
 * Format duration to string
 * @param {number} millisec Duration in milliseconds
 * @returns {string}
 */
function formatDuration(millisec) {
  if (!millisec || !Number(millisec)) return "00:00";
  const seconds = Math.round((millisec % 60000) / 1000);
  const minutes = Math.floor((millisec % 3600000) / 60000);
  const hours = Math.floor(millisec / 3600000);
  if (hours > 0) return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  if (minutes > 0) return `${formatInt(minutes)}:${formatInt(seconds)}`;
  return `00:${formatInt(seconds)}`;
};

/**
 * Parse milliseconds from formatted duration
 * @param {string} formatted duration input
 * @returns {number}
 */
function parseMilliseconds(input) {
  const parse = require("parse-duration");
  if (!input) return 0;
  if (!isNaN(input)) return Number(input) || 0;
  try {
    return parse(input, "ms");
  } catch {
    return Number(input.replace(/[^\d.]+/g, "")) || 0;
  }
}

/**
 * Check if interaction member can modify queue
 * @param {DJS.Interaction} interaction
 * @returns {boolean}
 */
function modifyQueue(interaction) {
  const memberChannelId = interaction.member?.voice?.channelId;
  const botChannelId = interaction.guild?.me?.voice?.channelId;

  if (!memberChannelId) {
    return interaction.client.say.wrongMessage(interaction, "You need to join a voice channel first!");
  }

  if (memberChannelId !== botChannelId) {
    return interaction.client.say.wrongMessage(interaction, "You must be in the same voice channel as me!");
  }

  return true;
}

module.exports = {
  addGuild,
  getGuild,
  updateGuild,
  removeGuild,
  createLogHook,
  getLogHook,
  findOrCreateMutedRole,
  updateMuteChannelPerms,
  sendErrorLog,
  havePermissions,
  toCapitalize,
  formatNumber,
  formatDuration,
  parseMilliseconds,
  modifyQueue
};