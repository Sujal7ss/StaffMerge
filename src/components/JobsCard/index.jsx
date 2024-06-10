import { useState } from "react";
import img from "../../assets/company.svg";
import Skills from "../Skills";
import { Link } from "react-router-dom";
export default function JobsCard({ job, applied, user }) {
  return (
    <div className="card w-72 shadow-lg relative flex flex-col md:flex-row border top-2 hover:top-0 hover:cursor-pointer  border-zinc-300 border-r-4 border-b-4 md:w-11/12 md:h-60 p-3 rounded-lg  mb-5">
      <div
        className="primary flex flex-col w-full justify-center items-center 
        "
      >
        <div className="job-data w-full flex flex-row">
          <img src={img} alt="companies logo" className="mx-5 w-10 md:w-14 md:ml-20 md:mr-9" />
          <div className="title flex flex-col ">
            <p className="text-slate-600 font-semibold underline md:mb-5">{job.companyName}</p>
            <h3 className="title text-2xl font-semibold">{job.title}</h3>
            <p className="text-slate-600 md:mt-2">
              <span className="font-semibold">{job.appliedCandidates &&  job.appliedCandidates.length} </span> candidate applied
            </p>
          </div>
        </div>
      </div>

      <div className="secondary flex flex-col items-center w-full ">
        <div className="mt-5 md:mt-12 flex md:flex-col gap-3">
          <button className="text-md`  hover:bg-gray-500 border border-none bg-gray-300 w-28 rounded-md">{job.jobType}</button>

          <button className="text-md hover:bg-gray-500  border border-none bg-gray-300 w-28 rounded-md">Rs {job.salary}</button>
          <h3>{job.YOE}</h3>
        </div>
        <div className="text-lg font-semibold mt-5 flex flex-row justify-center items-center">
          {applied && <button className="bg-yellow-200 rounded-xl w-36 h-10">
              PENDING
            </button>}
          {!applied && <Link to={`/${user}/jobsDetails?id=${job._id}`}>
            <button className="bg-sky-300 hover:bg-sky-500  w-36 h-10 rounded-md">
              {user === "candidate" ? <>APPLY NOW</> : <>VIEW</>}
            </button>
          </Link>}
        </div>
      </div>
    </div>
  );
}
