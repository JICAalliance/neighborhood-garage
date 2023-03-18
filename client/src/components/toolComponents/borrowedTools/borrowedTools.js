import "./borrowedTools.scss";
import React from 'react'

import { useState } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Auth from "../utils/auth";
import { QUERY_BORROWED_TOOLS } from "../../utils/queries";
import ToolWrapper from "../toolWrapper";


function BorrowedTools(borrowedToolIDs) {

  const { loading, data } = useQuery(QUERY_BORROWED_TOOLS,
    { variables: { idArray: borrowedToolIDs.borrowedToolIDs} });

  if (data) {
    const borrowedTools = [data.borrowedTools];

    return (
      <div className="container my-4">
        {borrowedTools.map((tool, index) => (

          <ToolWrapper tool={tool} key={index} checkoutModal={false}>
          </ToolWrapper>
        )
        )}
      </div>
    );
  }
}

export default BorrowedTools;