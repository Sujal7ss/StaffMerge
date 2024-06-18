import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
const Layout = () => {
  return (
    <>
      <div className="layout min-h-screen">
        <Navbar pages="Homepage" />
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
