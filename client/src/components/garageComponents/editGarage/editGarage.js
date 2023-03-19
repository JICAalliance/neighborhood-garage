import "./editGarage.scss";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GARAGE } from "../../utils/mutations";
import { QUERY_GARAGE } from "../../utils/queries";
import { Button } from 'semantic-ui-react';
import Auth from '../../utils/auth';

const EditGarage = () => {

  const [formState, setFormState] = useState({
    name: '',
    description: '',
  });

  const [garageUpdate, { error }] = useMutation(UPDATE_GARAGE);

  //to navigate back to the garage
  const navigate = useNavigate();

  //query this garage
  const { garageId } = useParams();
  // pass URL parameter to get garage data
  const { loading, data } = useQuery(QUERY_GARAGE, {
    // pass URL parameter
    variables: { id: garageId },
  });

  const garage = data?.garage || [];

  //get user data
  const user = Auth.getProfile();

  //set admin false
  let isAdmin = false;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedGarage = await garageUpdate({
        variables: {
          invitationCode: garage.invitationCode,
          adminIs: isAdmin,
          garageName: formState.name,
          description: formState.description,
        }
      });

      navigate(`/viewGarage/${updatedGarage.data.updateGarage._id}`,{reload:true});

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
    //check if user is admin
    isAdmin = garage.admin._id === user.data._id ? true : false;

    const handleGoBackGarage = (event) => {
      event.preventDefault();
      navigate(`/viewGarage/${garage._id}`);
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    return (
      <div className="createGarage-container">
        <h2>Edit {garage.garageName} Garage</h2>
        <form onSubmit={handleFormSubmit} className="createGarage-form">
          <div className="flex-row space-between my-2">
            <label htmlFor="name">Name:</label>
            <textarea
              placeholder={'Change from ' + garage.garageName + '? Please do not leave this blank on submit.'}
              rows="2"
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
              rows="3" 
              placeholder={'Change the description of ' + garage.description + '?'}
              name="description"
              id="description"
              onChange={handleChange}>
            </textarea>

          </div>
          <div className="flex-row flex-end">
            <Button color='olive' type="submit">Submit</Button>   
            <Button color='black' onClick={handleGoBackGarage}>Cancel and Back to Garage</Button>
          </div>
        </form>

        <Link to="/profile">← Go to Profile</Link>
      </div>
    );
  }
};

export default EditGarage;
