import "./joinGarage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { JOIN_GARAGE } from "../../utils/mutations";
import { QUERY_ME} from "../../utils/queries";
import { Modal } from 'semantic-ui-react';


const JoinGarage = () => {
  //for modal use
  const [open, setOpen] = useState(false)

  //error response
  const [errorResponse, setError] = useState(null);

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
      setError(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (<div className='flex-center'>
    <div>{errorResponse ? "Something went wrong..." : ''}</div>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size={'small'}
      trigger={<button className="button-30 btnProfile " role="button">Join Garage →</button>}
    >
      <Modal.Header>Join A Neighborhood Garage</Modal.Header>
      <Modal.Content className="flex-center">
        <form onSubmit={handleFormSubmit} className="create-form" >
          <div className="flex-row space-between my-2 container" >
            <h4><label htmlFor="invitationCode">Past Your Invitation Code:</label>
            <input
              placeholder="enter Invitation code here"
              name="invitationCode"
              type="text"
              id="invitationCode"
              size='40'
              onChange={handleChange}
            /></h4>
          </div>
          <div className="flex-row flex-end flex-center " style={{ color: "black", backgroundColor: "white", margin: "1rem" }}>
            <button id='joinBtn' className='button-30' type="submit" color='green'>Join</button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  </div>
  );
};

export default JoinGarage;
