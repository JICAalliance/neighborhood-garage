import "./addTool.scss";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TOOL } from "../../utils/mutations";


function AddTool(props) {

  const [formState, setFormState] = useState({ name: "", description: "", image: "" });
  const [addTool, { error }] = useMutation(ADD_TOOL);
  const [errorResponse, setError] = useState(null);

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

    const { files } = document.querySelector('input[type="file"]')

    const tool_image = await convertBase64(files[0]);
    console.log('tool image', tool_image)

    try {
      const user = await addTool({
        variables: {
          name: formState.name,
          description: formState.description,
          image: tool_image
        }
      });
      if (user) {
        console.log("USER AddTool", user);
      };
      //clear form
      event.target.reset();

    } catch (e) {
      console.log(e);
      setError(e);
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
    <div className="ui container">
      <div>{errorResponse ? "Something went wrong..." : ''}</div>
      <div className="ui grid">
        <form onSubmit={handleFormSubmit} className="ui form ten wide column centered">
          <div className="flex-center">
            <h2>Add Tool</h2>
          </div>
          <div className="field">
            <label htmlFor="name">Name:</label>
            <input
              placeholder="tool name"
              name="name"
              type="text"
              id="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description:</label>
            <input
              placeholder="Enter a description"
              name="description"
              id="description"
              required
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="image">Upload a picture</label>
            <input
              name="image"
              type="file"
              id="image"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end flex-center">
            <button type="submit" className="ui button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTool;
