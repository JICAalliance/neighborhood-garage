import React, { useState, createContext, useContext } from "react";
// import { useToolReducer } from "./reducers";

const initialState = {name: "Clark Kent", email: "superman@gmail.com"};

const stateContext = createContext();
const { Provider } = stateContext;

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  return (
    <stateContext.Provider value={[user, setUser]}>
      {children}
    </stateContext.Provider>
  );
// const ContextProvider = ({ value = [], ...props }) => {
//   const [user, setUser] = useState(initialState);
//   return (
//     <stateContext.Provider value={[user, setUser]}>
//       {props.children}
//     </stateContext.Provider>
//   );

  // const [state, dispatch] = useToolReducer({
  //   // products: [],
  //   // cart: [],
  //   // cartOpen: false,
  //   // categories: [],
  //   // currentCategory: '',
  // });

  // return <Provider value={[state, dispatch]} {...props} />;
};

const useStateContext = () => {
  return useContext(stateContext);
};

export { ContextProvider, useStateContext };
