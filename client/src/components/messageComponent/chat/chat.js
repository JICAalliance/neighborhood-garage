import "./chat.scss";
import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import ChatRender from '../chatRender';
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_MESSAGE, DELETE_MESSAGE } from "../../utils/mutations";




function Chat({ initMessage, garageId }) {

  //find out who the user is
  const user = Auth.getProfile();
  console.log("USER", user.data._id);
  const userId = user.data._id;


  //initiate mutations
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [addMessage] = useMutation(ADD_MESSAGE);

  //initialize states
  const [formState, setFormState] = useState({
    body: "",
  });
  const [savedChat, setSavedChat] = useState(initMessage);
  const [newChat, setNewChat] = useState([]);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }



  const handleFormSubmit = async (event) => {

    try {
      const newMessage = await addMessage({
        variables: {
          body: formState.body,
          garageId: garageId,
        },
      });

      let chatHolder = newChat;

      chatHolder.push(newMessage.data.addMessage);

      setNewChat(chatHolder);

      //clear form
      event.target.reset();
    } catch (e) {
      console.log(e);
    }

  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const deleteMessageHandler = async (event) => {
    event.preventDefault();
    try {
      // get message ID
      const messageId = event.currentTarget.getAttribute("data-value");
      console.log(" CHAT messageId", messageId);

      const messageDeleted = await deleteMessage({
        variables: {
          id: messageId,
        }
      })

      let savedChatHolder = savedChat;
      let newChatHolder = newChat;
      //search which array has the message

      const savedChatHolderIndex = savedChatHolder.findIndex((obj) => obj._id === messageId)
      const newChatHolderIndex = newChatHolder.findIndex((obj) => obj._id === messageId)
      // chatHolder.push(newMessage.data.addMessage);

      //if deleted message saved chat
      if (savedChatHolderIndex > -1) {
        savedChatHolder.splice(savedChatHolderIndex, 1);
        setSavedChat(savedChatHolder);
      }

      //if deleted message in new chat
      if (newChatHolderIndex > -1) {
        newChatHolder.splice(newChatHolderIndex, 1);
        setNewChat(newChatHolder);
      }

      return messageDeleted;
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Garage Bulletin
      </Header>

      <div className="bulletin container">
        <div className="chat">
          {/* map here to send in chat */}
          {savedChat.map((message1, index) => {
            let chatDate = new Date(Date.parse(message1.createdAt))
            return (
              <Comment key={message1._id} id={message1._id}>
                {/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
                <Comment.Content>

                  <Comment.Author as='a'>{message1.author.name}</Comment.Author>
                  <Comment.Metadata>
                    <div> On {chatDate.toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  </Comment.Metadata>
                  {message1.author._id === userId
                    ? <div className="deleteChat" onClick={deleteMessageHandler} data-value={message1._id}>
                      <i className="trash alternate icon"></i>
                    </div>
                    : ""
                  }

                  <Comment.Text> {message1.body}</Comment.Text>
                </Comment.Content>
              </Comment>

            );

            // return <ChatRender message={message1} key={message1._id} />;
          })}
          {/* <div ref={messagesEndRef} /> */}
          {newChat.map((message2) => {
            let chatDate = new Date(Date.parse(message2.createdAt))
            return (
              <Comment key={message2._id} id={message2._id}>
                {/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
                <Comment.Content>

                  <Comment.Author as='a'>{message2.author.name}</Comment.Author>
                  <Comment.Metadata>
                    <div> On {chatDate.toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  </Comment.Metadata>
                  {message2.author._id === userId
                    ? <div className="deleteChat" onClick={deleteMessageHandler} data-value={message2._id}>
                      <i className="trash alternate icon"></i>
                    </div>
                    : ""
                  }
                  <Comment.Text> {message2.body}</Comment.Text>
                </Comment.Content>
              </Comment>

            );
          })
          }
          {scrollToBottom()}
        </div>
      </div>

      <Form reply onSubmit={handleFormSubmit} >
        {/* <label htmlFor="message">What's in your mind? </label> */}
        <Form.TextArea
          id="message"
          placeholder="What's on your mind? Type your message here."
          name="body"
          type="text"
          size="50"
          rows="3"
          onChange={handleChange}>

        </Form.TextArea>
        <Button content='Add Message' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  );

};

// }

export default Chat;