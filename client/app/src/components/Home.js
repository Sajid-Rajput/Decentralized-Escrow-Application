import React, { useState } from "react";
import { ethers } from "ethers";
import { useSigner } from "../utils/SignerContext";
import deploy from "../deploy";
import connectWallet from "../utils/connectWallet";
import server from "../server";

import "./Home.css"; // Import the Home.css for styling

function Home() {
  const signerInfo = useSigner();
  const { signer } = useSigner() || {};

  const [arbiter, setArbiter] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [ethAmount, setEthAmount] = useState("");

  if (signerInfo === null) {
    return (
      <div className="wallet-connection-message">
        <h2>Please Connect Your Wallet</h2>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    );
  }

  async function newContract() {
    const signerAddress = await signer.getAddress();

    if (signerAddress.toLowerCase() === arbiter.toLowerCase()) {
      alert("Signer can't be an arbiter");
      return;
    }

    if (signerAddress.toLowerCase() === beneficiary.toLowerCase()) {
      alert("Signer can't be a beneficiary");
      return;
    }

    const value = ethers.utils.parseUnits(ethAmount, 18);
    try {
      const escrowContract = await deploy(signer, arbiter, beneficiary, value);

      const escrow = {
        contractAddress: escrowContract.address,
        arbiter,
        beneficiary,
        depositor: signerAddress,
        value: ethers.utils.formatEther(value).toString(),
      };

      await server.post("/contract", escrow);
    } catch (error) {
      alert("Error deploying contract:", error);
    }
  }

  return (
    <div className="contract">
      <h1>New Contract</h1>
      <label>
        Arbiter Address
        <input
          type="text"
          value={arbiter}
          onChange={(e) => setArbiter(e.target.value)}
        />
      </label>

      <label>
        Beneficiary Address
        <input
          type="text"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
        />
      </label>

      <label>
        Deposit Amount (in ETH)
        <input
          type="text"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
        />
      </label>

      <button
        className="deploy-button"
        onClick={(e) => {
          e.preventDefault();
          newContract();
        }}
      >
        Deploy
      </button>
    </div>
  );
}

export default Home;
