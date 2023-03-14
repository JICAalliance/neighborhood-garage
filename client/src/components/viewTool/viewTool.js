import "./viewTool.scss";
import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
// import { useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Auth from "../utils/auth";
import { QUERY_TOOLS } from '../utils/queries';

function  ViewTool(props) {
  // const [formState, setFormState] = useState({ name:"", description: "", image: ""});
  
  const { loading, data } = useQuery(QUERY_TOOLS);
  // const tools = data.tools;

  console.log(data);
  // console.log(data.tools[0]);

  if (loading){
    <div>
      <h2>Searching for tools...</h2>
    </div>
  };
  if(data){
    const tools=data.tools;
    console.log(tools);


    return (
      <div className="container my-1 viewTool-container">
  
        <h2>View Tools</h2>
  
        <div id='displayTools'>
          {/* map through tool and display via card */}
          {tools.map(({_id, name, description, image, checkout},index)=>(

              <Card 
              id={_id}
              image={image}
              header={name}
              description={description}
              extra={checkout? 'Borrowed':'Available'}
              
            />
          )
          )}
  
        </div>
  
      </div>
    );
  };



  // console.log(useQuery(QUERY_TOOLS));

  // handle form click
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const mutationResponse = await addTool({
  //     variables: {
  //       name: formState.name,
  //       description: formState.description,
  //       image: formState.image
  //     },
  //   });
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };


}

export default ViewTool;
