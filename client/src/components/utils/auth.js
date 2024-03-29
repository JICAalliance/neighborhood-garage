import decode from 'jwt-decode';
// import { useState, useContext, createContext } from "react";



class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/profile');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/login');
  }
}

export default new AuthService();



// const stateContext = createContext();

// export const ContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const login = (user) => setUser(user);
//   const logout = () => setUser(null);
//   return (
//     <stateContext.Provider value={{ user, setUser, login, logout }}>{children}</stateContext.Provider>
//   );
// };

// export const useStateContext = () => {
//   return useContext(stateContext);
// };
