module.exports = {
  name: "misc",
  description: "Miscellaneous commands",
  options: [
    {
      type: "SUB_COMMAND",
      name: "pastebin",
      description: "Create a paste (pastebin.com)",
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
    },
    {
      type: "SUB_COMMAND",
      name: "translate",
      description: "Translate something to your favourite language",
      options: [
        {
          type: "STRING",
          name: "language",
          description: "The language you want to translate to",
          required: true
        },
        {
          type: "STRING",
          name: "sentence",
          description: "The sentence you want to translate",
          required: true
        }
      ],
    },
  ]
}