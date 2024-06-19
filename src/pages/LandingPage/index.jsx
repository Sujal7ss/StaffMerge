import React, { useEffect } from "react";
import animation1 from "../../assets/animation1.json";
import animation2 from "../../assets/animation2.json";
import Lottie from "lottie-react";
import LoginButton from "../../components/LoginButton";

export default function LandingPage() {
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 30);
      }
    }
  }
  // useEffect(() => {
  //   checkCookie();
  // }, []);
  return (
    <>
      <div className="h-svh bg-C0DFED flex flex-col md:flex-row">
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

        <LoginButton
          style={
            "flex justify-evenly flex-row  items-center absolute ml-10 left-10 top-56 md:left-52 mt-10 md:top-96 md:flex-row"
          }
        />
        <Lottie
          animationData={animation2}
          className="w-60 md:w-90 md:ml-40 mt-36 m-auto"
        />
      </div>
    </>
  );
}
