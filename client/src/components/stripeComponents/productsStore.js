// coffee: price_1MnLHuGEUClOdAIcEmsJ7HwQ
// sunglasses: price_1MnLL2GEUClOdAIcCLxl7nJK
// camera: price_1MnLLFGEUClOdAIcyOb9Oauy

const productsArray = [
  {
    id: "price_1MnLHuGEUClOdAIcEmsJ7HwQ",
    title: "Coffee",
    price: 4.99,
  },
  {
    id: "price_1MnLL2GEUClOdAIcCLxl7nJK",
    title: "Sunglasses",
    price: 9.99,
  },
  {
    id: "price_1MnLLFGEUClOdAIcyOb9Oauy",
    title: "Camera",
    price: 39.99,
  },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);

  if (productData == undefined) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}

export { productsArray, getProductData };
