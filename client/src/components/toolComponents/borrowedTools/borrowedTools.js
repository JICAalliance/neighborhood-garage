import "./borrowedTools.scss";
import React from 'react'
import { useQuery } from "@apollo/client";
import { QUERY_BORROWED_TOOLS } from "../../utils/queries";
import ToolWrapper from "../toolWrapper";
import ErrorBoundary from '../../errorBoundary';


function BorrowedTools(borrowedToolIDs) {

  const { loading, data } = useQuery(QUERY_BORROWED_TOOLS,
    { variables: { idArray: borrowedToolIDs.borrowedToolIDs } });

  if (loading) {
    return <div>Loading... </div>
  }

  if (data) {
    const borrowedTools = [data.borrowedTools[0]];

    return (
      <ErrorBoundary>
        <div className="container my-4">
          {borrowedTools.map((tool, index) => (

            <ToolWrapper tool={tool} key={index} checkoutModal={false}>
            </ToolWrapper>
          )
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default BorrowedTools;