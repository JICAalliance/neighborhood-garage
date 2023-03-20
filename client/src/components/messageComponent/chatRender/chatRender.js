import "./chatRender.scss";
import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";





function ChatRender({message}) {
  // console.log("PROPS in CHAT RENDER", message)
  const user = Auth.getProfile();
  // console.log("chatRender",user.data._id);

  const chatDate = new Date(Date.parse(message.createdAt));

  const deleteMessage = (event) => {
    event.preventDefault()

  }

  return (


      <Comment key={message._id}>
        {/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
        <Comment.Content>
        
          <Comment.Author as='a'>{message.author.name}</Comment.Author>
          <Comment.Metadata>
            <div> On {chatDate.toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</div>
          </Comment.Metadata>
          {/* {message.author._id===user} */}
          <div className="deleteChat" onClick={deleteMessage}>
          <i className="trash alternate icon"></i>
          </div>

          <Comment.Text> {message.body}</Comment.Text>
        </Comment.Content>
      </Comment>

  );
};

// }

export default ChatRender;