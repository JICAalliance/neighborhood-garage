import "./App.scss";
import React from "react";
import { Nav, Home, Signup, Login, Profile, CreateGarage, AddTool, EditProfile, JoinGarage, ViewGarage } from "./components";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  from,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GarageProvider } from "./components/utils/GlobalState";

//error handling on Apollo
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

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
  link: from([errorLink, httpLink]),
  // link: authLink.concat(errorLink, httpLink),
  // link:  from([errorLink,authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <GarageProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/signup" element={<Signup />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/createGarage" element={<CreateGarage />} />
              <Route path="/addTool" element={<AddTool />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/joinGarage" element={<JoinGarage />} />
              <Route path="/viewGarage" element={<ViewGarage />} />
            </Routes>
          </GarageProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
