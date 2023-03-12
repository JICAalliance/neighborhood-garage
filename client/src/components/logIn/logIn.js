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

export default LogIn;
