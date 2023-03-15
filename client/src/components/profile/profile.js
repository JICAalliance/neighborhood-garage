import "./profile.scss";
import React from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
//import components
import ViewTool from '../viewTool';
import AddTool from '../addTool';

import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { QUERY_USER_GARAGES } from "../utils/queries";


const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);


  const navigate = useNavigate()




  const navToGarage = (e) => {
    // navigate(e.target.value)
    if (e.target.value !== "Choose Garage") {
      console.log(e.target);
      return (navigate(`/garage/${e.target.value}`))
    }
    // console.log(e.target.value)
  };

  const navToCreateGarage = () => {
    return (navigate(`/createGarage`))
  };


  //const { loading, data, userId } = useQuery(QUERY_USER_GARAGES,{variables:{userId}});
  //const garages = data?.garages || [];


  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("PROFILE DATA", data.currentUser.name);
  const { name, email, myGarages, myTools, phone, address, borrowedTools } = data.currentUser;
  console.log("myGarages", myGarages[0]);



  return (
    <div id="profile">
      <h1>My Profile</h1>
      <h3>Welcome {name}!</h3>

      <div><button onClick={navToCreateGarage}>Create Garage</button></div>
      
      <div><button>Join Garage</button></div>
      {/* product will be what is displayed, index for unique ID; replace the array with dynamic values of garages user is in*/}
      <select name="garage" onClick={(e) => navToGarage(e)}>
        <option>Choose Garage</option>
        {myGarages.map((garage) => {
          return (
            <option value={garage._id} key={garage._id} onClick={(e) => navToGarage(e)}>{garage.garageName}</option>
          )
        })}
      </select>
      <div id='addTool'>
        <AddTool />
      </div>
      <div id='viewTool'>
        <ViewTool />
      </div>
    </div>

  );

};

export default Profile;
