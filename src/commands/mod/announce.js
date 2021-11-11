const colors = {
  WHITE: 0xffffff,
  AQUA: 0x1abc9c,
  BLUE: 0x3498db,
  YELLOW: 0xfee75c,
  PURPLE: 0x9b59b6,
  FUCHSIA: 0xeb459e,
  GOLD: 0xf1c40f,
  ORANGE: 0xe67e22,
  RED: 0xed4245,
  PINK: 0xff8ee0,
  GREY: 0x95a5a6,
  NAVY: 0x34495e,
  DARK_GREEN: 0x1f8b4c,
  DARK_BLUE: 0x206694,
  BLURPLE: 0x5865f2,
  GREYPLE: 0x99aab5
};
const DJS = require("discord.js");
const isImageURL = require("image-url-validator").default;

module.exports = {
  name: "announce",
  description: "Announce something with a cool embed",
  category: "mod",
  memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
  options: [
    {
      type: "STRING",
      name: "text",
      description: "The announcement message",
      required: true
    },
    {
      type: "CHANNEL",
      name: "channel",
      description: "Mention a channel (Default: current)",
      required: false
    },
    {
      type: "STRING",
      name: "title",
      description: "The title of the embed announcement",
      required: false
    },
    {
      type: "BOOLEAN",
      name: "everyone",
      description: "Whatever to ping @everyone or not (Default: false)",
      required: false
    },
    {
      type: "BOOLEAN",
      name: "here",
      description: "Whatever to ping @here or not (Default: false)",
      required: false
    },
    {
      type: "ROLE",
      name: "role",
      description: "Which role to be pinged (Default: null)",
      required: false
    },
    {
      type: "STRING",
      name: "thumbnail",
      description: "The thumbnail url of the embed (default null)",
      required: false
    },
    {
      type: "STRING",
      name: "image",
      description: "The image url of the embed (default null)",
      required: false
    },
    {
      type: "STRING",
      name: "color",
      description: "The color for the embed",
      required: false,
      choices: Object.entries(colors).map(([name, value]) => ({
        name,
        value: value.toString(16)
      }))
    },
    {
      type: "BOOLEAN",
      name: "footer",
      description: "Whatever to add footer or not (default true)",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const text = interaction.options.getString("text", true);
    const channel = interaction.options.getChannel("channel") ?? interaction.channel;
    const title = interaction.options.getString("title", false);
    const everyone = interaction.options.getBoolean("everyone", false) ?? false;
    const here = interaction.options.getBoolean("here", false) ?? false;
    const role = interaction.options.getRole("role", false) ?? false;
    const thumbnail = interaction.options.getString("thumbnail", false);
    const image = interaction.options.getString("image", false);
    const colour = interaction.options.getString("color", false);
    const footer = interaction.options.getBoolean("footer", false) ?? true;

    if (!channel.isText())
      return bot.say.wrongMessage(interaction, `${channel.toString()} is not a valid text channel.`);

    if (image && !isImageURL(image))
      return bot.say.wrongMessage(interaction, `\`${image}\` is not a valid image url.`);

    if (thumbnail && !isImageURL(thumbnail))
      return bot.say.wrongMessage(interaction, `\`${thumbnail}\` is not a valid thumbnail url.`);

    let embed = new DJS.MessageEmbed()
      .setDescription(text);

    if (title) embed.setTitle(title);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (image) embed.setImage(image);
    if (colour) embed.setColor(colour);
    if (footer === true) embed.setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }));

    let content = "** **";
    if (everyone === true) content += " @everyone";
    if (here === true) content += " @here";
    if (role) content += ` ${role.toString()}`;
 
   const done = await channel.send({ content, embeds: [embed] });
   
   const messageLink = `https://discord.com/channels/${interaction.guild.id}/${channel.id}/${done.id}`;
   
    return bot.say.successMessage(interaction,`Done 👍! [check here](${messageLink}).`);
  }
};