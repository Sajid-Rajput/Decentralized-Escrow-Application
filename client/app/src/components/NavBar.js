import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/approver">Approver</Link>
        </li>
        <li>
          <Link to="/depositor">Depositor</Link>
        </li>
        <li>
          <Link to="/beneficiary">Beneficiary</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
