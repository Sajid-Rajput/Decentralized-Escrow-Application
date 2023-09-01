const express = require("express");
const router = express.Router();
const {
  addEscrow,
  getAllEscrow,
  getEscrow,
  updateEscrow,
} = require("../controller/escrowControllers");

// Create a new escrow contract
router.route("/contract").post(addEscrow);

// Fetch details of a specific contract by ID
// Fetch details of a specific contract by transactionHash
// Fetch details of a specific contract by transactionHash
router.route("/contracts/:contractAddress").get(getEscrow).patch(updateEscrow);

// List all contracts
router.route("/contracts").get(getAllEscrow);

module.exports = router; // Change 'express.Router' to 'router' here
