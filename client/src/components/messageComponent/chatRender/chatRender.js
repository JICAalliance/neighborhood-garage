import "./chatRender.scss";
import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

import { useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Auth from "../utils/auth";
import { QUERY_MY_TOOLS } from "../../utils/queries";



function ChatRender({message}) {
  console.log("PROPS in CHAT RENDER", message)

  // const { loading, data } = useQuery(QUERY_MY_TOOLS);
  // let tools = [];

  // if (loading) {
  //   <div>
  //     <h2>Searching for tools...</h2>
  //   </div>
  // };
  // if (data) {

  //   if (data.myTools.myTools) {
  //     tools = data.myTools.myTools;
  //   };

  return (


      <Comment key={message._id}>
        {/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
        <Comment.Content>
          <Comment.Author as='a'>{message.author.name}</Comment.Author>
          <Comment.Metadata>
            <div> On {message.createdAt}</div>
          </Comment.Metadata>
          <Comment.Text> {message.body}</Comment.Text>
        </Comment.Content>
      </Comment>

  );
};

// }

export default ChatRender;