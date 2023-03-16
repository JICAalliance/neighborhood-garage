import './toolCheckout.scss';
import React from "react";
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { QUERY_TOOL_OWNER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const ToolCheckout = ({ _id, name, description, image, checkout }) => {
    const [open, setOpen] = React.useState(false);
    const [borrowed, setBorrowed] = React.useState(false);

  //find owner of tool
  const {loading, data} =useQuery(QUERY_TOOL_OWNER, {
    variables: {id: _id}
  });

  //find borrower of tool
  if (data){
    console.log(_id);
    console.log("toolCheckout ", data);
    const owner=data.toolOwner;
    console.log("toolOwner ", owner);
  

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Checkout Tool</Button>}
        >
            <Modal.Header>Tool Checkout</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                <Modal.Description>
                    <Header>{name}</Header>
                    <p>
                        {description}
                    </p>
                    <p id='{owner.id} owner'>Owner: {owner.name}</p>
                    <p id='ownerContact'>Owner Contact: {owner.phone}</p>
                    <p id='borrower'>Borrower: </p>

                    {/* <p>Is it okay to use this photo?</p> */}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {/* CAN PUT conditional to display return button if it is borrowed especially if user is the borrower like isBorrower props*/}
                <Button color='black' onClick={() => setOpen(false)}>
                    Return
                </Button>
                <Button
                    content="Borrow"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
    }
};

export default ToolCheckout;