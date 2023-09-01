import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Approver from "./components/Approver";
import Depositor from "./components/Depositer";
import Beneficiary from "./components/Beneficiary";
import { SignerProvider } from "./utils/SignerContext";
import WalletConnectionScreen from "./utils/WalletConnectionScreen";
import SignerInfo from "./utils/SignerInfo";

function App() {
  return (
    <BrowserRouter>
      <SignerProvider>
        <WalletConnectionScreen />
        <NavBar />
        <SignerInfo />
        <Routes>
          <Route path="/approver" element={<Approver />} />
          <Route path="/depositor" element={<Depositor />} />
          <Route path="/beneficiary" element={<Beneficiary />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </SignerProvider>
    </BrowserRouter>
  );
}

export default App;
