import "./nav.scss";
import { Link } from "react-router-dom"

const Nav = (props) => (
  <nav>

  <Link to="/"><button>Home</button></Link>

    {/* <button onClick={() => props.setPage("home")}>
      <h1>Neighborhood Garage</h1>
    </button> */}

    {/* <div>
      {props.loggedIn ? (
        <button onClick={() => props.setPage("signOut")}>Sign Out</button>
      ) : (
        ((<button onClick={() => props.setPage("logIn")}>Login</button>),
        (<button onClick={() => props.setPage("signUp")}>Sign Up</button>))
      )}
      <button onClick={() => props.setPage("profile")}>Profile</button>
      <button onClick={() => props.setPage("home")}>Sign Up</button>
    </div> */}

    <Link to="/login"><button>Log In</button></Link>
    
  </nav>
);

export default Nav;
