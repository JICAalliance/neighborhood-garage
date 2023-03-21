import "./Store.scss";
import { Button, Modal } from "semantic-ui-react";
import { useState, useContext } from "react";
import { productsArray } from "../stripeComponents/productsStore";
import ProductCard from "../stripeComponents/ProductCard";
import { CartContext } from "../stripeComponents/CartContext";
import CartProduct from "../stripeComponents/CartProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Store() {
  //for modal use
  const [open, setOpen] = useState(false);
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const checkout = async () => {
    try {
      await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart.items }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.url) {
            window.location.assign(response.url); // Forwarding user to Stripe
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h2>Donation amounts:</h2>
      <div id="products">
        {productsArray.map((product, idx) => (
          <div id="productCard" key={idx}>
            <ProductCard product={product} />{" "}
          </div>
        ))}
      </div>

      <br />
      <br />

      <div id="cartContainer">
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size={"mini"}
          trigger={
            <Button id="cartButton">
              <FontAwesomeIcon icon={faCartShopping} color="#4d4d4e" />(
              {productsCount} Items)
            </Button>
          }
        >
          <Modal.Header>Shopping Cart</Modal.Header>
          <Modal.Content>
            {productsCount > 0 ? (
              <>
                <p>Items in your cart:</p>
                {cart.items.map((currentProduct, idx) => (
                  <CartProduct
                    key={idx}
                    id={currentProduct.id}
                    quantity={currentProduct.quantity}
                  ></CartProduct>
                ))}

                <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                <Button onClick={checkout}>Purchase items!</Button>
              </>
            ) : (
              <h1>There are no items in your cart!</h1>
            )}
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
}

export default Store;
