import "./signUp.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ name:"", email: "", password: "",phone: "", address: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //test
    console.log(formState.name,formState.email,formState.password,formState.address);
    const mutationResponse = await addUser({
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        phone: formState.phone,
        address: formState.address,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit} className="signup-form">
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="your name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="phone">Phone:</label>
          <input
            placeholder="XXX-XXX-XXXX"
            name="phone"
            type="phone"
            id="phone"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="address">Address:</label>
          <input
            placeholder="type address here"
            name="address"
            type="address"
            id="address"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/login">← Go to Login</Link>
    </div>
  );
}

export default Signup;
