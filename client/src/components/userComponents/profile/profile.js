import "./profile.scss";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    // console.log(e.target.value)
  };

  const navToCreateGarage = () => {
    return navigate(`/createGarage`);
  };
  const navToEditProfile = () => {
    return navigate(`/editProfile`);
  };
  const navToDonate = () => {
    return navigate(`/store`);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const { name, email, myGarages, myTools, phone, address, borrowedTools } =
      data.currentUser;

    return (
      <div id="profile">
        <h1>My Profile</h1>
        <h2 className="welcome">Welcome {name}!</h2>
        <div className="ui centered divided three column grid">
          <div className="five wide column"></div>
          <div className="five wide column">
            <div className="ui container">
              <div className="ui grid">
                <div className="ui six wide column centered">
                  <div className="">
                    <div>
                      <button onClick={navToCreateGarage}>Create Garage</button>
                    </div>
                    <div>
                      {/* modal to join garage */}
                      <JoinGarage />
                    </div>
                    {/* product will be what is displayed, index for unique ID; replace the array with dynamic values of garages user is in*/}
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
                    <button onClick={navToEditProfile}>Edit Profile</button>
                    <button onClick={navToDonate}>Donate!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="addTool" className="five wide column">
            <AddTool />
          </div>
        </div>
        <div id="viewTool">
          <ViewTool />
        </div>
      </div>
    );
  }
};

export default Profile;
