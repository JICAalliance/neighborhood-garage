import "./viewGarage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import GarageList from "../garageList";
import { QUERY_GARAGE } from "../utils/queries";

const ViewGarage = () => {
  const { loading, data } = useQuery(QUERY_GARAGE);
  const garages = data?.garages || [];

  return (
    <div className="container my-1 viewGarage-container">
      <h2>My Garages</h2>
      <div>
        {/* If the data is still loading, render a loading message */}
        {loading ? <div>Loading...</div> : <GarageList garages={garages} />}
      </div>
      <Link to="/profile">← Back to Profile</Link>
    </div>
  );
};

export default ViewGarage;
