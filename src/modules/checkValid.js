const config = require("../../config.json");
const logger = require("../utils/logger");

function checkValid() {
  const nodeV = parseFloat(process.versions.node);
  const npmV = parseFloat(process.versions.node);

  if (nodeV < 16) {
    throw Error("[ERROR]: This bot requires version 16.6 of nodejs! Please upgrade to version 16.6 or more.");
  }

  if (npmV < 7) {
    throw Error("[ERROR]: Please upgrade npm to version 7 or more.");
  }

  if (!process.env["DISCORD_BOT_TOKEN"]) {
    throw Error("[ERROR][BOT]: discord botToken is must required");
  }

  if (!process.env["MONGO_DB_URI"]) {
    throw Error("[ERROR][BOT]: mongoDb Uri is required");
  }

  if (!config.inviteLink || config.inviteLink === "") {
    logger.warn("config", "inviteLink is required to invite the bot.");
  }

  if (!config.supportServer || config.supportServer === "") {
    logger.warn("config", "supportServer is required for discord support.");
  }

  if (!config.owners[0]) {
    logger.warn("config", "ownerId is required for bot-owner only commands.");
  }

  if (!config.logsChannel || config.logsChannel === "") {
    logger.error(
      "config",
      "logsChannelId is required for reporting any errors (if none is provided, the bot will only log errors in the console)"
    );
  }
}

checkValid();