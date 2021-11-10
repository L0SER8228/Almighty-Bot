const fetch = require("node-fetch");
const { time } = require("@discordjs/builders");

module.exports = {
  commandName: "info",
  name: "npm",
  description: "Search packages on npm by their name",
  category: "info",
  options: [{
    type: "STRING",
    name: "query",
    description: "The search query",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", true);

    const data = await fetch(`https://api.npmjs.org/downloads/point/last-week/${query}&size=5`).then((res) => res.json());

    const foundPackages = data.objects.map(({ package: pkg, searchScore }) => {
      return { ...pkg, searchScore };
    });

    if (foundPackages.length <= 0)
      return bot.say.worngMessage(interaction, `No npm data was found about \`${query}\`.`);

    // most accurate package
    const accuratePackage = foundPackages.find((d) => d.searchScore > 10000);

    // if it was found, show more info about the package, otherwise return a list of the top 5
    if (accuratePackage) {
      const updatedAt = time(new Date(accuratePackage.date), "F");

      const maintainers = accuratePackage.maintainers.map(({ username }) => username).join(", ");
      const downloads = await fetch(`${bot.apis.npm}${accuratePackage.name}`)
        .then((res) => res.json())
        .catch(() => null);

      const embed = bot.utils
        .baseEmbed(interaction)
        .setURL(accuratePackage.links.npm)
        .setTitle(accuratePackage.name)
        .setDescription(accuratePackage?.description ?? "No description")
        .addField("Version", accuratePackage.version, true)
        .addField("Last Modified", updatedAt, true)
        .addField("Maintainers", maintainers);

      if (downloads?.downloads) {
        embed.addField("Downloads",
          `${bot.utils.formatNumber(downloads.downloads)}/week`,
          true
        );
      }

      return interaction.editReply({ embeds: [embed] });
    } else {
      const embed = bot.say.baseEmbed(interaction)
        .setTitle("Npm search results")
        .setDescription(`Npm top 5 packages related to \`${query}\``);

      foundPackages.forEach((pkg) => {
        embed.addField(pkg.name,
          `
**Version:** ${pkg.version}
**Author:** ${pkg?.publisher.username}
**["View on Npm"](${pkg.links.npm})**
      `);
      });

      return interaction.editReply({ embeds: [embed] });
    }
  }
};