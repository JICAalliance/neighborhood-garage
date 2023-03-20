import "./logIn.scss";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth, { useStateContext } from "../../utils/auth";
import { LOGIN } from "../../utils/mutations";
import Video from "../../../files/houses.mp4";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      // const userId = mutationResponse.data.login.user._id;
      const token = mutationResponse.data.login.token;
      // props.setUser(mutationResponse.data.login.user);
      Auth.login(token);
      //navigate to profile when login successful
      navigate(`/profile`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
<<<<<<< HEAD
    <section>
    <div className="showcase">
    <video src={Video} muted loop autoPlay></video>
    <div className="ui container">
      <div className="ui grid">
        <form onSubmit={handleFormSubmit} className="ui form six wide column centered">
=======
    <div className="showcase">
      <video src={Video} muted loop autoPlay></video>
      <div className="ui container">
        <div className="ui grid">
          <form
            onSubmit={handleFormSubmit}
            className="ui form six wide column centered"
          >
>>>>>>> d2edb82de04e1381554cd607a3cdaf148db39af3
            <div className="flex-center">
              <h2>Login</h2>
            </div>
            <div className="field">
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p className="">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <br></br>
            <div className="flex-center">
              <button type="submit" className="ui button">
                Submit
              </button>
              <br></br>
              <Link to="/">Need an account? Sign up!</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </section>
  );
}

export default Login;

// const Login = () => {
//   //having an object of key and value pairs
//   const [signUpUser, setSignUpUser] = useState({
//     username: "",
//     email: "",
//     number: "",
//     password: "",
//     address: "",
//   });
//   //can access these values inside of user
//   const { username, email, number, password, address } = signUpUser;
//   //when they start typing, we're going to deconstruct the object
//   const setOwner = (e) => {
//     //targeting the field with a specific name; items destructured from user must match the name= value in the inputs
//     const name = e.target.name;
//     //value will be whatever the user types
//     const value = e.target.value;
//     //using spread operator gives you access to all of those values
//     setSignUpUser({ ...signUpUser, [name]: value });
//   };
//   //code for login
//   const [loginUser, setLoginUser] = useState({
//     loginusername: "",
//     loginpassword: "",
//   });
//   const { loginusername, loginpassword } = loginUser;
//   const setLoginOwner = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setLoginUser({ ...loginUser, [name]: value });
//   };

//   const { login } = useStateContext();
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     // login(user);
//     navigate("/");
//   };
//   const handleSignup = () => {};
//   const [accountChecker, setAccountChecker] = useState(false);
//   const swapLogin = () => {
//     setAccountChecker(true);
//   };
//   const swapSignup = () => {
//     setAccountChecker(false);
//   };

//   return (
//     <div>
//       {accountChecker ? (
//         <div id="signup">
//           <h1>Sign Up</h1>
//           <label>
//             Username:{""}
//             <input
//               type="text"
//               name="username"
//               value={username}
//               onInput={setOwner}
//             />
//           </label>
//           <br />
//           <label>
//             Email:{""}
//             <input type="text" name="email" value={email} onInput={setOwner} />
//           </label>
//           <br />
//           <label>
//             Phone Number:{""}
//             <input
//               type="text"
//               name="number"
//               value={number}
//               onInput={setOwner}
//             />
//           </label>
//           <br />
//           <label>
//             Password:{""}
//             <input
//               type="text"
//               name="password"
//               value={password}
//               onInput={setOwner}
//             />
//           </label>
//           <br />
//           <label>
//             Address:{""}
//             <input
//               type="text"
//               name="address"
//               value={address}
//               onInput={setOwner}
//             />
//           </label>
//           <br />
//           <button onClick={handleSignup}>Sign Up</button>
//           <br />
//           <button onClick={swapSignup}>Already a member? Log in!</button>
//         </div>
//       ) : (
//         <div id="logIn">
//           <h1>Log In</h1>
//           <label>
//             Username:{""}
//             <input
//               type="text"
//               name="loginusername"
//               value={loginusername}
//               onInput={setLoginOwner}
//             />
//           </label>
//           <br />
//           <label>
//             Password:{""}
//             <input
//               type="text"
//               name="loginpassword"
//               value={loginpassword}
//               onInput={setLoginOwner}
//             />
//           </label>
//           <br />
//           <button onClick={handleLogin}>Log In</button>
//           <br />
//           <button onClick={swapLogin}>Not a member? Sign up!</button>
//           {/* {console.log(user)} */}
//         </div>
//       )}
//     </div>
//   );
// };
