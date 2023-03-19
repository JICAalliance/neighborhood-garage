const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Mn5QrGEUClOdAIcPID0Z19PCZ2wQ4nQAmGtN0J5lf8WPDFFFaQ76LahPgKcLO80DyDZuQ7KzfnaO6O1TOiOtgZZ00b3EvqcCR"
);
const myDomain = "https://neighborhood-garage.herokuapp.com";
// const myDomain = "http://localhost:3000";

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json({ limit: "50mb" }));

app.post("/checkout", async (req, res) => {
  console.log("SUCCESS DIRECTORY: ", path.join(__dirname, "success"));
  /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",

    success_url: `${myDomain}/success`,
    cancel_url: `${myDomain}/cancel`,

  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/app/client/public','index.html'));
// });

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
