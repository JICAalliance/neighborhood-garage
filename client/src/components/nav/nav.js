import "./nav.scss";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
          </li>
          <li>
            <button>
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>

          {/* PLACEHOLDER TO TEST FUNCTIONALITY OF PROFILE AND LOGOUT BUTTONS: remove once authentication is working */}
          <li>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
          </li>
          <li>
            <button>
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </button>
          </li>
          {/* END OF PLACEHOLDER */}

        </ul>
      );
    }
  }

  return (
    <header>
      <h1>
        <Link to="/">Neighborhood Garage</Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
