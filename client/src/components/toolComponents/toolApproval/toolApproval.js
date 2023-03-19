import './toolApproval.scss';
import React from "react";
import { APPROVE_CHECKOUT, DELETE_CHECKOUT } from '../../utils/mutations';
import {Button} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';


const ToolApproval = ({ borrower, tool, approved, setApproved, setBorrowed }) => {

  const [deleteCheckout] = useMutation(DELETE_CHECKOUT);
  const [approveCheckout] = useMutation(APPROVE_CHECKOUT);

  const approvalHandler = async () => {
    console.log(tool.checkout._id)
    const approved = await approveCheckout({
      variables: {id: tool.checkout._id}
    })
    if (approved) {
      setApproved(true);
    }
  }

  const returnHandler = async () => {
    const returned = await deleteCheckout({
        variables: {
            id: tool._id
        }
    });
    if (returned) {
        setBorrowed(false);
        setApproved(false);
    }
}

  return <div>
    {approved ?
      <div>
        <p>Mark this item as returned once the borrower has returned it.</p>
        <Button color='grey' onClick={returnHandler} content='Return'/>
      </div>
      :
      <div>
        <p>{borrower.name} would like to borrow this tool. Approve request?</p>
        <Button color='green' onClick={approvalHandler} content='Approve'/>
        <Button color='red' onClick={returnHandler} content='Deny'/>
      </div>
    }
  </div>

};


export default ToolApproval;