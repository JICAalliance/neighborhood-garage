import React from "react";

const GarageList = ({ garages }) => {
  if (!garages.length) {
    return <h3>No Garages Yet</h3>;
  }

  return (
    <div>
      {garages &&
        garages.map((Garage) => (
          <div key={Garage._id}>
            <h3>
              Garage Name: {Garage.garageName}
              <br />
            </h3>
            <h4>Garage Description: {Garage.description}</h4>
          </div>
        ))}
    </div>
  );
};

export default GarageList;
