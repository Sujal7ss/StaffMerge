import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function LoginButton({ style }) {
  return (
    <div
      className={` ${style} w-20 lg:w-60 h-fit lg:flex-row align-middle items-center `}
    >
      <Link to="/employerSignup">
        <Button style="bg-C0DFED border-blue-300 text-cyan-700 w-28">
          Post a Job
        </Button>
      </Link>
      <Link to="/candidateSignup">
        <Button style="bg-0086C w-28">Get Hired</Button>
      </Link>
    </div>
  );
}
