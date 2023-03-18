import "./editGarage.scss";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GARAGE } from "../../utils/mutations";
import { QUERY_GARAGE } from "../../utils/queries";
import Auth from '../../utils/auth';

const EditGarage = () => {
  const [formState, setFormState] = useState({
    name: "Default value",
    description: "Default value",
  });
  const navigate = useNavigate()
  //query this garage
  const { garageId } = useParams();
  // pass URL parameter
  const { loading, data } = useQuery(QUERY_GARAGE, {
    // pass URL parameter
    variables: { id: garageId },
  });

  const garage = data?.garage || [];

  console.log('editGarage garage', garage);

  const [garageUpdate, { error }] = useMutation(UPDATE_GARAGE);


  const user = Auth.getProfile();
  const isAdmin = garage._id === user.data._id ? true : false;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log(formState.name,formState.description);
      const updatedGarage = await garageUpdate({
        variables: {
          invitationCode: garage.invitationCode,
          adminIs: isAdmin,
          garageName: formState.name,
          description: formState.description,
        }
      });

      navigate(`/api/viewGarage/${updatedGarage.data.updateGarage._id}`);

    } catch (e) {
      console.log(e);
    };
  };



  if (loading) {
    return (<div className="container my-2 viewGarage-container">
      <h2>Edit My Garage</h2>
      <div>Loading...</div>
      <Link reloadDocument to="/profile">← Back to Profile</Link>
    </div>);
  }
  else {

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    return (
      <div className="container my-1 createGarage-container">
        <h2>Edit Garage</h2>
        <form onSubmit={handleFormSubmit} className="createGarage-form">
          <div className="flex-row space-between my-2">
            <label htmlFor="name">Name:</label>
            <textarea
              defaultValue={garage.garageName}
              cols="50"
              rows="1"
              name="name"
              type="text"
              id="name"
              onChange={handleChange}
            >

            </textarea>
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="description">Description:</label>
            <textarea
              rows="3" cols="40"
              defaultValue={garage.description}
              name="description"
              id="description"
              onChange={handleChange}>
            </textarea>

          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="flex-row flex-end">
            <button >Cancel Edit</button>
          </div>

        <Link to="/profile">← Go to Profile</Link>
      </div>
    );
  }
};

export default EditGarage;
