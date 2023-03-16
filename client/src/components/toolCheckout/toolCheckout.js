import './toolCheckout.scss';
import React from "react";
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ToolCheckout = ({ _id, name, description, image, checkout }) => {
    const [open, setOpen] = React.useState(false);



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

};

export default ToolCheckout;