// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

function JobDetailForm() {
  const navigate = useNavigate();
  const [details, setDetails] = useState(false);

  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("Part-Time");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    if (details) {
      navigate("/employer/postedJobs");
    }
  }, [details, navigate]);

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

  const setJobDetails = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !jobType ||
      !experience ||
      !salary ||
      !jobDescription ||
      !city ||
      !state ||
      !country
    ) {
      return toast.error("All fields are required");
    }
    if (experience < 0) {
      return toast.error("Experience Cant be negative");
    }
    try {
      const email = getCookie("username");
      const { data } = await axios.post(
        `${REACT_APP_BACKENDURI}/api/employer/jobDetails?email=${email}`,
        {
          title: title,
          jobType: jobType,
          experiece: experience,
          salary: salary,
          jobDescription: jobDescription,
          city: city,
          state: state,
          country: country,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDetails(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      
      <form class="max-w-md mx-auto mt-6" method="post">
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            for="title"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <select
            type="text"
            name="jobtype"
            id="jobtype"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setJobType(e.target.value);
            }}
          >
            <option value="Part-Time">Part-Time</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
          </select>
          <label
            for="jobtype"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Job Type
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="experience"
            id="experience"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setExperience(e.target.value);
            }}
          />
          <label
            for="experience"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Experience
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <CurrencyInput
            name="salary"
            id="salary"
            prefix="Rs "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            allowDecimals={false}
            allowNegativeValue={false}
            onValueChange={(value, name, values) => setSalary(value)}
          />
          <label
            for="experience"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Salary
          </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <textarea
            type="text"
            name="desc"
            id="desc"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
          />
          <label
            for="desc"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Job Description
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
            for="city"
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
            for="state"
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
            for="country"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Country
          </label>
        </div>
        

        <div className="flex items-center justify-center mt-8">
          <button
            className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            type="submit"
            onClick={(e) => {
              setJobDetails(e);
            }}
          >
            NEXT
          </button>
        </div>
      </form>
    </>
  );
}

export default JobDetailForm;
