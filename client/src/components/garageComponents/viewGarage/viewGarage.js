import "./viewGarage.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import GarageList from "../garageList";
import { QUERY_GARAGE } from "../../utils/queries";


const ViewGarage = () => {
  // Use `useParams()` to retrieve value of the route parameter `:garageId`
  const { garageId } = useParams();
  const { loading, data } = useQuery(QUERY_GARAGE, {
    // pass URL parameter
    variables: { id: garageId },
  });
  const navigate = useNavigate();

  const garage = data?.garage || [];

  const toProfile = () => {
    navigate('/profile', { reload: true });
  }

  if (loading) {
    return (<div className="container my-2 viewGarage-container">
      <h2>My Garage</h2>
      <div>Loading...</div>
      <Link onClick={() => { window.location.href = "/profile" }} to="/profile">← Back to Dashboard</Link>
    </div>);
  }
  else {

    return (
      <div>
        {/* <h2>My Garage</h2> */}
        <div className='flex-center garDesc'>

          {/* If the data is still loading, render a loading message */}
          {loading ? <div>Loading...</div> : <GarageList garage={garage} />}

        </div>
        {/* <button className="button-30 toProfile" onClick={toProfile}>To Dashboard <i class="caret square right outline icon"></i></button> */}
        <Link onClick={() => { window.location.href = "/profile" }} to="/profile">← Go to Profile</Link>
      </div>
    );
  };
};

export default ViewGarage;
