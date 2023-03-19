import "./addTool.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_TOOL } from "../../utils/mutations";

// import ViewTool from '../viewTool';


function AddTool(props) {
  // console.log(props);
  const [formState, setFormState] = useState({ name: "", description: "", image: "" });
  const [addTool, { error }] = useMutation(ADD_TOOL);
  const [file, setFile] = useState([]);

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
    console.log(file);

    const { files } = document.querySelector('input[type="file"]')
    
    const tool_image = await convertBase64(files[0]);
    console.log('tool image', tool_image)
    // const formData = new FormData();
    // formData.append("fileupload", file);
    // console.log(formData);

    // Image is simply 'placeholder' for now
    try {
      const user = await addTool({
        variables: {
          name: formState.name,
          description: formState.description,
          image: tool_image
        }
      });
      if (user){
      console.log("USER AddTool", user);
      };
 
      // window.location.reload();

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

  // const handleUpload = (event) => {
  //   setFile(
  //     URL.createObjectURL(event.target.files[0])
  //     );
  // }

  return (
    <div className="ui container">
      <div className="ui grid">
        <form onSubmit={handleFormSubmit} className="ui form six wide column centered">
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
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description:</label>
            <textarea
              placeholder="Enter a description"
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="image">Upload a picture</label>
            <input
              name="image"
              type="file"
              id="image"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit" className="ui button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTool;
