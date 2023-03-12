import "./nav.scss";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth";

const auth = useAuth();

// const Nav = (props) => (
//   <nav>
//     <button onClick={() => props.setPage("home")}>
//       <h1>Neighborhood Garage</h1>
//     </button>

//     <div>
//       {props.loggedIn ? (
//         <button onClick={() => props.setPage("signOut")}>Sign Out</button>
//       ) : (
//         ((<button onClick={() => props.setPage("logIn")}>Login</button>),
//         (<button onClick={() => props.setPage("signUp")}>Sign Up</button>))
//       )}
//       <button onClick={() => props.setPage("profile")}>Profile</button>
//       <button onClick={() => props.setPage("home")}>Sign Up</button>
//     </div>
//   </nav>
// );

const Nav = (props) => (
  <nav>
    <div className="nav-links">
      <Link className="header-name" to="/home">
        <h1>Neighborhood Garage</h1>
      </Link>
      <div>
        {auth.user && (
          <NavLink
            exact="true"
            activeclassname="active"
            className="signOut-link"
            to="/signOut"
          >
            Sign Out
          </NavLink>
        )}
         {/* : (
          ((
            <NavLink
              exact="true"
              activeclassname="active"
              className="logIn-link"
              to="/logIn"
            >
              Log In
            </NavLink>
          ),
          (
            <NavLink
              exact="true"
              activeclassname="active"
              className="signUp-link"
              to="/signUp"
            >
              Sign Up
            </NavLink>
          ))
        )} */}
        <NavLink
          exact="true"
          activeclassname="active"
          className="profile-link"
          to="/profile"
        >
          Sign Up
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          className="home-link"
          to="/home"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Nav;
