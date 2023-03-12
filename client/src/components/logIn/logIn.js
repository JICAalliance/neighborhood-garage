<<<<<<< Updated upstream
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import "./logIn.scss";

const LogIn = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogIn = () => {
    auth.login(user);
    navigate("/");
  };
  return (
    <div id="logIn">
      <h1>Log In Page</h1>
      <label>
        Username:{""}
        <input type="text" onChange={(e) => setUser(e.target.value)} />
      </label>
      <button onClick={handleLogIn}>Log In</button>
    </div>
  );
};
=======
import "./login.scss";
import { useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
>>>>>>> Stashed changes

  const handleLogin = () => {
    auth.login(user);
    navigate("/");
  };

  return (
    <div id="login">
      <h1>This is the login page</h1>
      <label>
        Username:{" "}
        <input type="text" onChange={(e) => setUser(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
