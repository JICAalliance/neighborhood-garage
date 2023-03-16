import './toolCard.scss';
import React from "react";

import { Card, Icon, Button, Image } from 'semantic-ui-react';
import ToolCheckout from '../toolCheckout';


const ToolCard = ({ tools, checkoutModal }) => {




  return <div id='tool-container'>
    {/* map through tool and display via card */}
    {tools.map(({ _id, name, description, image, checkout }, index) => (

      <Card key={_id} id={_id}>
        <Card.Content>
          <Image
            // floated='right'
            // size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
          />
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{checkout ? 'Status: Borrowed' : 'Status: Available'}</Card.Meta>
          <Card.Description>
            {description}
          </Card.Description>
        </Card.Content>

        {checkoutModal ?

          <Card.Content extra>
            <ToolCheckout _id={_id} name={name} description={description} image={image} checkout={checkout} />
          </Card.Content>
          : ''}
      </Card>
    )
    )}

  </div>

};


export default ToolCard;
