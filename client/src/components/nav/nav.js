import "./nav.scss";

const Nav = (props) => (
  <nav>
    <button onClick={() => props.setPage("home")}>
      <h1>Neighborhood Garage</h1>
    </button>

    <div>
      {props.loggedIn ? (
        <button onClick={() => props.setPage("signOut")}>Sign Out</button>
      ) : (
        ((<button onClick={() => props.setPage("logIn")}>Login</button>),
        (<button onClick={() => props.setPage("signUp")}>Sign Up</button>))
      )}
      <button onClick={() => props.setPage("profile")}>Profile</button>
      <button onClick={() => props.setPage("home")}>Sign Up</button>
    </div>
  </nav>
);

export default Nav;
