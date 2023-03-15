import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../utils/queries";



const GarageList = ({ garage }) => {

    //capture list of members and admin info
    const adminId = garage.admin._id;


    const memberArray = garage.members;



    console.log("garageList ", adminId, memberArray);

    // //get User info
    // const { loading, admin } = useQuery(QUERY_SINGLE_USER, {
    //   variables: {id},
    // });


  if (!garage ) {
    return <h3>Not an Existing Garage</h3>;
  }
  else {
    console.log("ADMIN", garage.admin.name);



    return (
      <div key={garage._id} id='{garage._id}'>
        <h3>Welcome to {garage.garageName}!!!</h3>
        <h5>Admin: {garage.admin.name}</h5>
        <h5>Members:</h5>




        {/* {garage &&
        garage.map((Garage) => (
          <div key={Garage._id}>
            <h3>
              Garage Name: {Garage.garageName}
              <br />
            </h3>
            <h4>Garage Description: {Garage.description}</h4>
          </div>
        ))} */}
      </div>
    );
  }

};

export default GarageList;
