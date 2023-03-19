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
    <Card>
      <h1>{product.title}</h1>
      <h1>${product.price}</h1>
      {productQuantity > 0 ? (
        <>
          <Form>
            <Label>In Cart: {productQuantity}</Label>
            <Button onClick={() => cart.addOneToCart(product.id)}>+</Button>
            <Button onClick={() => cart.removeOneFromCart(product.id)}>
              -
            </Button>
          </Form>
          <Button onClick={() => cart.deleteFromCart(product.id)}>
            Remove From Cart
          </Button>
        </>
      ) : (
        <Button onClick={() => cart.addOneToCart(product.id)}>
          Add To Cart
        </Button>
      )}
    </Card>
  );
}

export default ProductCard;
