import "./viewGarage.scss";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import GarageList from "../garageList";
import { QUERY_GARAGE} from "../utils/queries";

const ViewGarage = () => {
  // Use `useParams()` to retrieve value of the route parameter `:garageId`
  const { garageId } = useParams();
  const { loading, data } = useQuery(QUERY_GARAGE, {
    // pass URL parameter
    variables: { id: garageId },
  });


  const garage = data?.garage || [];
  console.log("viewGarage", garage);


  if (loading) {
    return (<div className="container my-2 viewGarage-container">
      <h2>My Garage</h2>
      <div>Loading...</div>
      <Link to="/profile">← Back to Profile</Link>
    </div>);
  }
  else{
    console.log(garage);

  return (
    <div className="container my-1 viewGarage-container">
      {/* <h2>My Garage</h2> */}
      <div>
        {/* If the data is still loading, render a loading message */}
        {loading ? <div>Loading...</div> : <GarageList garage={garage} />}
      </div>
      <Link to="/profile">← Back to Profile</Link>
    </div>
  );
  };
};

export default ViewGarage;
