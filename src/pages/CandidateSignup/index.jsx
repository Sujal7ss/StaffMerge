import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function CandidateSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [message, setMessage] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signup = async (e, name, email, passwd, City, State, Pincode) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Please enter a name");
    }
    if (!email) {
      return toast.error("Please enter an email");
    }
    if (!passwd) {
      return toast.error("Please enter a password");
    }

    if (!validator.isEmail(email)) {
      return setMessage("Please, enter valid Email!");
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKENDURI}/api/candidate/signup`,
        {
          name: name,
          email: email,
          password: passwd,
        }
      );
      console.log(data);
      if (data.success) {
        navigate("/candidateLogin");
        return toast.success("Candidate Signup Successful");
      } else {
        return toast.error(data.message);
      }
    } catch (err) {
      return toast.error(err.message);
    }
  };


  return (
    <>
      
      <div className="">
        <div className="p-8 lg:w-1/2 mx-auto">
          <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
            <h1 className="text-center text-sm mb-5 text-gray-500 font-semibold">
              REGISTER AS A CANDIDATE
            </h1>

            <form
              class="max-w-md mx-auto"
              method="post"
              onSubmit={(e) => signup(e, name, email, passwd)}
            >
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_name"
                  id="floating_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label
                  for="floating_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setPasswd(e.target.value);
                  }}
                />
                <label
                  for="floating_password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              
              <div class="mt-4 flex items-center text-gray-500">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  class="mr-3"
                />
                <label for="remember">Remember me</label>
              </div>
              <div class="flex items-center justify-center mt-8">
                <button
                  class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <hr class="m-4" />
              <div class="flex items-center justify-center mt-5">
                <p class="text-gray-500">HAVE AN ACCOUNT ?!</p>
                <Link
                  to="/candidateLogin"
                  className="text-white py-2 px-4 ml-3 uppercase rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform  "
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateSignup;
