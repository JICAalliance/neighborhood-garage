import './toolCheckout.scss';
import React from "react";
import { Button, Dropdown, Header, Image, Modal } from 'semantic-ui-react'
import { QUERY_TOOL_OWNER } from '../../utils/queries';
import { ADD_CHECKOUT } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

const ToolCheckout = ({ _id, name, description, image, checkout, setBorrowed, borrowed, borrower }) => {
    const [open, setOpen] = React.useState();
    const [addCheckout] = useMutation(ADD_CHECKOUT);
    const [borrowLength, setBorrowLength] = React.useState();

    const handleChange = (e, { value }) => {
        setBorrowLength(e.target.textContent)
    }

    //find owner of tool
    const { loading, data } = useQuery(QUERY_TOOL_OWNER, {
        variables: { id: _id }
    });

    const borrowLengthOptions = Array.from(Array(28), (_,i)=> ({
        key: i+1,
        text: i+1,
        value: i+1
    }))

    const borrowHandler = async () => {
        console.log(borrowLength);
        const checkedOut = await addCheckout({
            variables: {
                toolId: _id,
                outDate: Date.now(),
                dueDate: (Date.now() + (1000 * 60 * 60 * 24 * borrowLength))
            }
        });
        if (checkedOut) {
            setBorrowed(true);
            setOpen(false);
        }
    }

    if (data) {
        const owner = data.toolOwner;

        return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button content="Checkout"/>}
            >
                <Modal.Header>Tool Checkout</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src={image} wrapped />
                    <Modal.Description>
                        <Header>{name}</Header>
                        <p>
                            {description}
                        </p>
                        <p id='{owner.id} owner'>Owner: {owner.name}</p>
                        <p id='ownerContact'>Owner Contact: {owner.phone}</p>
                        {checkout?
                        <p id='borrower'>Borrower: {borrower.name}</p>
                        : ''}

                        {/* <p>Is it okay to use this photo?</p> */}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {borrowed ?
                        ''
                        :
                        <div>
                            <span>Request to borrow for </span>
                            <Dropdown
                            onChange={handleChange}
                            placeholder='Select' 
                            selection
                            id = 'borrowLength' 
                            options={borrowLengthOptions} />
                            <span> days</span>
                            <Button
                                content="Request Tool"
                                color='green'
                                onClick={borrowHandler}
                                positive
                            />
                        </div>}
                </Modal.Actions>
            </Modal>
        );
    }
};

export default ToolCheckout;