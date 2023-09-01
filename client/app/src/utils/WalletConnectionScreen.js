import React from "react";
import { useSigner } from "../utils/SignerContext";
import connectWallet from "./connectWallet"; // Import the connectWallet function
import "./WalletConnectionScreen.css";

function WalletConnectionScreen() {
  const signer = useSigner();

  // Check if the signer is available
  if (!signer) {
    return (
      <div className="wallet-connection-screen">
        <h2>Please Connect Your Wallet</h2>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    );
  }

  // If signer is available, don't render anything
  return null;
}

export default WalletConnectionScreen;
