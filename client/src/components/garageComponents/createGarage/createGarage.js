import "./createGarage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_GARAGE } from "../../utils/mutations";

import { Modal } from 'semantic-ui-react';

const CreateGarage = () => {
  const [createGarage] = useMutation(CREATE_GARAGE);

  //for modal use
  const [open, setOpen] = useState(false)

  //set States
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  //error response
  const [errorResponse, setError] = useState(null);

  //to navigate to profile once joined
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState.name, formState.description);
      const garage = await createGarage({
        variables: {
          garageName: formState.name,
          description: formState.description,
        }
      });

      if (garage) {

        //navigate to this garage
        navigate(`/viewGarage/${garage.data.createGarage._id}`);
      };


    } catch (e) {
      console.log("Cannot create garage.", e);
      setError(e);

    };

  };

  const toProfile = () => {
    navigate('/profile');
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex-center">
      {/* <h1 id='create-title'>Create a Neighborhood Garage</h1> */}
      <div>{errorResponse ? "Something went wrong..." : ''}</div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size={'large'}
        trigger={<button className="button-30 btnProfile " role="button">Create Garage →</button>}
      >
        <Modal.Header>Join A Neighborhood Garage</Modal.Header>
        <Modal.Content className="flex-center">
        <form onSubmit={handleFormSubmit} className="createGarage-form ui form twelve wide column centered">
          <div className="flex-row space-between my-2 container">
            <div className="field">
              <h3>
                <label htmlFor="name">Name:</label>
                <input
                  placeholder="Garage Name"
                  name="name"
                  type="text"
                  id="name"
                  required
                  onChange={handleChange}
                  size="2"
                />
              </h3>
            </div>
          </div>
          <div className="flex-row space-between my-2 container">
            <div className="field">
              <h3>
                <label htmlFor="description">Description:</label>
                <textarea
                  placeholder="What is your garage for?"
                  name="description"
                  id="description"
                  onChange={handleChange}
                />
              </h3>
            </div>
          </div>

          <br />
          <div className="flex-center">
            <button type="submit" className="button-30 btnSub">Submit</button>
          </div>
          <br />
        </form>
        </Modal.Content>
      </Modal>

    </div>
  );
};

export default CreateGarage;
