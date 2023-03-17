import './toolCheckout.scss';
import React from "react";
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { QUERY_TOOL_OWNER } from '../../utils/queries';
import { ADD_CHECKOUT, DELETE_CHECKOUT } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

const ToolCheckout = ({ _id, name, description, image, checkout, setBorrowed }) => {
    const [open, setOpen] = React.useState(false);
    const [addCheckout] = useMutation(ADD_CHECKOUT);
    const [deleteCheckout] = useMutation(DELETE_CHECKOUT);

    //find owner of tool
    const { loading, data } = useQuery(QUERY_TOOL_OWNER, {
        variables: { id: _id }
    });

    const borrowHandler = async () => {
        const checkedOut = await addCheckout({
            variables: {
                toolId: _id,
                outDate: Date.now(),
                dueDate: (Date.now() + (1000 * 60 * 60 * 24 * 14))
            }
        });
        if (checkedOut) {
            setBorrowed(true);
            setOpen(false);
        }
    }

    const returnHandler = async () => {
        const returned = await deleteCheckout({
            variables: {
                id: _id
            }
        });
        if (returned) {
            setBorrowed(false);
            setOpen(false);
            // refreshed the page; remove this when we figure out why elements are re-rendering properly
            window.location.reload();
        }
    }

    //find borrower of tool
    if (data) {
        const owner = data.toolOwner;


        return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button content="Checkout"></Button>}
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
                    {checkout ?
                        <Button color='black' onClick={returnHandler}>
                            Return
                        </Button>
                        :
                        <Button
                            content="Borrow"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={borrowHandler}
                            positive
                        />}
                </Modal.Actions>
            </Modal>
        );
    }
};

export default ToolCheckout;