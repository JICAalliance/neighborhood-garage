import "./chat.scss";
import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import ChatRender from '../chatRender';
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
// import Auth from "../../utils/auth"
import { ADD_MESSAGE } from "../../utils/mutations";




function Chat({ initMessage, garageId }) {

  console.log("PROPS IN CHAT", initMessage, "garageID", garageId);

  const [addMessage] = useMutation(ADD_MESSAGE);

  const [formState, setFormState] = useState({
    body: "",
  });
  let [newChat, setNewChat] = useState('');

  // let chatHolder = [];

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [newChat]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newMessage = await addMessage({
        variables: {
          body: formState.body,
          garageId: garageId,
        },
      });

      initMessage.push(newMessage.data.addMessage);

      // console.log("CHATCHAIN", chatChain)
      console.log("intiMessage chat", initMessage);
      setNewChat(newMessage.data.addMessage);

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
      <div className="bulletin">
        <div className="chat">
          {/* map here to send in chat */}
          {initMessage.map((message1, index) => {

            return <ChatRender message={message1} key={index + 1000} />;
          })}
          {newChat ? <ChatRender message={newChat} key={newChat._id} /> : ''}
          <div ref={messagesEndRef} />

        </div>
      </div>


      <Form reply onSubmit={handleFormSubmit} >
        <label htmlFor="message">What's in your mind? </label>
        <Form.TextArea
          id="message"
          placeholder="Type your message here."
          name="body"
          type="text"
          size="40"
          rows="5"
          onChange={handleChange}
        >
        </Form.TextArea>
        <Button content='Add Message' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  );

};

// }

export default Chat;