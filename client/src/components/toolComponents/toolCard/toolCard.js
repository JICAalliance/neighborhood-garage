// import './toolCard.scss';
// import React from "react";

// import { Card, Icon, Button, Image } from 'semantic-ui-react';
// import ToolCheckout from '../toolCheckout';


// const ToolCard = ({ tool, checkoutModal }) => {

//   const [borrowed, setBorrowed] = React.useState(Boolean(tool.checkout));

//   return <div id='tool-container'>
//     <Card key={tool._id} id={tool._id}>
//       <Card.Content>
//         <Image
//           // floated='right'
//           // size='mini'
//           src={tool.image}
//         />
//         <Card.Header>{tool.name}</Card.Header>
//         <Card.Meta>
//           {tool.checkout ?
//             <div>
//               Status: Borrowed
//             </div>
//             :
//             <div>
//               Status: Available
//             </div>}
//         </Card.Meta>
//         <Card.Description>
//           {tool.description}
//         </Card.Description>
//       </Card.Content>

//       {checkoutModal ?

//         <Card.Content extra>
//           <ToolCheckout _id={tool._id} name={tool.name} description={tool.description} image={tool.image} checkout={tool.checkout} setBorrowed={setBorrowed} />
//         </Card.Content>
//         : ''}
//     </Card>
//   </div>

// };


// export default ToolCard;
import './toolCard.scss';
import React from "react";

import { Card, Icon, Button, Image } from 'semantic-ui-react';
import ToolCheckout from '../toolCheckout';
import { useQuery } from '@apollo/client';
import { QUERY_CHECKOUT_BORROWER } from '../../utils/queries';


const ToolCard = ({ tool, checkoutModal }) => {



  const [borrowed, setBorrowed] = React.useState(Boolean(tool.checkout));
  let checkoutId = null;
  let outDate = null;
  let dueDate = null;
  if (borrowed) {
    checkoutId = tool.checkout._id;
    outDate = new Date(Date.parse(tool.checkout.outDate));
    dueDate = new Date(Date.parse(tool.checkout.dueDate));
  }
  const {data} = useQuery(QUERY_CHECKOUT_BORROWER, { variables: { id: checkoutId } });
  const borrower = data?.checkoutBorrower || [];
  
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
              <p>Status: Borrowed</p>
              <p>Borrowed by: {borrower.name}</p>
              <p>Checked out on: {outDate.toLocaleDateString()}</p>
              <p>Due on: {dueDate.toLocaleDateString()}</p>
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
            <ToolCheckout _id={_id} name={name} description={description} image={image} checkout={checkout} />
          </Card.Content>
          : ''}
      </Card>

  </div>

};


export default ToolCard;
