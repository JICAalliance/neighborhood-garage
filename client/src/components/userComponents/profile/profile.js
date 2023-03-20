import "./profile.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import components
import {
  ViewTool,
  AddTool,
  JoinGarage,
  EditProfile,
  CreateGarage,
} from "../../../components";

import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const navigate = useNavigate();

  const navToGarage = (e) => {
    // navigate(e.target.value)
    if (e.target.value !== "Choose Garage") {
      return navigate(`/viewGarage/${e.target.value}`);
    }
  };

  const navToCreateGarage = () => {
    return navigate(`/createGarage`);
  };
  const navToEditProfile = () => {
    return navigate(`/editProfile`);
  };
  // const navToDonate = () => {
  //   return navigate(`/store`);
  // };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const { name, email, myGarages, myTools, phone, address, borrowedTools } =
      data.currentUser;
      console.log("MYGARAGES", myGarages);

    return (
      <div id="profile">
        <h1 className="welcome">Dashboard</h1>
        {/* <h2 className="welcome">Welcome {name}!</h2> */}

        <div className="ui stackable three column grid">
          <div className="row">
            <div className="column">
              <h2 className="welcome">Info</h2>
            </div>
            <div className="column">
              <div id="info" className="welcome">
                <p>Name: {name} </p>
                <p>Email: {email}</p>
                <p>Phone number: {phone}</p>
                <p>Address: {address}</p>
              </div>
            </div>

            <div className="column flex-center">
              <button
                onClick={navToEditProfile}
                className="button-30"
                role="button"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <h2 className="welcome">Garages</h2>
            </div>
            <div className="column"></div>
            <div className="column flex-center">
              <div className="">
                <button
                  className="button-30"
                  role="button"
                  onClick={navToCreateGarage}
                >
                  Create Garage
                </button>
              </div>
              <br></br>

              <div>
                <JoinGarage />
              </div>
            </div>
          </div>

          {/* View Garage Dropdown */}
          <select name="garage" onClick={(e) => navToGarage(e)}>
            <option>Choose Garage</option>

            {myGarages.map((garage) => {

              return (
                <option
                  value={garage._id}
                  key={garage._id}
                  onClick={(e) => navToGarage(e)}
                >
                  {garage.garageName}
                </option>
              );
            })}
          </select>

          <div className="three column row">
            <div id="addTool" className="five wide column">
              <AddTool />
            </div>
            <div className="column">
              <h2 className="welcome">Toolbox</h2>
            </div>
            <div className="column">
              <ViewTool />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
