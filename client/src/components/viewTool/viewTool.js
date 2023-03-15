import "./viewTool.scss";
import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
// import { useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Auth from "../utils/auth";
import { QUERY_MY_TOOLS } from '../utils/queries';

function  ViewTool(props) {
  // const [formState, setFormState] = useState({ name:"", description: "", image: ""});
  
  const { loading, data } = useQuery(QUERY_MY_TOOLS);


  if (loading){
    <div>
      <h2>Searching for tools...</h2>
    </div>
  };
  if(data){
    console.log(data.myTools.myTools);
    const tools=data.myTools.myTools;


    return (
      <div className="container my-1 viewTool-container">
  
        <h2>My Inventory of Tools</h2>
  
        <div id='displayTools'>
          {/* map through tool and display via card */}
          {tools.map(({_id, name, description, image, checkout},index)=>(

              <Card 
              key={_id}
              id={_id}
              // image={image? image: 'No image to display'}
              header={name}
              description={description}
              extra={checkout? 'Status: Borrowed':'Status: Available'}
              
            />
          )
          )}
  
        </div>
  
      </div>
    );
  };



return;
}

export default ViewTool;
