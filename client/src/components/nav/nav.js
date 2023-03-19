import "./nav.scss";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="ui">
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
        </div>
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
