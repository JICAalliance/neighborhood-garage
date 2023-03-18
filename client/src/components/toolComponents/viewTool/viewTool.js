import "./viewTool.scss";
import React from 'react'

import { useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Auth from "../utils/auth";
import { QUERY_MY_TOOLS } from "../../utils/queries";
import ToolWrapper from "../toolWrapper";


function ViewTool(props) {
  // const [formState, setFormState] = useState({ name:"", description: "", image: ""});

  // const [toolSubmit, setToolSubmit] = useState('false');

  const { loading, data } = useQuery(QUERY_MY_TOOLS);
  let tools = [];

  if (loading) {
    <div>
      <h2>Searching for tools...</h2>
    </div>
  };
  if (data) {

    if (data.myTools.myTools) {
      tools = data.myTools.myTools;
    };

    return (
      <div className="container my-4 viewTool-container">

        {/* <AddTool toolSubmit={toolSubmit} setToolSubmit={setToolSubmit}/> */}

        <h2>My Inventory of Tools</h2>
        {/* map through tool and display via card */}
        <div id='displayTools'>

          {tools.map((tool, index) => (

            <ToolWrapper tool={tool} key={index} checkoutModal={false}>
            </ToolWrapper>
          )
          )}

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