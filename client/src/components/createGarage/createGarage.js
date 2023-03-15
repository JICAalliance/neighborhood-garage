import "./createGarage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GARAGE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

const CreateGarage = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || [];
      console.log("me==>  ",me);

  const [createGarage, { error }] = useMutation(CREATE_GARAGE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const create = await createGarage({
        variables: {
          admin: me._id,
          garageName: formState.name,
          description: formState.description,
        },
      });
      console.log("me==>  ",me);
    } catch (e) {
      console.log(e);
    }
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
