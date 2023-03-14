import "./addTool.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import Auth from "../utils/auth";
import { ADD_TOOL } from "../utils/mutations";

function AddTool(props) {
  const [formState, setFormState] = useState({ name:"", description: "", image: ""});
  const [addTool] = useMutation(ADD_TOOL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addTool({
      variables: {
        name: formState.name,
        description: formState.description,
        image: formState.image
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 addTool-container">

      <h2>Create A Tool</h2>
      <form onSubmit={handleFormSubmit} className="addTool-form">
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="tool name"
            name="name"
            type="name"
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
        <div className="flex-row space-between my-2">
          <label htmlFor="image">Upload a picture</label>
          <input
            name="filename"
            type="file"
            id="image"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddTool;
