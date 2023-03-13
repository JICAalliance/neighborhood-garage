import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../auth";
import "./logIn.scss";

const LogIn = () => {
  //having an object of key and value pairs
  const [signUpUser, setSignUpUser] = useState({username: "", email: "", number: "", password: "", address: ""});
  //can access these values inside of user
  const {username, email, number, password, address} = signUpUser
  //when they start typing, we're going to deconstruct the object
  const setOwner = (e) => {
    //targeting the field with a specific name; items destructured from user must match the name= value in the inputs
    const name = e.target.name
    //value will be whatever the user types
    const value = e.target.value
    //using spread operator gives you access to all of those values
    setSignUpUser({...signUpUser, [name] : value})
  }
  //code for login
  const [loginUser, setLoginUser] = useState({loginusername: "", loginpassword: ""});
  const {loginusername, loginpassword} = loginUser
  const setLoginOwner = (e) => {
    const name = e.target.name
    const value = e.target.value
    setLoginUser({...loginUser, [name] : value})
  }

  const { login } = useStateContext();
  const navigate = useNavigate();
  const handleLogIn = () => {
    // login(user);
    navigate("/");
  };
  const handleSignUp = () => {
    
  }
  const [accountChecker, setAccountChecker] = useState(false)
  const swapLogIn = () => {
    setAccountChecker(true)
  }
  const swapSignUp = () => {
    setAccountChecker(false)
  }

  return (
    <div>
      { accountChecker ? <div id="signup">
    <h1>Sign Up</h1>
        <label>
          Username:{""}
          <input type="text" name="username" value={username} onInput={setOwner} />
        </label><br/>
        <label>
          Email:{""}
          <input type="text" name="email" value={email} onInput={setOwner} />
        </label><br/>
        <label>
          Phone Number:{""}
          <input type="text" name="number" value={number} onInput={setOwner} />
        </label><br/>
        <label>
          Password:{""}
          <input type="text" name="password" value={password} onInput={setOwner} />
        </label><br/>
        <label>
          Address:{""}
          <input type="text" name="address" value={address} onInput={setOwner} />
        </label><br/>
        <button onClick={handleSignUp}>Sign Up</button><br/>
        <button onClick={swapSignUp}>Already a member? Log in!</button>
  </div> : <div id="logIn">
        <h1>Log In</h1>
        <label>
          Username:{""}
          <input type="text" name="loginusername" value={loginusername} onInput={setLoginOwner}/>
        </label><br/>
        <label>
          Password:{""}
          <input type="text" name="loginpassword" value={loginpassword} onInput={setLoginOwner}/>
        </label><br/>
        <button onClick={handleLogIn}>Log In</button><br/>
        <button onClick={swapLogIn}>Not a member? Sign up!</button>
        {/* {console.log(user)} */}
      </div>}
    </div>
  );
};

export default LogIn;
