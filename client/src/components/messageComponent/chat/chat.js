import "./chat.scss";
import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import ChatRender from '../chatRender';
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
// import Auth from "../../utils/auth"
import { ADD_MESSAGE } from "../../utils/mutations";




function Chat({ initMessage, garageId }) {

  // console.log("PROPS IN CHAT", initMessage, "garageID", garageId);

  const newMessages = [];

  const [addMessage] = useMutation(ADD_MESSAGE);

  const [formState, setFormState] = useState({
    body: "",
  });
  
  const [newChat, setNewChat] = useState([]);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  // useEffect(() => {
  //   scrollToBottom()
  // }, [addMessage]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newMessage = await addMessage({
        variables: {
          body: formState.body,
          garageId: garageId,
        },
      });

      const chatHolder = newChat;

      chatHolder.push(newMessage.data.addMessage);

      setNewChat(chatHolder);

      return newMessages;


      // }
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



  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Garage Bulletin
      </Header>

      <div className="bulletin container">
        <div className="chat">
          {/* map here to send in chat */}
          {initMessage.map((message1, index) => {
            return <ChatRender message={message1} key={index + 1000} />;
          })}
          {/* <div ref={messagesEndRef} /> */}
          {newChat.map((message2) => {
            return message2 ? <ChatRender message={message2} key={message2._id} /> : '';
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