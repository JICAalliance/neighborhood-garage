import "./signUp.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import Video from "../../../files/houses.mp4";

function Signup(props) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //test
    console.log(
      formState.name,
      formState.email,
      formState.password,
      formState.address
    );
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
    navigate(`/profile`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const reveal = () => {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  };

  window.addEventListener("scroll", reveal);

  return (
    <section>
      <div className="showcase">
        <video src={Video} muted loop autoPlay></video>
        <div className="ui container">
          <div className="ui grid form-div">
            <form
              onSubmit={handleFormSubmit}
              className="ui form six wide column centered"
            >
              <div className="flex-center">
                <h2>Sign Up</h2>
              </div>
              <div className="field">
                <label htmlFor="name">Name:</label>
                <input
                  placeholder="First and Last"
                  name="name"
                  type="text"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email:</label>
                <input
                  placeholder="youremail@example.com"
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
              <div className="field">
                <label htmlFor="phone">Phone:</label>
                <input
                  placeholder="XXX-XXX-XXXX"
                  name="phone"
                  type="text"
                  id="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="address">Address:</label>
                <input
                  placeholder="Enter address here"
                  name="address"
                  type="text"
                  id="address"
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <div className="flex-center">
                <button type="submit" className="ui button">
                  Submit
                </button>
                <br></br>
                <Link to="/login">Already a member? Log in!</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="info-div reveal ui centered stackable grid">
        <div className="six wide column flex-center">
          <img
            className="rounded"
            src="https://uphomes.com/storage/blogposts/July2022/medium/zNKSu0bJxtRpPul6acFD.jpeg"
          ></img>
        </div>
        <div className="six wide column flex-center">
          <h1>Connect with friends and neighbors</h1>
        </div>
      </div>
      <div className="info-div reveal ui centered stackable grid">
        <div className="six wide column flex-center">
          <img
            className="rounded"
            src="https://uphomes.com/storage/blogposts/July2022/medium/zNKSu0bJxtRpPul6acFD.jpeg"
          ></img>
        </div>
        <div className="six wide column flex-center">
          <h1>Share and borrow tools</h1>
        </div>
      </div>
      <div className="info-div reveal ui centered stackable grid">
        <div className="six wide column flex-center">
          <img
            className="rounded"
            src="https://uphomes.com/storage/blogposts/July2022/medium/zNKSu0bJxtRpPul6acFD.jpeg"
          ></img>
        </div>
        <div className="six wide column flex-center">
          <h1>Create your own garage</h1>
        </div>
      </div>
    </section>
  );
}

export default Signup;
