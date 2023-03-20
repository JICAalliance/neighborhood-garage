import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LEAVE_GARAGE, DELETE_GARAGE } from '../../utils/mutations';
import ClipboardCopy from "../../clipboardCopy";
import ToolWrapper from "../../toolComponents/toolWrapper";
import { Button, Confirm } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import Auth from '../../utils/auth';
import ViewChat from "../../messageComponent/viewChat";
import ErrorBoundary from '../../errorBoundary';




const GarageList = ({ garage }) => {
  //to handle delete confirm
  const [openState, setOpenState] = useState(false);

  //error response
  const [errorResponse, setError] = useState(null);

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

  //check is current user is admin
  const isAdmin = adminId === user.data._id ? true : false;

  //initiate the mutations
  const [leaveGarage] = useMutation(LEAVE_GARAGE);
  const [deleteGarage] = useMutation(DELETE_GARAGE);

  //leave garage handler
  //when user leaves delete garage?
  const leaveGarageHandler = async (e) => {
    e.preventDefault();
    const inviteCode = e.currentTarget.getAttribute("data-value");
    try {
      // console.log("inviteCode ", inviteCode)
      const user = await leaveGarage({
        variables: {
          invitationCode: inviteCode,
        },
      });

      navigate('/profile', { reload: true });

    } catch (e) {
      console.log(e);
      setError(e);
    };
  }


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

      try {
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
      } catch (e) {
        console.log(e);
        setError(e);
      };
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
    console.log("garageTools", garageTools)


    return (
      <div>
        <div>{errorResponse ? "Something went wrong..." : ''}</div>
        <div key={garage._id} id={garage._id} className="container">
          <h3>Welcome to {garage.garageName}!!!</h3>
          <h4><em>{garage.description}...</em></h4>

          <h4 id='invitationCode' >
            <ErrorBoundary fallback={"Something went wrong"}>
              <ClipboardCopy copyText={garage.invitationCode} />
            </ErrorBoundary>
          </h4>

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


            {/* Only for non Admins... admins to leave must delete */}
            {!isAdmin
            ? <h5><Button color='red' data-value={garage.invitationCode} onClick={leaveGarageHandler}>Leave This Garage</Button></h5>
            :''
            }
          
          {/* GARAGE BULLETIN */}
          <ErrorBoundary fallback={"Something went wrong"}>
            <ViewChat garageId={garage._id} />
          </ErrorBoundary>

          <h4>Garage Tools:</h4>
          <div id='displayTools'>

            {garageTools.map((tool, index) => (
              <ErrorBoundary fallback={"Something went wrong"}>
                <ToolWrapper tool={tool} key={index} checkoutModal={true}>
                </ToolWrapper>
              </ErrorBoundary>
            )
            )}

          </div>
        </div>
      </div>
    );
  }

};

export default GarageList;
