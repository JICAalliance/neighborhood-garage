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
    <section>
      <div className="showcase">
        <video src={Video} muted loop autoPlay></video>
        <div className="ui container">
          <div className="ui grid">
            <form onSubmit={handleFormSubmit} className="ui form eight wide column centered login-container">
              <div className="flex-center">
                <h2 className="frontH2">Login</h2>
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
                <button type="submit" className="ui button-30 frontBtn">
                  Submit
                </button>
                <br></br>
                <Link to="/">Need an account? Sign up!</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    </section >
  );
}

export default Login;
