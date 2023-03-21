import "./profile.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import components
import {
  ViewTool,
  AddTool,
  JoinGarage
} from "../../../components";

import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import GarageCard from "../../garageComponents/garageCard/garageCard";

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

  if (loading) {
    return <div>Loading...</div>;
  };

  if (data) {

    const { name, email, myGarages, myTools, phone, address, borrowedTools } =
      data.currentUser;
    console.log("MYGARAGES", myGarages);

    return (
      <div id="profile">
        <h1 className="welcome">Dashboard</h1>
        {/* <h2 className="welcome">Welcome {name}!</h2> */}

        <div className="ui stackable three column grid">
          <div className="row reveal">
            <div className="column">
              <h2 className="welcome">Info</h2>
              <div className="flex-direction"><div className="sectionwidth"><p className="info" >This is where your account information is stored. Use the edit profile button to change your credentials.</p></div></div>
            </div>
            <div className="column">
              <div id="info" className="welcome">
                <p><b>Name:</b><br></br>{name} </p>
                <p><b>Email:</b><br></br>{email}</p>
                <p><b>Phone number:</b><br></br>{phone}</p>
                <p><b>Address:</b><br></br>{address}</p>
              </div>
            </div>

            <div className="column welcome">
              <button
                onClick={navToEditProfile}
                className="button-30"
                role="button"
              >
                Edit Profile →
              </button>
            </div>
          </div>
          <div className="row reveal">
            <div className="column">
              <h2 className="welcome">Garages</h2>
              <div className="flex-direction"><div className="sectionwidth"><p className="info" >See the garages you're a member of, create a garage, or join a garage.</p></div></div>
            </div>
            <div className="column">
              <div id='displayGarages' className="ui two column grid">
                {myGarages.length ?
                  <div>
                    {myGarages.map((garage, index) => (
                      <div className="column">
                        <GarageCard garage={garage} key={index}>
                        </GarageCard>
                      </div>
                    )
                    )}
                  </div>
                  :
                  <div>
                    <p>You are not in any garages. Create or join a garage!</p>
                  </div>
                }
              </div>
            </div>
            <div className="column center">
              <div className="welcome">
                <button
                  className="button-30"
                  role="button"
                  onClick={navToCreateGarage}
                >
                  Create Garage →
                </button>
              </div>
              <br></br>

              <div className="welcome">
                <JoinGarage />
              </div>
            </div>
          </div>
          <div class="three column row reveal">
            <div class="column">

              <h2 className="welcome">Toolbox</h2>
              <div className="flex-direction"><div className="sectionwidth"><p className="info" >Find your tools here, or add a tool to your collection. When you're in a garage, these tools will be shown to everyone in that garage.</p></div></div>
            </div>
            <div className="column">
              {myTools.length ?
                <ViewTool />
                :
                <p>You do not have any tools yet.</p>
              }
            </div>
            <div id="addTool" className="five wide column">
              <AddTool />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
