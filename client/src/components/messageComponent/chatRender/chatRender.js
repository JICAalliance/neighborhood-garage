import "./chatRender.scss";
import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { DELETE_MESSAGE } from "../../utils/mutations";




function ChatRender({message}) {
  // console.log("PROPS in CHAT RENDER", message)
  const user = Auth.getProfile();
  // console.log("chatRender",user.data._id);

  //initiate mutations
  const [deleteMessage] =useMutation(DELETE_MESSAGE);

  const chatDate = new Date(Date.parse(message.createdAt));

  const deleteMessageHandler = async (event) => {
    event.preventDefault();
    // get message ID
    const messageId = message._id;

    const messageDeleted = await deleteMessage({
      variables:{
        id: messageId,
      }
    })

    console.log("chartRender DELETED message", messageDeleted);


  }

  return (


      <Comment id={message._id}>
        {/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
        <Comment.Content>
        
          <Comment.Author as='a'>{message.author.name}</Comment.Author>
          <Comment.Metadata>
            <div> On {chatDate.toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</div>
          </Comment.Metadata>
          {/* {message.author._id===user} */}
          <div className="deleteChat" onClick={deleteMessageHandler}>
          <i className="trash alternate icon"></i>
          </div>

          <Comment.Text> {message.body}</Comment.Text>
        </Comment.Content>
      </Comment>

  );
};

// }

export default ChatRender;