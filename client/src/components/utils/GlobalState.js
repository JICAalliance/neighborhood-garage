import React, { createContext, useContext } from "react";
import { useToolReducer } from "./reducers";

const GarageContext = createContext();
const { Provider } = GarageContext;

const GarageProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useToolReducer({
    // products: [],
    // cart: [],
    // cartOpen: false,
    // categories: [],
    // currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGarageContext = () => {
  return useContext(GarageContext);
};

export { GarageProvider, useGarageContext };
