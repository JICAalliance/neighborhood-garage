import "./joinGarage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { JOIN_GARAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const JoinGarage = () => {
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
    <div className="container my-1 editProfile-container">
      <h2>Join a Garage</h2>
      <form onSubmit={handleFormSubmit} className="editProfile-form">
        <div className="flex-row space-between my-2">
          <label htmlFor="invitationCode">Join with Invitation Code:</label>
          <input
            placeholder="enter Invitation code here"
            name="invitationCode"
            type="text"
            id="invitationCode"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Join</button>
        </div>
      </form>
      <Link to="/profile">← Back to Profile</Link>
    </div>
  );
};

export default JoinGarage;
