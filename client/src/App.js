import "./App.scss";
import React from "react";
import {
  Nav,
  Home,
  Signup,
  Login,
  Profile,
  CreateGarage,
  AddTool,
  // EditProfile,
  JoinGarage,
  ViewGarage,
} from "./components";
import EditProfile from './components/userComponents/editProfile'
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
import { ContextProvider } from "./components/utils/GlobalState";

//error handling on Apollo
import { onError } from "@apollo/client/link/error";

//check for logged In
import Auth from './components/utils/auth';

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
  // link: from([errorLink, httpLink]),
  // link: authLink.concat(errorLink, httpLink),
  // the authLink sends the token to the back end, please keep line 48
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

function App() {

  const loggedIn= Auth.loggedIn();
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
        <Nav />
          <ContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/signup" element={<Signup />} /> */}
              <Route path="/login" element={<Login />} />
              {/* <Route path="/login" element={<Login setUser={value.setUser} />} /> */}
              <Route path="/profile" forceRefresh={true} element={loggedIn? <Profile />: <Login />} />
              <Route path="/createGarage" element={loggedIn? <CreateGarage /> : <Login />} />
              {/* <Route path="/addTool" element={<AddTool />} /> */}
              <Route path="/editProfile" element={loggedIn? <EditProfile />: <Login />} />
              {/* <Route path="/joinGarage" element={<JoinGarage />} /> */}
              <Route path="/viewGarage/:garageId" element={loggedIn? <ViewGarage />: <Login />} />
            </Routes>
          </ContextProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
