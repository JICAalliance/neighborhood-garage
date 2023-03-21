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
      <div className=" my-4 ">

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

}

export default ViewTool;