const { time } = require("@discordjs/builders");

module.exports = {
  commandName: "info",
  name: "invite",
  description: "Get information about an invite code",
  category: "info",
  options: [{
    type: "STRING",
    name: "code",
    description: "The invite code/url",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const code = interaction.options.getString("code", true);

    const invite = await bot.fetchInvite(resolveCode(code)).catch(() => null);

    if (!invite)
      return bot.say.worngMessage(interaction, `No info was found about \`${code}\`.`);

    const doesInviteExpire = !!invite.expiresAt;

    const expiresAt = doesInviteExpire ?
      time(new Date(invite.expiresAt), "f") :
      "Never expires";

    const hasExpired = invite.expired_at && new Date(invite.expired_at).getTime() <= Date.now();

    const expiredAt = doesInviteExpire ?
      hasExpired && invite.expired_at ?
      time(new Date(invite.expired_at), "f") :
      "Not expired yet" :
      "Never expires";

    const inviter = invite.inviter ?
      `${invite.inviter?.username}#${invite.inviter.discriminator} (${invite.inviter.id})` :
      lang.UTIL.UNKNOWN;

    const uses = invite.uses ? bot.utils.formatNumber(invite.uses) : null;
    const maxUses = invite.maxUses;
    const usesStr = (maxUses && uses ? `${uses}/${maxUses}` : uses) ?? "Unknown";

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`Invite: ${invite.code}`)
      .setDescription(invite.guild?.description || "No guild description")
      .addField("Information",
        `**Uses:** ${usesStr}
**Guild;** ${invite.guild?.name ?? "Unknown"} (${invite.guild?.id ?? "Unknown"})
**Channel:** ${invite.channel.name}
**Inviter;** ${inviter}
      `)
      .addField("Expiration",
        `**Expires:** ${expiresAt}
**Expired at;** ${expiredAt}`
      );

    if (invite.guild?.icon) {
      const extension = invite.guild.icon.startsWith("a_") ? "gif" : "webp";
      const url = `https://cdn.discordapp.com/icons/${invite.guild.id}/${invite.guild.icon}.${extension}?size=1024`;
      embed.setThumbnail(url);
    }

    if (invite.guild?.banner) {
      const url = `https://cdn.discordapp.com/banners/${invite.guild.id}/${invite.guild.banner}.webp?size=1024`;
      embed.setImage(url);
    }

    return interaction.editReply({ embeds: [embed] });
  }
}

function resolveCode(str) {
  const split = str.split("/");
  return split[split.length - 1];
}