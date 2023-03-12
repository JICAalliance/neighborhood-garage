import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => setUser(user);
  const logout = () => setUser(null);
  return (
    <AuthProvider value={{ user, login, logout }}>{children}</AuthProvider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
