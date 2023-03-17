import "./editProfile.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';

const EditProfile = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 editProfile-container">
      <h2>Edit Profile</h2>
      <form className="editProfile-form">
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="new profile name"
            name="name"
            type="text"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="new profile email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            placeholder="new profile phone number"
            name="phoneNumber"
            type="number"
            id="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Update</button>
        </div>
      </form>

      {/* DELETE PROFILE OPTION */}
      <div className="flex-row flex-end">
        <button type="submit">Delete</button>
      </div>

      <Link reloadDocument to="/profile">← Back to Profile</Link>
    </div>
  );
};

export default EditProfile;
