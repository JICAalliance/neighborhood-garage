import './editTool.scss';
import React from "react";
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { REMOVE_TOOL, UPDATE_TOOL } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const EditTool = ({ _id, name, description, image, checkout, setBorrowed, borrowed, borrower }) => {
    const [open, setOpen] = React.useState();
    const [editing, setEditing] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);
    const [formState, setFormState] = React.useState({
        name: name,
        description: description,
    });
    const [invalidWarning, setInvalidWarning] = React.useState(false);
    //error response
    const [errorResponse, setError] = React.useState(null);

    const [updateTool] = useMutation(UPDATE_TOOL)
    const [removeTool] = useMutation(REMOVE_TOOL);


    const deleteHandler = () => {
        setDeleting(!deleting);
    }

    const editHandler = () => {
        setEditing(!editing)
    }

    const confirmDelete = async () => {
        try {
            await removeTool({
                variables: {
                    id: _id
                }
            })
            window.location.reload();
        } catch (e) {
            console.log(e);
            setError(e);
        };
    }

    const handleNameChange = (event) => {
        setFormState({
            name: event.target.value,
            description: description
        })
    }

    const handleDescriptionChange = (event) => {
        setFormState({
            name: name,
            description: event.target.value
        })
    }

    const saveHandler = async (event) => {
        event.preventDefault();
        if (formState.name && formState.description) {
            const updated = await updateTool({
                variables: {
                    id: _id,
                    name: formState.name,
                    description: formState.description
                }
            })
            if (updated) {
                setEditing(!editing);
                setInvalidWarning(false);
            }
        } else {
            setInvalidWarning(true);
        }
    }

    const cancelHandler = async () => {
        setFormState({
            name: name,
            description: description
        });
        setEditing(!editing);
        setInvalidWarning(false);
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
            className='w70'
            trigger={<button className='button-30 ediTool'>Edit Tool</button>}
        >
            <Modal.Header>Edit Tool</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={image} wrapped />
                <Modal.Description>
                    {editing ?
                        <form className="ui form">
                            <h3 className='toolName'>
                                <input value={formState.name} onChange={handleNameChange} />
                            </h3>
                            <textarea value={formState.description} onChange={handleDescriptionChange} />
                            <h3 id='{owner.id} owner'>Owner: You</h3>
                            {checkout ?
                                <h3 id='borrower'>Borrower: {borrower}</h3>
                                : ''}
                            {invalidWarning ?
                                <h3>Fields cannot be blank!</h3>
                                : ''
                            }
                            <div className='flex-center white'>
                                <button className='button-30 w70' onClick={saveHandler} type='submit' content='Save Changes'>Save Changes</button>
                                <button className='button-30 delBtn w70 alarm' onClick={cancelHandler} content='Cancel Changes'>Cancel Changes</button>
                            </div>
                        </form>
                        :
                        <div>
                            <Header className='toolName'>{name}</Header>
                            <h4 >
                                <i>
                                    {description}
                                </i>
                            </h4>
                            <h5 id='{owner.id} owner'>Owner: You</h5>
                            {checkout ?
                                <h5 id='borrower'>Borrower: {borrower}</h5>
                                : 'None'}
                        </div>
                    }

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {editing ? ''
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
                                <div className='spacer'>.</div>
                            </div>
                        }
                        {errorResponse ? <div>'Tool not deleted..'</div> : ''}
                    </div>
                }
            </Modal.Actions>
        </Modal>
    );
};

export default EditTool;