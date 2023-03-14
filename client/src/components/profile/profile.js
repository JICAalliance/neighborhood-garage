import "./profile.scss";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()
  const navToProduct = (e) => {
    // navigate(e.target.value)
    if (e.target.value !== "Choose Garage") {
      return(navigate(`/${e.target.value}`))
    }
    // console.log(e.target.value)
  }

  return(
  <div id="profile">
    <h1>My Profile</h1>
    <div><button>Create Garage</button></div>
    <div><button>Join Garage</button></div>
    {/* product will be what is displayed, index for unique ID; replace the array with dynamic values of garages user is in*/}
      <select name="product" onClick={(e) => navToProduct(e)}>
        <option>Choose Garage</option>
        {["Garage 1", "Garage 2", "Garage 3"].map((product, index) => {
          return(
            <option value={product} key={index} onClick={(e) => navToProduct(e)}>{product}</option>
          )
        })}
      </select>
  </div>
  )
};

export default Profile;
