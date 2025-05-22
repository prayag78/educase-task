import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";

export default function App() {
  return (
    <div className="w-[360px] bg-white shadow-lg rounded-lg overflow-hidden">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
