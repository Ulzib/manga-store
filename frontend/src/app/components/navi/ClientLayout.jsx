"use client";

import { useState } from "react";
import NavBar from "./NavBar";

const ClientLayout = ({ children }) => {
  const handleLogout = () => {
    console.log("logged out...");
  };

  return (
    <div>
      <NavBar onLogout={handleLogout} />
      {children}
    </div>
  );
};

export default ClientLayout;
