const mongoose = require("mongoose");

const SujetSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  titre: {
    type: String,
  },
  description: {
    type: String,
  },
  choixOui: {
    type: Number,
  },
  choixNon: {
    type: Number,
  },
});
module.exports = mongoose.model("Sujet", SujetSchema);
