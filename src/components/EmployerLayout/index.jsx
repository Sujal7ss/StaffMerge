import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
const EmployerLayout = () => {
  return (
    <>
      <Navbar pages="Employer" />
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
    </>
  );
};

export default EmployerLayout;
