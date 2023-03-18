import "./joinGarage.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { JOIN_GARAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { Button, Image, Modal } from 'semantic-ui-react'

const JoinGarage = () => {
  //for modal use
  const [open, setOpen] = useState(false)

  //to navigate to profile once joined
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    invitationCode: "",
  });
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const [joinGarage, { error }] = useMutation(JOIN_GARAGE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const join = await joinGarage({
        variables: {
          invitationCode: formState.invitationCode,
          member: me._id,
        },
      });

      // console.log("JOIN ", join.data.joinGarage)
      if (!join) {
        return <div>Loading...</div>
      }
      else {
        navigate(`/viewGarage/${join.data.joinGarage._id}`, { reload: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size={'mini'}
      trigger={<Button>Join Garage</Button>}
    >
      <Modal.Header>Join A Neighborhood Garage</Modal.Header>
      <Modal.Content >
        <form onSubmit={handleFormSubmit} className="editProfile-form">
          <div className="flex-row space-between my-2">
            <label htmlFor="invitationCode">Join with Invitation Code:</label>
            <input
              placeholder="enter Invitation code here"
              name="invitationCode"
              type="text"
              id="invitationCode"
              size="36"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end" style={{ color: "black", backgroundColor: "white" }}>
            <button id='joinBtn' type="submit" style={{ color: "black", backgroundColor: "white" }}>Join</button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default JoinGarage;
