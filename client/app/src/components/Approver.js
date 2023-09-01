import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import contractABI from "../ABI/Escrow.json";
import { useSigner } from "../utils/SignerContext";
import connectWallet from "../utils/connectWallet";
import server from "../server";
import "./Component.css";

function Approver() {
  const signer = useSigner();
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (signer !== null) {
      const fetchContracts = async () => {
        try {
          setLoading(true);
          const response = await server.get(
            `/contracts?arbiter=${signer.address}`
          );
          setContracts(response.data);
          setLoading(false);
        } catch (error) {
          alert("Error fetching contracts:", error);
          setLoading(false);
        }
      };

      fetchContracts();
    }
  }, [signer]);

  const filterContracts = useCallback(
    (searchTerm) => {
      const filtered = contracts.filter((contract) => {
        const approvalStatus = contract.approved
          ? "✓ It's been approved!"
          : "No";

        return (
          contract.contractAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          contract.beneficiary
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          contract.depositor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contract.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          approvalStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setFilteredContracts(filtered);
    },
    [contracts]
  );

  useEffect(() => {
    filterContracts(searchValue);
  }, [contracts, searchValue, filterContracts]);

  const handleApprove = async (contract) => {
    const contractInstance = new ethers.Contract(
      contract.contractAddress,
      contractABI.abi,
      signer.signer
    );

    await contractInstance.approve();

    contractInstance.once("Approved", async () => {
      contract.approved = true;

      await server.patch(`/contracts/${contract.contractAddress}`, {
        approved: true,
      });

      setContracts([...contracts]);
    });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  if (signer === null) {
    return (
      <div className="wallet-connection-message">
        <h2>Please Connect Your Wallet</h2>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    );
  }

  return (
    <div className="section">
      <h1>Approver Section</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search contracts..."
          value={searchValue}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
      {loading ? (
        <p>Loading contracts...</p>
      ) : (
        <div className="contracts-list">
          {filteredContracts.map((contract) => (
            <div
              key={contract.contractAddress}
              className={`contract-item ${
                contract.approved
                  ? "contract-approved-yes"
                  : "contract-approved-no"
              }`}
            >
              <div className="contract-address">
                <span>Contract Address:</span> {contract.contractAddress}
              </div>
              <div className="contract-details">
                <span>Depositor:</span> {contract.depositor}
              </div>
              <div className="contract-details">
                <span>Beneficiary:</span> {contract.beneficiary}
              </div>
              <div className="contract-details">
                <span>Value:</span> {contract.value} ETH
              </div>
              <div className="contract-details">
                <span>Approved:</span>{" "}
                {contract.approved ? (
                  <span className="approved-text">✓ It's been approved!</span>
                ) : (
                  "No"
                )}
              </div>
              {!contract.approved && (
                <button
                  onClick={() => handleApprove(contract)}
                  className="button"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Approver;
