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

  console.log(garage);

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



    return (
      <div>
        <div>{errorResponse ? "Sorry, something went wrong..." : ''}</div>
        <div key={garage._id} id={garage._id} className="container">
          <h1>Welcome to {garage.garageName}!</h1>
          <div className="ui stackable grid">
            <div className="six wide column">
              <h3>Description: <em>{garage.description}</em></h3>
              <h3 id='invitationCode' >
                <ErrorBoundary fallback={"Something went wrong"}>
                  <ClipboardCopy copyText={garage.invitationCode} />
                </ErrorBoundary>
                <br></br>
                Admin: {garage.admin.name}
              </h3>
              <h3>Members:
                {memberArray.map((member) => {

                  return <li key={member._id} id={member.id}> {member.name} </li>
                })}
              </h3>
              {isAdmin
                ? <div>
                  <Button color='olive' onClick={event => window.location.href = `/editGarage/${garage._id}`}>Edit Garage</Button>
                  <Button color='olive' onClick={event => window.location.href = `/profile`}>To Dashboard</Button>
                  <Button color='red' data-value={garage.invitationCode} onClick={show} >Delete Garage</Button>
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
              {/* Only for non Admins... admins to leave must delete */}
              {!isAdmin
                ? <h5>
                  <Button color='red' data-value={garage.invitationCode} onClick={leaveGarageHandler}>Leave This Garage</Button>
                  <Button color='olive' onClick={event => window.location.href = `/profile`}>To Dashboard</Button>
                </h5>
                : ''
              }
            </div>
            <div className="eight wide column">
              {/* GARAGE BULLETIN */}
              <ErrorBoundary fallback={"Something went wrong"}>
                <ViewChat garageId={garage._id} />
              </ErrorBoundary>
            </div>
          </div>











          <h4>Garage Tools:</h4>
          <div id='displayTools'>
            <ErrorBoundary fallback={"Something went wrong"}>
              {garageTools.map((tool, index) => (

                <ToolWrapper tool={tool} key={index} checkoutModal={true}>
                </ToolWrapper>

              )
              )}
            </ErrorBoundary>

          </div >
        </div >
      </div >
    );
  }

};

export default GarageList;
