const express = require("express");
const { default: mongoose } = require("mongoose");
const contractRoutes = require("./routes/escrowRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://sajid-escrow-dapp.vercel.app/",
  })
);

const PORT = process.env.PORT || 4000;

const DB = process.env.DATABASE;
// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

// Use the contract routes
app.use("/api", contractRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
