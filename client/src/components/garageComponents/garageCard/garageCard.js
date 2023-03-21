import './garageCard.scss';
import React from "react";
import { useNavigate} from "react-router-dom";
import { Card, Button, Image } from 'semantic-ui-react';
import Auth from '../../utils/auth';

const GarageCard = ({ garage }) => {

  console.log(garage);

  const userId = Auth.getProfile().data._id;
  const userOwned = (garage.admin._id == userId);
    //to navigate back to the garage
    const navigate = useNavigate();

  const navToGarage = (e) => {
    // navigate(e.target.value)
    if (e.target.value !== "Choose Garage") {
      return navigate(`/viewGarage/${e.target.value}`);
    }
    // console.log(e.target.value)
  };

  return <div id='garage-container'>
    <Card>
      <Card.Content>
        <Image
        // floated='right'
        // size='mini'
        // src={}
        />
        <Card.Header>{garage.garageName}</Card.Header>
        <Card.Meta>
          <h4 className='adminLabel'>Admin: {userOwned ? <span>You</span> : <span>{garage.admin.name}</span>}</h4>
        </Card.Meta>
        <Card.Description>
          {garage.description}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <button className='button-30 garCard' value={garage._id} onClick={(e) => navToGarage(e)}> View Garage</button>
      </Card.Content>
    </Card>
    <br/>
  </div>

};


export default GarageCard;