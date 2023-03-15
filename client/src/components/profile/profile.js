import "./profile.scss";
import React from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import ViewTool from '../viewTool';
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";


const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);


  const navigate = useNavigate()
  const navToGarage = (e) => {
    // navigate(e.target.value)
    if (e.target.value !== "Choose Garage") {
      return (navigate(`/garage/${e.target.value}`))
    }
    // console.log(e.target.value)
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("PROFILE DATA", data.currentUser.name);
  const {name, email, myGarages, myTools, phone, address}=data.currentUser;
  console.log("myGarages",myGarages[0]);

  return (
    <div id="profile">
      <h1>My Profile</h1>
      <h3>Welcome {name}!</h3>
      <div><button>Create Garage</button></div>
      <div><button>Join Garage</button></div>
      {/* product will be what is displayed, index for unique ID; replace the array with dynamic values of garages user is in*/}
      <select name="product" onClick={(e) => navToGarage(e)}>
        <option>Choose Garage</option>
        {myGarages.map((garage) => {
          return (
            <option value={garage.garageName} key={garage._id} onClick={(e) => navToGarage(e)}>{garage.garageName}</option>
          )
        })}
      </select>
      <div id='viewTool'>
        <ViewTool />
      </div>
    </div>

  )
};

export default Profile;
