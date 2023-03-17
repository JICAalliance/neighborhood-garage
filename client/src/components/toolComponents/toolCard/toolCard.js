import './toolCard.scss';
import React from "react";

import { Card, Icon, Button, Image } from 'semantic-ui-react';
import ToolCheckout from '../toolCheckout';


const ToolCard = ({ tool, checkoutModal }) => {

  const [borrowed, setBorrowed] = React.useState(Boolean(tool.checkout));

  return <div id='tool-container'>
    <Card key={tool._id} id={tool._id}>
      <Card.Content>
        <Image
          // floated='right'
          // size='mini'
          src={tool.image}
        />
        <Card.Header>{tool.name}</Card.Header>
        <Card.Meta>
          {tool.checkout ?
            <div>
              Status: Borrowed
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

      {checkoutModal ?

        <Card.Content extra>
          <ToolCheckout _id={tool._id} name={tool.name} description={tool.description} image={tool.image} checkout={tool.checkout} setBorrowed={setBorrowed} />
        </Card.Content>
        : ''}
    </Card>
  </div>

};


export default ToolCard;
