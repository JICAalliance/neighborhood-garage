import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGaugeHigh } from "@fortawesome/free-solid-svg-icons";
import { Button } from "semantic-ui-react";

function Success() {
  return (
    <>
      <h1>Thank you for your purchase!</h1>
      <br />
      <br />
      <div id="buttonContainer">
        <Button id="backToCart">
          <FontAwesomeIcon icon={faGaugeHigh} color="#4d4d4e" id="cartIcon" />
          <br />
          <Link reloadDocument to="/profile">
            ← Back to Dashboard
          </Link>
        </Button>
      </div>
    </>
  );
}

export default Success;
