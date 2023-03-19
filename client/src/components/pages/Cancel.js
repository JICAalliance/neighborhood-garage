import { Link } from "react-router-dom";

function Cancel() {
  return (
    <>
      <h1>Sorry to see you cancelled your Stripe payment!</h1>
      <Link reloadDocument to="/store">
        ← Back to Cart
      </Link>
    </>
  );
}

export default Cancel;
