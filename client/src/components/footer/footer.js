import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faStripe,
  faReact,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import { faA, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer id="footer">
      <div>
        <h3 id='copyright'>&copy; 2023, JICAlliance Inc.</h3>
      </div>
      <div id="footerIcons">
        <a href="https://github.com/JICAalliance/neighborhood-garage">
          <FontAwesomeIcon
            icon={faGithub}
            color="#4d4d4e"
            className="footerIcon"
          />
        </a>
        <a href="https://cloudinary.com">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            color="#4d4d4e"
            className="footerIcon"
          />
        </a>
        <a href="https://stripe.com">
          <FontAwesomeIcon
            icon={faStripe}
            color="#4d4d4e"
            className="footerIcon"
          />
        </a>
        <a href="https://react.semantic-ui.com/">
          <FontAwesomeIcon
            icon={faReact}
            color="#4d4d4e"
            className="footerIcon"
          />
        </a>
        <a href="https://sass-lang.com/">
          <FontAwesomeIcon
            icon={faSass}
            color="#4d4d4e"
            className="footerIcon"
          />
        </a>
        <a href="https://www.apollographql.com/">
          <FontAwesomeIcon icon={faA} color="#4d4d4e" className="footerIcon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
