import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
const Layout = () => {
  return (
    <>
      <Navbar pages="Homepage" />
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
