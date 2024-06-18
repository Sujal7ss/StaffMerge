import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [company, setCompany] = useState("");

  const loginf = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      return toast.error("Please enter email and password");
    }
    if (!email) {
      return toast.error("Please enter a valid email");
    }
    if (!password) {
      return toast.error("Please enter a password");
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKENDURI}/api/employer/login`,
        {
          email: email,
          password: password,
        }
      );

     
      if (data.success) {
        toast.success(data.message);

        setAuthenticated(true);
        if (data.company.companyName !== undefined) {
          setCompany(data.company);
        }
        
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  useEffect(() => {
    if (authenticated) {
      setCookie("username", email, 1);
      if (company == "") {
        return navigate("/employer/companyDetails");
      }
      return navigate("/employer");
    }
  }, [authenticated]);
  return (
    <>
      <div className="">
        <div className="p-8 lg:w-1/2 mx-auto">
          <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
            <p className="text-center text-sm text-gray-500 font-semibold">
              LOGIN AS A EMPLOYER
            </p>

            <form
              class="max-w-md mx-auto"
              method="post"
              onSubmit={(e) => {
                loginf(e);
              }}
            >
              
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
                    setPassword(e.target.value);
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
                  Sign In
                </button>
              </div>
              <hr class="m-4" />
              <div class="flex items-center justify-center mt-5">
                <p class="text-gray-500">HAVE AN ACCOUNT ?!</p>
                <Link
                  to="/employerSignup"
                  className="text-white py-2 px-4 ml-3 uppercase rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform  "
                >
                  REGISTER
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
