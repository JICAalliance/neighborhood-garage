import "./viewChat.scss";
import React from 'react'
import Chat from '../chat';
import { useQuery } from "@apollo/client";
import { QUERY_GARAGE_MESSAGES } from "../../utils/queries";
import ErrorBoundary from '../../errorBoundary';



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
      <ErrorBoundary fallback={"Something went wrong"}>
        <Chat className="chat" initMessage={chatHolder} garageId={props.garageId} />
      </ErrorBoundary>
    );
  };
}



export default ViewChat;