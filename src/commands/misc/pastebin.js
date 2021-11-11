const { PasteClient } = require("pastebin-api");
const paste = new PasteClient(process.env["PASTE_CLIENT_KEY"]);

module.exports = {
  commandName: "misc",
  name: "pastebin",
  description: "Create a paste (pastebin.com)",
  category: "misc",
  options: [
    {
      type: "STRING",
      name: "code",
      description: "This will be the paste code",
      required: true
    },
    {
      type: "STRING",
      name: "extension",
      description: "The file extension",
      required: false
    },
    {
      type: "STRING",
      name: "filename",
      description: "This will be the name of the paste",
      required: false
    },
    {
      type: "STRING",
      name: "expire",
      description: "When the paste will expire",
      required: false,
      choices: [
        {
          name: "Never",
          value: "N",
        },
        {
          name: "10 Minutes",
          value: "10M"
        },
        {
          name: "1 Hour",
          value: "1H"
        },
        {
          name: "1 Week",
          value: "1W"
        },
        {
          name: "2 Weeks",
          value: "2W"
        },
        {
          name: "1 Month",
          value: "1M"
        },
        {
          name: "6 Months",
          value: "6M"
        },
        {
          name: "1 Year",
          value: "1Y"
        }
      ]
    }
  ],
  async execute(bot, interaction) {
    const code = interaction.options.getString("code", true);
    const extension = interaction.options.getString("extension");
    const expireDate = interaction.options.getString("expire") ?? "N";
    const name = interaction.options.getString("filename") ?? "unknown";

    const pasteUrl = await paste.createPaste({
        code,
        expireDate: expireDate,
        publicity: 1,
        format: extension ?? undefined,
        name
      })
      .catch((e) => e.message);

    if (pasteUrl.startsWith("Bad API request, invalid api_paste_format"))
      return bot.say.wrongMessage(interaction, "Provid a valid file format.");

    return interaction.reply({ content: pasteUrl });
  }
};
