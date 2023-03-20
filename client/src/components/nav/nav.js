import "./nav.scss";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Menu } from "semantic-ui-react"
import React, { useEffect, useState } from "react";

function Nav() {
  const [ activeItem, setActiveItem ] = useState()
  const handleItemClick = (e, { name }) => setActiveItem(name)
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
        {/* <div className="ui">
          <div className="ui stackable menu">
            <div className="right item">
              <Link to="/profile">
                Profile
              </Link>
            </div>
            <div className="item right-tabs">
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </div>
          </div>
        </div> */}
        <Menu stackable>
        <Menu.Item>
          <img alt="logo" src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>

        <Menu.Item
          name='dashboard'
          active={activeItem === 'dashboard'}
          onClick={handleItemClick}
        >
          <Link to="/profile">
                Dashboard
          </Link>
        </Menu.Item>

        <Menu.Item
          name='createGarage'
          active={activeItem === 'createGarage'}
          onClick={handleItemClick}
        >
          <Link to="/createGarage">
               Create Garage
          </Link>
        </Menu.Item>

        <Menu.Item
          name='joinGarage'
          active={activeItem === 'joinGarage'}
          onClick={handleItemClick}
        >
          <Link to="/joinGarage">
               Join Garage
          </Link>
        </Menu.Item>

        <Menu.Item
          name='store'
          active={activeItem === 'store'}
          onClick={handleItemClick}
        >
          <Link to="/store">
               Store/Donate
          </Link>
        </Menu.Item>

        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={handleItemClick}
        >
          <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
        </Menu.Item>
      </Menu>
        </>
      );
    } else {
      return (
        <div className="ui">
          <div className="ui stackable menu">
            {/* <li>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </li> */}
            <div className="right item">
              <Link to="/login">
                Login
              </Link>
            </div>
            {/* <li>
              <Link to="/createGarage">
                <button>Create Garage</button>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/addTool">
                <button>Add Tool</button>
              </Link>
            </li> */}
          </div>
        </div>
      );
    }
  }

  return (
    <header className="navbar">
      {/* <h1 style={{ margin: 0 }}>
        <Link to="/" className="logo-text">
          Neighborhood Garage
        </Link>
      </h1> */}

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
