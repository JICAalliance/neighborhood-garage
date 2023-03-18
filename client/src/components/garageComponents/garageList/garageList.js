import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LEAVE_GARAGE } from '../../utils/mutations';
import ClipboardCopy from "../../clipboardCopy";
import ToolCard from "../../toolComponents/toolCard";
import { Button } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import Auth from '../../utils/auth';




const GarageList = ({ garage }) => {

  //to navigate 
  const navigate = useNavigate();

  let adminId = '';
  let memberArray = '';

  if (garage) {
    //capture list of members and admin info
    adminId = garage.admin._id;
    memberArray = garage.members;
  }



  const user = Auth.getProfile();
  console.log('USER GARAGELIST', user.data._id);
  //check is current user is admin
  const isAdmin = adminId === user.data._id ? true : false;
  console.log('isAdmin', isAdmin);
  //leave garage mutation
  const [leaveGarage] = useMutation(LEAVE_GARAGE);

  //leave garage handler
  //when user leaves delete garage?
  const leaveGarageHandler = async (e) => {
    e.preventDefault();
    const inviteCode = e.currentTarget.getAttribute("data-value");

    console.log("inviteCode ", inviteCode)
    const user = await leaveGarage({
      variables: {
        invitationCode: inviteCode,
      },
    });

    navigate('/profile');

  };

  if (!garage) {
    return <h3>Not an Existing Garage</h3>;
  }
  else {

    //grab ALL TOOLS ID
    const garageTools = [];
    memberArray.forEach(member => {

      if (member) {
        member.myTools.forEach(tool => {
          garageTools.push(tool);
        })
      }

    });


    return (
      <div key={garage._id} id={garage._id}>
        <h3>Welcome to {garage.garageName}!!!</h3>

        <h4 id='invitationCode' key={garage.invitationCode} ><ClipboardCopy copyText={garage.invitationCode} /></h4>

        <h5>Admin: {garage.admin.name}</h5>
        {isAdmin
          ? <div>
            <button>Edit Garage</button>
            <button>Delete Garage</button>
          </div>
          :
          ''}

        <h5>Members:
          {memberArray.map((member) => {

            return <li key={member._id} id={member.id}> {member.name} </li>
          })}
        </h5>

        <h5><Button color='black' data-value={garage.invitationCode} onClick={leaveGarageHandler}>Leave This Garage</Button></h5>

        <h4>Garage Tools:</h4>
        <div id='displayTools'>

          {garageTools.map((tool, index) => (

            <ToolCard tool={tool} key={index} checkoutModal={true}>
            </ToolCard>
          )
          )}

        </div>
      </div>
    );
  }

};

export default GarageList;
