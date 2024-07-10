import React, {useEffect} from "react";
import LoginButton from "../../components/LoginButton";

export default function LandingPage() {
  return (
    <>
      
      <div  className="h-svh bg-C0DFED flex flex-col md:flex-row">
        <div className="relative ml-10 md:left-36">
          <span className="text-3xl relative top-20 md:text-7xl  md:top-40 font-bold bg-013C5E">
            Connect.
          </span>
          <br />
          <span className="text-3xl top-20 relative md:text-7xl  md:top-40 font-bold bg-013C5E">
            Merge.
          </span>
          <span className="text-3xl top-20 relative md:text-7xl  md:top-40 font-bold bg-013C5E">
            Work
          </span>
        </div>
        <LoginButton style={"flex justify-evenly flex-row  items-center absolute ml-10 left-10 top-56 md:left-52 mt-10 md:top-96 md:flex-row"} />
      </div>
    </>
  );
}
