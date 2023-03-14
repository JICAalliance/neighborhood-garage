import "./createGarage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateGarage = () => {
  const [formState, setFormState] = useState({
    garageName: "",
    garageDescription: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 createGarage-container">
      <h2>Create Garage</h2>
      <form className="createGarage-form">
        <div className="flex-row space-between my-2">
          <label htmlFor="garageName">Neighborhood Garage Name:</label>
          <input
            placeholder="garage name"
            name="garageName"
            type="string"
            id="garageName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="garageDescription">
            Neighborhood Garage Description:
          </label>
          <textarea
            placeholder="garage description"
            name="garageDescription"
            id="garageDescription"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/profile">← Go to Profile</Link>
    </div>
  );
};

export default CreateGarage;
