// import CompanyHeader from "../../components/CompanyHeader";
import img from "../../assets/company.svg";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import axios from "axios";
import getCookie from "../../components/cookie.js";
import Skills from "../../components/Skills";
import ReactModal from "react-modal";
import AppliedCandidates from "../../components/AppliedCandidates/index.jsx";

export default function JobDetails() {
  const [searchParams] = useSearchParams();

  //To edit the details , Employer access
  const [edit, setEdit] = useState(false);

  //Job Details
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState(false);
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState();
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const id = searchParams.get("id");
  const [job, setJob] = useState(null)

  //Job application
  const [apply, setApply] = useState(false);
  const [email, setEmail] = useState();
  const [resume, setResume] = useState();
  const [candidate, setCandidate] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/candidate/jobDetails/${id}`
        );
        const job = data.job;
        setJob(job)
        setCompanyName(job.companyName);
        setRole(job.title);
        setSalary(job.salary);
        setLocation(job.city);
        setDescription(job.jobDescription);
        setLink(job.jobLink);
        setCandidate(job.appliedCandidates);

        // console.log(data.job.authorId)
        // console.log(document.cookie.username)
        if (data.job.authorId === getCookie("username")) {
          setUser(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const handleSave = async () => {
    setEdit((e) => !e);

    if (edit) {
      try {
        const { data } = await axios.post(
          `http://localhost:8000/api/employer/editJob/${id}`,
          {
            companyName: companyName,
            title: role,
            salary: salary,
            jobDescription: description,
            city: location,
            jobLink: link,
          }
        );

        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const applyHandler = () => {
    setApply((e) => !e);
  };

  const handleApply = async () => {
    
    if (!resume) {
      return toast.error("Please provide resume");
    }
    try {
      const formData = new FormData();
      
      formData.append("resume", resume);
      formData.append("jobId", id);

      const { data } = await axios.post(
        "http://localhost:8000/api/candidate/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Clear email and resume after successful submission
        setEmail("");
        setResume(null);
        // Close the modal
        setApply(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    }
  };

  useEffect(() => {
    window.scrollTo({top: 0, behavior:"smooth"});  
    
  }, [])
  
  return (
    <>
      <ReactModal isOpen={apply}>
        <button onClick={applyHandler}>Close</button>
        <div className="">
          <div className="mt-3 md:p-8 lg:w-1/2 mx-auto">
            <div className="bg-gray-100 rounded-lg py-6 md:py-12 px-4 lg:px-24">
              <p className="text-center text-xs md:text-lg text-gray-500 font-semibold">
                APPLY TO THIS JOB?
              </p>

              <div className="mt-6">
                
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                />
                <label
                  for="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
                
                <div className="relative mt-3">
                  <p className="text-sm underline">Upload resume</p>
                  <input
                    className="text-sm w-32 appearance-none border md:pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md md:w-full md:py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                    id="username"
                    type="file"
                    name="resume"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>

                <div className="flex items-center justify-center mt-8">
                  <button 
                    className="text-white py-1 px-2 md:py-2 md:px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    // type="submit"
                    method="post"
                    onClick={handleApply}
                  >
                    Submit 
                  </button>
                </div>
                <hr className="m-4" />
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <div className="company w-11/12 m-auto mb-10">
        {/* Header */}
        {/* <div className="card w-72 shadow-lg relative flex flex-col md:flex-row border top-2 hover:top-0 hover:cursor-pointer  border-zinc-300 border-r-4 border-b-4 md:w-11/12 md:h-60 p-3 rounded-lg  mb-5"></div> */}
        <div className="flex flex-row shadow-lg h-20 justify-evenly border md:h-44 mt-4  bg-slate-50 items-center border-zinc-300 border-r-2 border-b-2 rounded-lg">
          {/* <img src={img} alt="companies logo" className="w-14 ml-20 mr-9" /> */}
          <img src={img} alt="companies logo" className="mx-5 w-10 md:w-14 md:ml-20 md:mr-9" />
          <div className="title flex flex-col  items-center justify-between">
            {!edit && (
              <h3 className="title md:text-2xl font-semibold underline">{companyName}</h3>
            )}
            {edit && (
              <input
                className="w-20 h-8 md:w-full  md:px-2 text-xs py-1.5 m-1 rounded-md ring-1 md:m-3 md:drop-shadow-2xl  text-slate-700 block "
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            )}

            {!edit && <p className="text-slate-600 md:text-4xl">{role}</p>}
            {edit && (
              <input
                className="w-20 h-8 md:w-full  px-2 py-1.5 text-xs rounded-md ring-1  drop-shadow-2xl md:m-3 text-slate-700 block "
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            )}
          </div>

          {!edit && !user && (
            <Button
              className={"md:mr-20 w-16 md:w-28"}
              style={"bg-C0DFED "}
              onSelect={applyHandler}
            >
              <p className="text-sm font-semibold">Apply</p>
            </Button>
          )}
          

          {user && (
            <button
              onClick={handleSave}
              className="px-2 py-1 md:mt-4 md:px-4 md:py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
            >
              {edit ? "Save" : "Edit"}
            </button>
          )}
        </div>
        <div className="flex flex-row shadow-lg h-20 justify-evenly border md:h-44 mt-4  bg-slate-50 items-center border-zinc-300 border-r-2 border-b-2 rounded-lg">
          <div>
            <h2 className="text-gray-400 text-sm md:text-md md:ml-12">Salary</h2>
            {!edit && <button className="text-md`  hover:bg-gray-500 border border-none bg-gray-300 w-28 rounded-md">Rs {salary}</button>}
            {edit && (
              <input
                className="w-20 h-8 text-sm  md:px-2 md:py-1.5 md:w-28 rounded-md ring-1  drop-shadow-2xl md:m-10 text-slate-700 block "
                type="number"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            )}
          </div>
          <div>
            <h2 className="text-gray-400 text-sm  md:text-md md:ml-12 ">Location</h2>
            {!edit && <button className="text-md`  hover:bg-gray-500 border border-none bg-gray-300 w-28 rounded-md">{location}</button>}
            {edit && (
              <input
                className="w-20 h-8 text-sm  md:px-2 md:py-1.5 md:w-28 rounded-md ring-1  drop-shadow-2xl md:m-10 text-slate-700 block "
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className=" shadow-lg  p-5 justify-evenly border md:w-8/12 mt-4  bg-slate-50 items-center border-zinc-300 border-r-2 border-b-2 rounded-lg">
          {/* <div className=" border md:w-8/12 mt-4 bg-slate-50 p-5"> */}
            <h1 className="text-lg items-center  md:text-2xl font-semibold my-2 self-center  md:my-5">About Internship</h1>

            {!edit && <p>{description}</p>}
            {edit && (
              <textarea
                className=" px-2 py-1.5 w-full md:h-96 rounded-md ring-1  drop-shadow-2xl  text-slate-700 block "
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            )}
          </div>
        
        {user && (
          <>
            <div className="flex flex-col justify-evenly border h-fit mt-4 bg-slate-50 items-center">
              <h3 className="font-semibold text-2xl md:my-20">
                Applied Candidate
              </h3>
              <AppliedCandidates candidates={candidate} job={job} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
