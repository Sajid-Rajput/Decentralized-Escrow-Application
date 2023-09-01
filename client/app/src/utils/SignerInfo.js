import React from "react";
import { useSigner } from "./SignerContext";

function SignerInfo() {
  const signer = useSigner();

  // Check if the signer is available
  if (!signer) {
    return null; // If signer is null, don't render anything
  }

  // Destructure the signer object
  const { address } = signer;

  return (
    <div className="signer">
      <h2>Signer Address: {address}</h2>
      {/* Add any other content related to the signer here */}
    </div>
  );
}

export default SignerInfo;
