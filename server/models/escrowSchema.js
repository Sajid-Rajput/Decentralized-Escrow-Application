const mongoose = require("mongoose");

const escrowSchema = new mongoose.Schema({
  contractAddress: {
    type: String,
    required: [true, "Contract address is not defined"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  arbiter: {
    type: String,
    required: [true, "An escrow contract must have a arbiter address"],
    lowercase: true,
    trim: true,
  },
  beneficiary: {
    type: String,
    required: [true, "An escrow contract must have a beneficiary address"],
    lowercase: true,
    trim: true,
  },
  depositor: {
    type: String,
    required: [true, "An escrow must have a depositor"],
    lowercase: true,
    trim: true,
  },
  value: {
    type: String,
    required: [true, "Contract did'nt deploy without the given value"],
  },
  approved: {
    type: Boolean,
    default: false,
    enum: {
      values: [true, false],
      message: "Approved value is either: true or false",
    },
  },
});

const Escrow = mongoose.model("Escrow", escrowSchema);

module.exports = Escrow;
