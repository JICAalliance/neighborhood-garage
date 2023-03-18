import './editTool.scss';
import React from "react";
import { Button, Dropdown, Header, Image, Modal } from 'semantic-ui-react'
import { REMOVE_TOOL } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const EditTool = ({ _id, name, description, image, checkout, setBorrowed, borrowed, borrower }) => {
    const [open, setOpen] = React.useState();
    const [editing, setEditing] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const [removeTool] = useMutation(REMOVE_TOOL);

    const deleteHandler = () => {
        setDeleting(!deleting);
    }

    const editHandler = () => {

    }

    const confirmDelete = async () => {
        await removeTool({
            variables: {
                id: _id
            }
        })
        window.location.reload();
    }

    return (
        <Modal
            onClose={() => {
                setOpen(false);
                setEditing(false);
                setDeleting(false);
            }}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button content="Edit Tool" />}
        >
            <Modal.Header>Tool Checkout</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={image} wrapped />
                <Modal.Description>
                    <Header>{name}</Header>
                    <p>
                        {description}
                    </p>
                    <p id='{owner.id} owner'>Owner: You</p>
                    {checkout ?
                        <p id='borrower'>Borrower: {borrower}</p>
                        : ''}

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {editing ?
                    <div>
                        Test
                    </div>
                    :
                    <div>
                        {deleting ?
                            <div>
                                <p>Are you sure you want to delete this tool?</p>
                                <Button color='red' onClick={confirmDelete} content='Confirm Delete' />
                                <Button color='grey' onClick={deleteHandler} content='Cancel' />
                            </div>
                            :
                            <div>
                                <Button color='grey' onClick={editHandler} content='Edit Tool' />
                                <Button color='red' onClick={deleteHandler} content='Delete Tool' />
                            </div>
                        }
                    </div>
                }
            </Modal.Actions>
        </Modal>
    );
};

export default EditTool;