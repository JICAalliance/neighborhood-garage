import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import components
import {
  Nav,
  Home,
  Login,
  Profile,
  CreateGarage,
  ViewGarage,
  Footer,
} from "./components";
import EditProfile from "./components/userComponents/editProfile";
import EditGarage from "./components/garageComponents/editGarage";

//import STORE components
import { setContext } from "@apollo/client/link/context";
import Cancel from "./components/pages/Cancel";
import Store from "./components/pages/Store";
import Success from "./components/pages/Success";
import CartProvider from "./components/stripeComponents/CartContext";

//import Apollo
import {
  from,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
//error handling on Apollo
import { onError } from "@apollo/client/link/error";

//check for logged In
import Auth from "./components/utils/auth";

// FUNCTION
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

// FUNCTION
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // link: authLink.concat(errorLink, httpLink),
  // the authLink sends the token to the back end, please keep line 48
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

function App() {
  const loggedIn = Auth.loggedIn();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <CartProvider>
          <Routes>
            <Route index element={loggedIn ? <Profile /> : <Home />} />
            <Route path="login" element={loggedIn ? <Profile /> : <Login />} />
            <Route
              path="profile"
              element={loggedIn ? <Profile /> : <Login />}
            />
            <Route
              path="createGarage"
              element={loggedIn ? <CreateGarage /> : <Login />}
            />
            <Route
              path="/editGarage/:garageId"
              element={loggedIn ? <EditGarage /> : <Login />}
            />
            {/* <Route path="/addTool" element={<AddTool />} /> */}
            <Route
              path="editProfile"
              element={loggedIn ? <EditProfile /> : <Login />}
            />
            {/* <Route path="/joinGarage" element={<JoinGarage />} /> */}
            <Route
              path="/viewGarage/:garageId"
              element={loggedIn ? <ViewGarage /> : <Login />}
            />
            <Route
              path="success"
              element={loggedIn ? <Success /> : <Login />}
            />
            <Route path="cancel" element={loggedIn ? <Cancel /> : <Login />} />
            <Route path="store" element={loggedIn ? <Store /> : <Login />} />
          </Routes>
        </CartProvider>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
