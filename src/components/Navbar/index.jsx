import React, { useState } from "react";
import Logo from "../Logo";
import axios from "axios";
import LoginButton from "../LoginButton";
import NavbarDetails from "../../assets/NavbarDetails";
import Button from "../../components/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
// sconst navbar = NavbarDetails.Homepage.Navbar;

export default function Navbar({ pages }) {
  const navigate = useNavigate();
  const navbar = NavbarDetails[pages].Navbar;
  const button = NavbarDetails[pages].Button;
  const logo = NavbarDetails[pages].Logo;

  const [visible, setVisible] = useState(false);

  // console.log(navbar[0].path)
  function newJobHandler() {
    if (visible) {
      setVisible(false);
    }
    return navigate("postJob");
  }

  const visibleHandler = () => {
    setVisible((e) => !e);
  };
  const handleLogout = async () => {
    try {
      if (pages == "Candidate") {
        await axios.post(
          `${process.env.REACT_APP_BACKENDURI}/api/candidate/logout`,
          {},
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        // setTimeout(() => {
        window.location.href = "/";
        // }, 2000);
      }
      else
      {
        await axios.post(
          `${process.env.REACT_APP_BACKENDURI}/api/employer/logout`,
          {},
          {
            withCredentials: true, // Include cookies in the request
          }
        );
  
        // setTimeout(() => {
          window.location.href = "/";
        // }, 2000);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="navbar h-fit bg-C0DFED w-full  top-0 ">
      <nav className="container flex flex-row  justify-between bg sm:justify-between items-center p-7 w-full">
        <Link to={logo}>
          <Logo />
        </Link>
        <div className="">
          <ul
            className="hidden md:flex flex-row w-full gap-10 flex-wrap items-center justify-between  text-xs 
                font-bold
                cursor-pointer 
                text-gray-500"
          >
            {navbar.map((item) => (
              <NavLink
                key={item.id}
                className=" hover:text-gray-900"
                to={item.path}
              >
                {item.name}
              </NavLink>
            ))}
            {pages !== "Homepage" && (
              <button
                key={10}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex  items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={visibleHandler}
        >
          {/* <span class="sr-only">Open main menu</span> */}
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {button === "LoginButton" && (
          <LoginButton style={"hidden sm:flex  md:flex-col"} />
        )}
        {button.name === "Profile" && (
          <Button
            style={"hidden justify-center items-center md:flex w-28 "}
            onSelect={newJobHandler}
          >
            Post a Job
          </Button>
        )}
      </nav>
      {visible && (
        <div className="flex items-">
          <ul
            className="md:hidden flex absolute ml-10 bg-white border w-3/4 h-32 bg-w z-10 flex-col   items-center justify-evenly  text-xs 
                font-bold
                cursor-pointer 
                text-gray-500 shadow-lg rounded-lg"
          >
            {navbar.map((item) => (
              <NavLink
                key={item.id}
                className=" hover:text-gray-900"
                to={item.path}
                onClick={visibleHandler}
              >
                {item.name}
              </NavLink>
            ))}
            {pages !== "Homepage" && (
              <button
                key={10}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            {button.name === "Profile" && (
              <Button
                style={"bg-sky-300 justify-center items-center md:flex w-28 "}
                onSelect={newJobHandler}
              >
                Post a Job
              </Button>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
