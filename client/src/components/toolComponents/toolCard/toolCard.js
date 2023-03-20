import './toolCard.scss';
import React from "react";

import { Card, Icon, Button, Image } from 'semantic-ui-react';
import ToolCheckout from '../toolCheckout';
import EditTool from '../editTool';
import ToolApproval from '../toolApproval';
import { useQuery } from '@apollo/client';
import { QUERY_CHECKOUT_BORROWER } from '../../utils/queries';


const ToolCard = ({ tool, checkout, checkoutModal, userOwned }) => {

  const [borrowed, setBorrowed] = React.useState(Boolean(!(checkout.length == 0)));
  const [approved, setApproved] = React.useState(checkout.approved);

  let checkoutId = null;
  let outDate = null;
  let dueDate = null;
  if (borrowed && checkout) {
    checkoutId = checkout._id;
    outDate = new Date(Date.parse(checkout.outDate));
    dueDate = new Date(Date.parse(checkout.dueDate));
  }
  const { data } = useQuery(QUERY_CHECKOUT_BORROWER, { variables: { id: checkoutId } });
  const borrower = data?.checkoutBorrower || [];

  return <div id='tool-container'>
    <Card key={tool._id} id={tool._id} cardColor>
      <Card.Content>
        <Image
          // floated='right'
          // size='mini'
          src={tool.image}
        />
        <Card.Header>{tool.name}</Card.Header>
        <Card.Meta>
          {userOwned ?
            <p>Your tool</p>
            :
            ''
          }
          {borrowed ?
            <div>
              {approved ?
                <div>
                  <p>Status: Borrowed</p>
                  <p>Borrowed by: {borrower.name}</p>
                  <p>Checked out on: {outDate.toLocaleDateString()}</p>
                  <p>Due on: {dueDate.toLocaleDateString()}</p>
                </div>
                :
                <div>
                  <p>Status: Pending Approval</p>
                  <p>Requested by: {borrower.name}</p>
                </div>
              }

            </div>
            :
            <div>
              Status: Available
            </div>}
        </Card.Meta>
        <Card.Description>
          {tool.description}
        </Card.Description>
      </Card.Content>

      {userOwned ?
        <Card.Content extra>
          <EditTool _id={tool._id} name={tool.name} description={tool.description} image={tool.image} checkout={checkout} setBorrowed={setBorrowed} borrowed={borrowed} borrower={borrower} />
          {borrowed ?
            <ToolApproval borrower={borrower} checkout={checkout} tool={tool} approved={approved} setApproved={setApproved} setBorrowed={setBorrowed}/>
            : ''
          }
        </Card.Content>
        :
        <div>
          {(checkoutModal && !borrowed) ?
            <Card.Content extra>
              <ToolCheckout _id={tool._id} name={tool.name} description={tool.description} image={tool.image} checkout={checkout} setBorrowed={setBorrowed} borrowed={borrowed} borrower={borrower} />
            </Card.Content>
            :
            ''
          }
        </div>}
    </Card>
  </div>

};


export default ToolCard;