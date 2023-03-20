import "./createGarage.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_GARAGE } from "../../utils/mutations";


const CreateGarage = () => {
  const [createGarage] = useMutation(CREATE_GARAGE);

  //set States
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  const [errorResponse, setError] = useState(null);

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
    console.log("Cannot create garage.",e);
    setError(e);

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
  <div className="">
    <h1>Create a Neighborhood Garage</h1>
    <div>{errorResponse? "Something went wrong..." : ''}</div>
    <div className="ui grid">
    <form onSubmit={handleFormSubmit} className="createGarage-form ui form six wide column centered">
      <div className="flex-row space-between my-2">
        <div className="field">
        <label htmlFor="name">Name:</label>
          <input
            placeholder="Garage Name"
            name="name"
            type="text"
            id="name"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex-row space-between my-2">
          <div className="field">
            <label htmlFor="description">Description:</label>
            <input
              placeholder="What is your garage for?"
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
      </div>
      <br/>
      <div className="flex-center">
        <button type="submit" className="ui button">Submit</button>
      </div>
    </form>
    </div>

    <Link to="/profile">← Go to Profile</Link>
  </div>
);
};

export default CreateGarage;
