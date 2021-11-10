const { model, Schema, models } = require("mongoose");

const guildSchema = new Schema({
  guild_id: { type: String, required: true },
  audit_webhook: { type: String, default: null },
  blacklisted_roles: { type: Array, default: [] },
  disabled_commands: { type: Array, default: [] },
  dj_mode: { type: Boolean, default: false },
  dj_role: { type: String, default: null },
  muted_role: { type: String, default: null },
  welcome_channel: { type: String, default: null },
  goodbye_channel: { type: String, default: null },
  welcome_role: { type: String, default: null }
});

module.exports = models.Guild || model("Guild", guildSchema);
