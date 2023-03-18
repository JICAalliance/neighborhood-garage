import "./createGarage.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_GARAGE } from "../../utils/mutations";


const CreateGarage = () => {
  const [createGarage] = useMutation(CREATE_GARAGE);

  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

    //to navigate to profile once joined
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState.name,formState.description);
      const garage = await createGarage({
        variables: {
          garageName: formState.name,
          description: formState.description,
        }});

      if (garage) {
     
        //navigate to this garage
        navigate(`/viewGarage/${garage.data.createGarage._id}`);
      };


    }catch (e) {
    console.log(e);
  };

};


const handleChange = (event) => {
  const { name, value } = event.target;
  setFormState({
    ...formState,
    [name]: value,
  });
};

return (
  <div className="container my-1 createGarage-container">
    <h2>Create a Neighborhood Garage</h2>
    <form onSubmit={handleFormSubmit} className="createGarage-form">
      <div className="flex-row space-between my-2">
        <label htmlFor="name">Name:</label>
        <input
          placeholder="garage name"
          name="name"
          type="text"
          id="name"
          onChange={handleChange}
        />
      </div>
      <div className="flex-row space-between my-2">
        <label htmlFor="description">Description:</label>
        <textarea
          placeholder="Enter a description"
          name="description"
          id="description"
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
