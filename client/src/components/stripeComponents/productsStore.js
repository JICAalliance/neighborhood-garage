// coffee: price_1MnLHuGEUClOdAIcEmsJ7HwQ
// sunglasses: price_1MnLL2GEUClOdAIcCLxl7nJK
// camera: price_1MnLLFGEUClOdAIcyOb9Oauy
// $1 Donation: price_1MnhHDGEUClOdAIcCXdCfeSh
// $10 Donation: price_1MnhHiGEUClOdAIc1HAa66ro
// $100 Donation: price_1MnhHuGEUClOdAIcFZ0H2dbx

const productsArray = [
  {
    id: "price_1MnhHDGEUClOdAIcCXdCfeSh",
    title: "Small Donation",
    price: 1,
  },
  {
    id: "price_1MnhHiGEUClOdAIc1HAa66ro",
    title: "Medium Donation",
    price: 10,
  },
  {
    id: "price_1MnhHuGEUClOdAIcFZ0H2dbx",
    title: "Large Donation",
    price: 100,
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
