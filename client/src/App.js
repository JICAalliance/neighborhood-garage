import "./App.css";
import { Nav, Home, SignUp, LogIn, Profile } from "./components";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setLogin] = useState("loggedOut");
  // return <Nav setPage={setPage} loggedIn={setLogin} />;

  return (
    <>
      <Nav setPage={setPage} loggedIn={setLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
