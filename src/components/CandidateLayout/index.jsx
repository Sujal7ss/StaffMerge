import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";
import axios from "axios";
const CandidateLayout = () => {
  return (
    <>
        {/* <div className="fixed h-20 z-40 bg-black  top-0" onMouseDown={}></div> */}
      <div className="min-h-screen">
        <Navbar pages="Candidate" />
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CandidateLayout;
