import "./viewTool.scss";
import React from 'react'

import { useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Auth from "../utils/auth";
import { QUERY_MY_TOOLS } from "../../utils/queries";
import ToolWrapper from "../toolWrapper";
import BorrowedTools from "../borrowedTools/borrowedTools";


function ViewTool(props) {
  // const [formState, setFormState] = useState({ name:"", description: "", image: ""});

  // const [toolSubmit, setToolSubmit] = useState('false');

  const { loading, data } = useQuery(QUERY_MY_TOOLS);
  let myTools = [];
  let borrowedToolIDs = [];

  if (data) {
    myTools = data.myTools.myTools;
    borrowedToolIDs = data.myTools.borrowedTools.map((tool) => (tool._id));

    return (
      <div className="container my-4 ">

        {/* <AddTool toolSubmit={toolSubmit} setToolSubmit={setToolSubmit}/> */}

        {/* map through tool and display via card */}

        <div id='displayTools' className="ui two column grid">


          {myTools.map((tool, index) => (
            <div className="column">
              <ToolWrapper tool={tool} key={index} checkoutModal={false}>
              </ToolWrapper>
            </div>
          )
          )}
          {borrowedToolIDs.length ?
          <BorrowedTools borrowedToolIDs={borrowedToolIDs} key={Date.now()} />:''}

        </div>

      </div >
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