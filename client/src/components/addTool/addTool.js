import "./addTool.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_TOOL } from "../utils/mutations";

function AddTool(props) {
  const [formState, setFormState] = useState({ name: "", description: "", image: "" });
  const [addTool, { error }] = useMutation(ADD_TOOL);

  const convertBase64 = (file) => {
    //if it's successful or if there's an error
    return new Promise((resolve, reject) => {
      //similar to node fs but for JS; will just read through the image file
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      //on load eventListener - particular to file readers
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const file = formState.image;
    console.log(formState.name);
    // const tool_image = await convertBase64(file);
    try {
      const tool = await addTool({
        variables: {
          name: formState.name,
          description: formState.description,
          image: "test"
        }
      })
      console.log(tool);
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
        <div className="flex-row space-between my-2 file input">
          <label htmlFor="image">Upload a picture</label>
          <input
            name="image"
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
