import "./joinGarage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const JoinGarage = () => {
  const [formState, setFormState] = useState({
    qrCode: "",
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
      <h2>Join a Garage</h2>
      <form className="editProfile-form">
        <div className="flex-row space-between my-2">
          <label htmlFor="qrCode">Join with QR Code:</label>
          <input
            placeholder="enter QR code here"
            name="qrCode"
            type="text"
            id="qrCode"
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
