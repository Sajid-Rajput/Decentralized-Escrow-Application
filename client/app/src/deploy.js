import { ethers } from "ethers";
import Escrow from "./ABI/Escrow.json";

export default async function deploy(signer, arbiter, beneficiary, value) {
  try {
    const factory = new ethers.ContractFactory(
      Escrow.abi,
      Escrow.bytecode,
      signer
    );
    return factory.deploy(arbiter, beneficiary, { value });
  } catch (error) {
    // Handle deployment errors
    alert("Contract deployment error:", error);
    throw error; // Rethrow the error for handling higher up the call stack
  }
}
