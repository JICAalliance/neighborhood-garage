import "./App.css";
import { Nav, Home, Signup, Login, Profile } from "./components";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/utils/auth";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setLogIn] = useState("loggedOut");
  // return <Nav setPage={setPage} loggedIn={setLogin} />;

  return (
    <>
      <AuthProvider>
        <Nav setPage={setPage} loggedIn={setLogIn} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
