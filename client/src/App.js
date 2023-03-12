import "./App.scss";
import { Nav, Home, SignUp, LogIn, Profile } from "./components";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth";

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
