import { useState, useContext, createContext } from "react";

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => setUser(user);
  const logout = () => setUser(null);
  return (
    <stateContext.Provider value={{ user, setUser, login, logout }}>{children}</stateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(stateContext);
};
