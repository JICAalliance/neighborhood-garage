import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LEAVE_GARAGE } from "../utils/mutations";
import ClipboardCopy from "../clipboardCopy";
import ToolCard from "../toolCard";
import {Button} from 'semantic-ui-react';




const GarageList = ({ garage }) => {

  //capture list of members and admin info
  const adminId = garage.admin._id;
  const memberArray = garage.members;

  // console.log("garageList ", adminId, memberArray);

  //leave garage mutation
  const [leaveGarage]=useMutation(LEAVE_GARAGE);

  //leave garage handler
  const leaveGarageHandler = async (e) => {
    e.preventDefault();
    const inviteCode=e.currentTarget.getAttribute("data-value");

    console.log ("inviteCode ", inviteCode)
    const user = await leaveGarage({
      variables: {
        invitationCode:inviteCode,
      },
    });

    return user;

  };

  if (!garage) {
    return <h3>Not an Existing Garage</h3>;
  }
  else {
    console.log("ADMIN", garage.admin.name);

    //grab ALL TOOLS ID
    const garageTools = [];
    memberArray.forEach(member => {
  
      if (member){
        member.myTools.forEach(tool => {
          garageTools.push(tool);   
      })
    }

  });


  return (
    <div key={garage._id} id='{garage._id}'>
      <h3>Welcome to {garage.garageName}!!!</h3>

      <h4 id='invitationCode' key={garage.invitationCode} ><ClipboardCopy copyText={garage.invitationCode} /></h4>

      <h5>Admin: {garage.admin.name}</h5>

      <h5>Members:
        {memberArray.map((member) => {

          return <li key={member._id} id='{member._id} member.name'> {member.name} </li>
        })}
      </h5>

        <h5><Button color='black' data-value={garage.invitationCode} onClick={leaveGarageHandler}>->Leave This Garage</Button></h5>

      <h4>Garage Tools:</h4>
      <div id='displayTools'>

        <ToolCard tools={garageTools} checkoutModal={true}/>

      </div>
    </div>
  );
}

};

export default GarageList;

