import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AdminHome from "./components/AdminHome";
import RequireAuth from "./auth/RequireAuth";
import Account from "./components/Account";
import { AuthProvider } from "./auth/AuthContext";
import InstagramAuth from "./components/InstagramAuth";

function App() {
  return (
    <>
      <Link
        to="/"
        style={{ color: "inherit", textDecoration: "inherit" }}
        className="fs-2 position-absolute title fw-bold mx-5 my-4"
      >
        MyLink
      </Link>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:username" element={<Account />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin/:username" element={<AdminHome />} />
            <Route path="/instagram-auth" element={<InstagramAuth />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
