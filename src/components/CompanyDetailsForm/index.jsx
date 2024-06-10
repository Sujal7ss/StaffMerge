// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyDetailsForm() {
  const navigate = useNavigate();
  // const [details, setDetails] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");

  // useEffect(() => {
  // if (details) {
  //   navigate("/employer");
  // }
  // }, [details, navigate]);

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const setCompanyDetails = async (e) => {
    e.preventDefault();
    if (!companyName || !phone || !city || !state || !country || !about) {
      return toast.error("All fields are required");
    }
    try {
      const email = getCookie("username");
      const { data } = await axios.post(
        `${REACT_APP_BACKENDURI}/api/employer/companyDetails?email=${email}`,

        {
          companyName: companyName,
          phone: phone,
          city: city,
          state: state,
          country: country,
          about: about,
        }
      );

      if (data.success) {
        toast.success(data.message);
        // setDetails(true);
        return navigate("/employer");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        class="max-w-md mx-auto mt-6"
        method="post"
        onSubmit={(e) => {
          setCompanyDetails(e);
        }}
      >
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="company"
            id="company"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Name
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="phone"
            id="phone"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <label
            for="phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone no
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <label
            for="phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="state"
            id="state"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <label
            for="phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            State
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="country"
            id="country"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <label
            for="phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Country
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <textarea
            type="text"
            name="about"
            id="about"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
          <label
            for="phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            About
          </label>
        </div>

        

        <div className="flex items-center justify-center mt-8">
          <button
            className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            type="submit"
          >
            NEXT
          </button>
        </div>
        {/* <hr className="m-4" />
      <div className="flex items-center justify-center mt-5">
        <span className=" text-gray-500">DO NOT HAVE A ACCOUNT ?!</span>{" "}
        <Link
          to="/candidateSignup"
          className="text-white py-2 px-4 ml-3 uppercase rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform  "
        >
          REGISTER
        </Link>
      </div> */}
      </form>
      
    </>
  );
}

export default CompanyDetailsForm;
