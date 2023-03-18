import "./profile.scss";
import React, {useEffect} from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
//import components
import ViewTool from '../../toolComponents/viewTool';
import AddTool from '../../toolComponents/addTool';
import JoinGarage from "../../garageComponents/joinGarage";

import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";



const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const navigate = useNavigate()

  const navToGarage = (e) => {
    // navigate(e.target.value)
    if (e.target.value !== "Choose Garage") {
      return (navigate(`/viewGarage/${e.target.value}`))
    }
    // console.log(e.target.value)
  };

  const navToCreateGarage = () => {
    return (navigate(`/createGarage`))
  };

  // const navToJoinGarage = () => {
  //   return (navigate(`/joinGarage`))

  // };

  if (loading) {
    return <div>Loading...</div>;
  }
  else {
    const { name, email, myGarages, myTools, phone, address, borrowedTools } = data.currentUser;



    return (
      <div id="profile">
        <h1>My Profile</h1>
        <h3>Welcome {name}!</h3>

        <div><button onClick={navToCreateGarage}>Create Garage</button></div>

        <div>
          {/* <button onClick={navToJoinGarage}> Join Garage</button> */}
          <JoinGarage />
        </div>

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
  }
};

export default Profile;
