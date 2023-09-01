// Function to connect the wallet
function connectWallet() {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert(
      "MetaMask is not installed. Please install it to connect your wallet."
    );
    return;
  }

  // Request access to the user's MetaMask wallet
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      // Handle successful wallet connection
      console.log("Connected wallet address:", accounts[0]);
      // You can update the UI or perform additional actions here
    })
    .catch((error) => {
      // Handle wallet connection error
      console.error("Error connecting wallet:", error);
      // You can display an error message to the user
    });
}

export default connectWallet;
