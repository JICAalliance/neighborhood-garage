import "./viewChat.scss";
import React from 'react'
import Chat from '../chat';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import ChatRender from '../chatRender';
import { useState } from "react";

// import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth"
import { ADD_MESSAGE } from "../../utils/mutations";
import { QUERY_GARAGE_MESSAGES } from "../../utils/queries";



function ViewChat(props) {

  //preload earlier messages
  let chatHolder = [];

  const { loading, data } = useQuery(QUERY_GARAGE_MESSAGES, {
    variables: { id: props.garageId },
  });
  if (loading) {
    return <div>Loading ...</div>;
  }
  else {
    console.log('currentGarage', data);
    data.messages.messages.forEach((message) => {
      chatHolder.push(message);
    });

    console.log("chatHolder", chatHolder);


    return (
      <Chat  className="chat" initMessage={chatHolder} garageId={props.garageId} />
    );
  };
}



export default ViewChat;