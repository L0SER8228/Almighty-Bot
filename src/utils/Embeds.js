const DJS = require("discord.js");

/*/**
 * Returns a custom embed
 * @param {(DJS.Interaction|DJS.Guild|import("discord-player").Queue|string)} [resolvable]
 */
function baseEmbed(resolvable) {
  let colour = "#00FFFF";
  if (resolvable && typeof resolvable === "string") colour = resolvable;
  if (resolvable && typeof resolvable === "object") colour = ("guild" in resolvable ? resolvable.guild : resolvable)?.me?.displayColor || "#00FFFF";

  return new DJS.MessageEmbed()
    .setColor(colour);
}

/**
 * Returns a custom embed
 * @param {string} [colour]
 */
function logEmbed(colour) {
  let embedL = new DJS.MessageEmbed()
    .setTimestamp();

  if (colour) embedL.setColor(colour);

  return embedL;
}

/**
 * Returns a custom embed
 * @param {DJS.Interaction} interaction
 * @param {string} text
 * @param {boolean} [ephemeral=false]
 */
function successMessage(interaction, text, ephemeral) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (successMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (successMessage)");
  }

  if (!ephemeral) ephemeral = false;

  const embedS = new DJS.MessageEmbed()
    .setDescription(text)
    .setColor(interaction.guild.me.displayColor || "#00FFFF");

  if (interaction.deferred || interaction.replied) {
    return interaction.editReply({ embeds: [embedS] }).catch(console.error);
  } else {
    return interaction.reply({ ephemeral, embeds: [embedS] }).catch(console.error);
  }
}

/**
 * Reply a custom red embed
 * @param {DJS.Interaction} interaction
 * @param {string} text
 */
function wrongMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (wrongMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (wrongMessage)");
  }

  const embedW = new DJS.MessageEmbed()
    .setDescription(text)
    .setColor("RED");

  if (interaction.deferred || interaction.replied) {
    return interaction.editReply({ embeds: [embedW] }).catch(console.error);
  } else {
    return interaction.reply({ ephemeral: true, embeds: [embedW] }).catch(console.error);
  }
}

/**
 * Send a custom embed to queue textChannel
 * @param {object} queue
 * @param {string} text
 */
function queueMessage(queue, text) {
  if (!queue) {
    throw Error("'queue' must be passed down as param! (queueMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (queueMessage)");
  }

  const embedQ = new DJS.MessageEmbed()
    .setColor("RED")
    .setDescription(text);

  return queue.metadata.channel.send({ embeds: [embedQ] }).catch(console.error);
}

/**
 * Send a embed message to user in dm
 * @param {DJS.User|DJS.GuildMember} user
 * @param {string} text
 * @param {string|number} [color="RED"]
 */
async function directMessage(user, text, color) {
  if (!user) {
    throw Error("'user' must be passed down as param! (directMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (directMessage)");
  }

  const embedDM = new DJS.MessageEmbed()
    .setDescription(text)
    .setColor(color || "RED");

  try {
    return await user.send({ embeds: [embedDM] });
  } catch {}
};

module.exports = {
  baseEmbed,
  logEmbed,
  successMessage,
  wrongMessage,
  queueMessage,
  directMessage
};