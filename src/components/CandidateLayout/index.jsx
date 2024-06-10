import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";
import axios from "axios";
const CandidateLayout = () => {
  return (
    <>
      <Navbar pages="Candidate" />
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
    </>
  );
};

export default CandidateLayout;
