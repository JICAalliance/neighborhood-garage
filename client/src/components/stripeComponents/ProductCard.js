import "./ProductCard.scss";
import { useContext } from "react";
import { Card, Button, Form, Label } from "semantic-ui-react";
import { CartContext } from "./CartContext";

function ProductCard(props) {
  // props.product is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);

  return (
    <Card id="productCard">
      <h3 id="productTitle">{product.title}</h3>
      <h3 id="productPrice">${product.price}</h3>
      {productQuantity > 0 ? (
        <>
          <div id="addRemoveButtons">
            {/* <Form> */}
              <Label>In Cart: {productQuantity}</Label>
              <Button id="addOne" onClick={() => cart.addOneToCart(product.id)}>+</Button>
              <Button id="removeOne" onClick={() => cart.removeOneFromCart(product.id)}>
                -
              </Button>
            {/* </Form> */}
          </div>
          <Button id="removeFromCart" onClick={() => cart.deleteFromCart(product.id)}>
            Remove From Cart
          </Button>
        </>
      ) : (
        <button className='button-30 w70' onClick={() => cart.addOneToCart(product.id)}>
          Add To Cart
        </button>
      )}
    </Card>
  );
}

export default ProductCard;
