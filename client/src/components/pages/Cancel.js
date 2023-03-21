import "./Cancel.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "semantic-ui-react";

function Cancel() {
  return (
    <>
      <h1>Sorry to see you cancelled your donation!</h1>
      <br />
      <br />
      <div id="buttonContainer">
        <Button id="backToCart">
          <FontAwesomeIcon
            icon={faCartShopping}
            color="#4d4d4e"
            id="cartIcon"
          />
          <br />
          <Link reloadDocument to="/store">
            ← Back to Cart
          </Link>
        </Button>
      </div>
    </>
  );
}

export default Cancel;
