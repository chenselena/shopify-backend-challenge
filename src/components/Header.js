import React from "react";
import { NavLink } from "react-router-dom";
import CloudIcon from "../images/cloud.png";

const Header = () => {
  return (
    <div className="header">
      <h1>
        <span className="header-color">Image</span> Repository
      </h1>
      <img src={CloudIcon} alt="" style={{ width: "45px", height: "45px" }} />
      <nav>
        <NavLink activeClassName="active" to="/" exact={true}>
          Upload an Image
        </NavLink>
        <NavLink activeClassName="active" to="/list">
          View Images
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
