import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_GARAGE_TOOLS} from "../utils/queries";
import ClipboardCopy from "../clipboardCopy";
import ToolCard from "../toolCard";



const GarageList = ({ garage }) => {

  //capture list of members and admin info
  const adminId = garage.admin._id;
  const memberArray = garage.members;

  console.log("garageList ", adminId, memberArray);

  if (!garage) {
    return <h3>Not an Existing Garage</h3>;
  }
  else {
    console.log("ADMIN", garage.admin.name);

    //grab ALL TOOLS ID
    const garageTools = [];
    memberArray.forEach(member => {
      member.myTools.forEach(tool => {
        garageTools.push(tool);
      })

    });

    return (
      <div key={garage._id} id='{garage._id}'>
        <h3>Welcome to {garage.garageName}!!!</h3>

        <h4 id='invitationCode' key={garage.invitationCode}><ClipboardCopy copyText={garage.invitationCode} /></h4>

        <h5>Admin: {garage.admin.name}</h5>

        <h5>Members:
          {memberArray.map((member) => {

            return <li key={member._id} id='{member._id} member.name'> {member.name} </li>
          })}
        </h5>

        <h4>Garage Tools:</h4>
        <div id='displayTools'>

          <ToolCard tools={garageTools} />

        </div>
      </div>
    );
  }

};

export default GarageList;
