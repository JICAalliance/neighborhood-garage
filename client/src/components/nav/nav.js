import "./nav.scss";
import { NavLink, Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Menu } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faHandHoldingDollar,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [activeItem, setActiveItem] = useState();
  const handleItemClick = (e, { name }) => setActiveItem(name);
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Menu stackable id="menu">
            <Menu.Item>
              {/* <img alt="logo" src="./icons8-wrench-64.png" /> */}
              <div id="navTitle">neighborhood garage</div>
            </Menu.Item>

            <Menu.Item
              name="dashboard"
              active={activeItem === "dashboard"}
              onClick={handleItemClick}
            >
              <NavLink
                exact="true"
                activeclassname="active"
                className="dashboard-link"
                to="/profile"
              >
                <FontAwesomeIcon
                  icon={faWarehouse}
                  color="#ffffff"
                  className="navIcon"
                />
              </NavLink>
            </Menu.Item>
            <Menu.Item
              name="donate"
              active={activeItem === "donate"}
              onClick={handleItemClick}
            >
              <NavLink
                exact="true"
                activeclassname="active"
                className="donate-link"
                to="/store"
              >
                <FontAwesomeIcon
                  icon={faHandHoldingDollar}
                  color="#ffffff"
                  className="navIcon"
                />
              </NavLink>
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={() => Auth.logout()}
            >
              <NavLink
                exact="true"
                activeclassname="active"
                className="logout-link"
                to="/home"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  color="#ffffff"
                  className="navIcon"
                />
              </NavLink>
            </Menu.Item>
          </Menu>
        </>
      );
    } else {
      return <div id="title">neighborhood garage</div>;
    }
  }

  return (
    <header className="navbar">
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
