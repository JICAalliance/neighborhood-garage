import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LEAVE_GARAGE, DELETE_GARAGE } from '../../utils/mutations';
import ClipboardCopy from "../../clipboardCopy";
import ToolWrapper from "../../toolComponents/toolWrapper";
import { Button, Confirm } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import Auth from '../../utils/auth';
import ViewChat from "../../messageComponent/viewChat";




const GarageList = ({ garage }) => {
  //to handle delete confirm
  const [openState, setOpenState] = useState(false);

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

  //initiate the mutations
  const [leaveGarage] = useMutation(LEAVE_GARAGE);
  const [deleteGarage] = useMutation(DELETE_GARAGE);

  //leave garage handler
  //when user leaves delete garage?
  const leaveGarageHandler = async (e) => {
    e.preventDefault();
    const inviteCode = e.currentTarget.getAttribute("data-value");

    // console.log("inviteCode ", inviteCode)
    const user = await leaveGarage({
      variables: {
        invitationCode: inviteCode,
      },
    });

    navigate('/profile', { reload: true });

  };


  const handleCancel = () => {
    setOpenState(false);
  };

  if (!garage) {
    return <h3>Not an Existing Garage</h3>;
  }
  else {


    //callback functions to confirm delete
    const show = () => setOpenState(true)
    const handleConfirm = async (e) => {
      e.preventDefault();
      setOpenState(false);


      const inviteCode = garage.invitationCode;
      console.log("inviteCode", inviteCode);

      const garageDeleted = await deleteGarage({
        variables: {
          adminIs: isAdmin,
          invitationCode: inviteCode,
        },
      })
      //navigate to profile
      navigate('/profile', { reload: true });
    }

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
      <div key={garage._id} id={garage._id} className="container">
        <h3>Welcome to {garage.garageName}!!!</h3>
        <h4><em>{garage.description}...</em></h4>

        <h4 id='invitationCode' key={garage.invitationCode} ><ClipboardCopy copyText={garage.invitationCode} /></h4>

        <h5>Admin: {garage.admin.name}</h5>
        {isAdmin
          ? <div>
            <Button color='olive' onClick={event => window.location.href = `/editGarage/${garage._id}`}>Edit Garage</Button>
            <Button color='black' data-value={garage.invitationCode} onClick={show} >Delete Garage</Button>
            <Confirm
              data-value={garage.invitationCode}
              open={openState}
              content='Are you absolutely sure you want to delete this garage?'
              cancelButton='Cancel Delete'
              confirmButton="Sure!"
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          </div>
          :
          ''}

        <h5>Members:
          {memberArray.map((member) => {

            return <li key={member._id} id={member.id}> {member.name} </li>
          })}
        </h5>

        <h5><Button color='red' data-value={garage.invitationCode} onClick={leaveGarageHandler}>Leave This Garage</Button></h5>
{/* GARAGE BULLETIN */}
        <ViewChat garageId={garage._id}/>

        <h4>Garage Tools:</h4>
        <div id='displayTools'>

          {garageTools.map((tool, index) => (

            <ToolWrapper tool={tool} key={index} checkoutModal={true}>
            </ToolWrapper>
          )
          )}

        </div>
      </div>
      
    );
  }

};

export default GarageList;
