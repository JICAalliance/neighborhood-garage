import "./editProfile.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, REMOVE_USER } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

const EditProfile = () => {
  const [formState, setFormState] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  //error response
  const [errorResponse, setError] = React.useState(null);

  const [updateUser] = useMutation(UPDATE_USER);
  const [removeUser] = useMutation(REMOVE_USER);
  const navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_ME);
  if (loading) {
    return <div>Loading...</div>;
  }
  const { _id } = data.currentUser;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {

      const mutationResponse = await updateUser({
        variables: {
          id: _id,
          name: formState.name,
          email: formState.email,
          phone: formState.phoneNumber,
          address: formState.address,
        },
      });

      navigate(`/profile`);
    } catch (e) {
      console.log(e);
      setError(e);
    };
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {

      const mutationResponse = await removeUser({
        variables: {
          id: _id,
        },
      });

      Auth.logout();

    } catch (e) {
      console.log(e);
      setError(e);
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="my-1 editProfile-container center">
      <h2>Edit Profile</h2>
      {errorResponse ? <div>'Something went wrong ..'</div> : ''}
      <form onSubmit={handleFormSubmit} className="editProfile-form  flex-row space-between my-2">
        <div className="input-row flex-row space-between my-2">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="enter new name"
            name="name"
            required
            type="text"
            id="name"
            size='40'
            onChange={handleChange}
          />
        </div>
        <div className="input-row flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="enter new email"
            name="email"
            required
            type="email"
            id="email"
            className='w70'
            onChange={handleChange}
          />
        </div>
        <div className="input-row flex-row space-between my-2">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            placeholder="enter new phone number"
            name="phoneNumber"
            required
            type="text"
            id="phoneNumber"
            className='w70'
            onChange={handleChange}
          />
        </div>
        <div className="input-row flex-row space-between my-2">
          <label htmlFor="address">Address:</label>
          <input
            placeholder="enter new address"
            name="address"
            required
            type="text"
            className='w70'
            id="address"
            onChange={handleChange}
          />
        </div>
        <div className="input-row flex-row space-between flex-center my-2">
          <button type="submit" className='button-30  subEdit' >Update</button>
        </div>
      </form>

      {/* DELETE PROFILE OPTION */}
      <form onSubmit={handleDelete} className="editProfile-form">
        <div className="flex-row flex-end center">
          <button type="submit" className='button-30 delUser center'>Delete User</button>
        </div>
      </form>

      <Link reloadDocument to="/profile">
        ← Back to Profile
      </Link>
    </div>
  );
};

export default EditProfile;
