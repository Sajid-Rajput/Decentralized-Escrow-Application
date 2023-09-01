const ApiFeatures = require("../Utils/ApiFeatures");

const Escrow = require("../models/escrowSchema");

const addEscrow = async (req, resp) => {
  try {
    const { contractAddress, arbiter, beneficiary, depositor, value } =
      req.body;
    const contract = new Escrow({
      contractAddress,
      arbiter,
      beneficiary,
      depositor,
      value,
    });
    await contract.save();
    resp.status(201).json({
      result: "Success",
    });
  } catch (err) {
    resp.status(500).json({
      error: err.message,
    });
  }
};

const getAllEscrow = async (req, resp) => {
  try {
    const features = new ApiFeatures(Escrow.find(), req.query).filter();
    const contracts = await features["query"];

    resp.status(200).json(contracts);
  } catch (error) {
    resp.status(500).json({
      error: error.message,
    });
  }
};

const getEscrow = async (req, resp) => {
  try {
    const contractAddress = req.params.contractAddress;

    const contract = await Escrow.findOne({ contractAddress });

    if (!contract) {
      return resp.status(404).json({
        error: "Contract not found",
      });
    }

    resp.json(contract);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const updateEscrow = async (req, res, next) => {
  try {
    const contractAddress = req.params.contractAddress
    const updateData = req.body;

    const existingContract = await Escrow.findOne({ contractAddress });

    if (!existingContract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    // Update the contract data
    Object.assign(existingContract, updateData);
    await existingContract.save();

    res.json({ message: "Contract updated successfully" });
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
};

module.exports = { addEscrow, getAllEscrow, getEscrow, updateEscrow };
