import "./home.scss";
import Signup from "../signUp"
import ExampleComponent from "../exampleComponent";

const Home = () => (
  <div id="home">
    <h1>This is the homepage</h1>
    <Signup/>
    <ExampleComponent/>
  </div>
);

export default Home;
