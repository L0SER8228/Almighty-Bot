const DJS = require("discord.js");
const URL = require("node:url");
const fetch = require("node-fetch");

const PORN_BLACKLIST_LIST_URL =
  "https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt";
const CAPTURE_URL = "https://image.thum.io/get/width/2160/crop/3840/noanimate/";

module.exports = {
  commandName: "image",
  name: "web",
  description: "View a screenshot of a website",
  category: "image",
  options: [{
    type: "STRING",
    name: "url",
    description: "The URL of the website",
    required: true
  }],
  async execute(bot, interaction) {
    const url = interaction.options.getString("url", true);

    if (!url.startsWith("http"))
      return bot.say.wrongMessage(interaction, "Invalid url provided.");

    await interaction.deferReply({ ephemeral: true });

    const available = await isAvailable(url);

    if (!available)
      return bot.say.worngMessage(interaction, `\`${url}\` webpage is not available`);

    const isNSFW = await isNsfw(url);

    if (!interaction.channel?.nsfw && isNSFW)
      return bot.say.worngMessage(interaction, "Cannot display NSFW webpage on non-NSFW channel.");

    const result = `${CAPTURE_URL}${url}`;
    const attachment = new DJS.MessageAttachment(result, "webpage.png");

    return interaction.editReply({ files: [attachment] });
  }
}

async function isAvailable(url) {
  let available = false;
  try {
    await fetch(url, { timeout: 2000 });

    return (available = true);
  } catch {
    available = false;
  }

  return available;
}

async function isNsfw(url) {
  const res = await fetch(PORN_BLACKLIST_LIST_URL).then((res) => res.text());

  const parsed = URL.parse(url);
  const list = [
      ...res
        .split("\n")
        .filter((s) => !s.startsWith("#"))
        .map((s) => s.replace("0.0.0.0", "")),
      "pornhub.com",
    ].join("\n");

  const includes = list.includes(parsed.host);
  const includesPorn = await (
    await fetch(url, {
      timeout: 2500,
    }).then((res) => res.text())
  ).includes("porn");

  if (!includes && !includesPorn) return false;
  if (includes && includesPorn) return true;
  if (includes || !includesPorn) return true;
  if (!includes || includes) return true;
}