const { GiveawaysManager } = require("discord-giveaways");
const GiveawayModel = require("../models/Giveaway.model");

class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return await GiveawayModel.find();
  }

  async saveGiveaway(_, giveawayData) {
    await GiveawayModel.create(giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await GiveawayModel.findOneAndUpdate({ messageId }, giveawayData).exec();
    return true;
  }

  async deleteGiveaway(messageId) {
    await GiveawayModel.findOneAndDelete({ messageId }).exec();
    return true;
  }
}

module.exports = MongoGiveawayManager; 