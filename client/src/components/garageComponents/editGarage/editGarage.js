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
  //error response
  const [errorResponse, setError] = useState(null);

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
      console.log('Not able to update.',e);
      setError(e);
      alert("Our apologies, we cannot update your garage at this time.");
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
      <div className="flex-center createGarage-container">
        <div>{errorResponse? "Something went wrong..." : ''}</div>
        <h2>Edit {garage.garageName} Garage</h2>
        <form onSubmit={handleFormSubmit} className="createGarage-form">
          <div className="flex-row space-between my-2 editFont">
            <label htmlFor="name">Name:</label>
            <textarea
              placeholder={'Change from ' + garage.garageName + '? Please do not leave this blank on submit.'}
              rows="3"
              name="name"
              type="text"
              id="name"
              required
              onChange={handleChange}
            >
            </textarea>
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="description">Description:</label>
            <textarea
              rows="5" 
              placeholder={'Change the description of ' + garage.description + '?'}
              name="description"
              id="description"
              onChange={handleChange}>
            </textarea>

          </div>
          <div></div>
          <div className="btn flex-column center flex-end">
            <button className='button-30 subBtn' type="submit">Submit</button>   
            <br/>
            <button className='button-30 cancelBtn' onClick={handleGoBackGarage}>Back to Garage</button>
          </div>
        </form>

        <Link onClick={() => { window.location.href = "/profile" }} to="/profile">← Got to Profile</Link>
      </div>
    );
  }
};

export default EditGarage;
