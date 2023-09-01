import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import "./SignerInfo.css";

// Create a context to hold the signer address
const SignerContext = createContext(null);

// Custom hook to use the signer address
export const useSigner = () => {
  return useContext(SignerContext);
};

// Provider component to set and provide the signer address
export function SignerProvider({ children }) {
  const [signer, setSigner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSigner = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);

        if (accounts.length > 0) {
          const signer = provider.getSigner();
          setSigner({ address: accounts[0], signer });
        } else {
          setSigner(null);
        }
      } catch (error) {
        console.error("Error getting signer:", error);
        setSigner(null);
      } finally {
        setLoading(false);
      }
    };

    // Listen for changes in the MetaMask account
    window.ethereum.on("accountsChanged", (newAccounts) => {
      if (newAccounts.length > 0) {
        getSigner();
      } else {
        setSigner(null);
      }
    });

    // Call getSigner initially to fetch the signer address
    getSigner();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SignerContext.Provider value={signer}>{children}</SignerContext.Provider>
  );
}
