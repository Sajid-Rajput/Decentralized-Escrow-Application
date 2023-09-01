require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    polygon_mumbai: {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "./app/src/artifacts",
  },
};
