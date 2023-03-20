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
                  color="#4d4d4e"
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
                  color="#4d4d4e"
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
                  color="#4d4d4e"
                  className="navIcon"
                />
              </NavLink>
            </Menu.Item>

            {/* <Link to="/profile">
              <Menu.Item
                name="dashboard"
                active={activeItem === "dashboard"}
                onClick={handleItemClick}
              >
                Dashboard
              </Menu.Item>
            </Link> */}

            {/* <Link to="/store">
              <Menu.Item
                name="store"
                active={activeItem === "store"}
                onClick={handleItemClick}
              >
                Donate
              </Menu.Item>
            </Link>

            <a href="/" onClick={() => Auth.logout()}>
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={handleItemClick}
              >
                Logout
              </Menu.Item>
            </a> */}
          </Menu>
        </>
      );
    } else {
      return (
        <div id="title">neighborhood garage</div>
        //   <div className="ui">
        //     <div className="ui stackable menu">
        //       {/* <li>
        //         <Link to="/signup">
        //           <button>Signup</button>
        //         </Link>
        //       </li>
        //       <div className="right item">
        //         <Link to="/login">Login</Link>
        //       </div> */}
        //       {/* <li>
        //         <Link to="/createGarage">
        //           <button>Create Garage</button>
        //         </Link>
        //       </li> */}
        //       {/* <li>
        //         <Link to="/addTool">
        //           <button>Add Tool</button>
        //         </Link>
        //       </li> */}
        //     </div>
        //   </div>
      );
    }
  }

  return (
    <header className="navbar">
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
