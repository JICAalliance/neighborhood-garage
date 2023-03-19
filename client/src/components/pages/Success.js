import { Link } from "react-router-dom";

function Success() {
  return (
    <>
      <h1>Thank you for your purchase!</h1>
      <Link reloadDocument to="/profile">
        ← Back to Profile
      </Link>
    </>
  );
}

export default Success;
