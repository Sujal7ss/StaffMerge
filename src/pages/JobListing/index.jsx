import { useEffect } from "react";
import JobsCard from "../../components/JobsCard";
// import JobList from "../../assets/JobList";

export default function JobListing({ JobList, applied,   user={user}}) {
  return (
    <>
      <div className="job-listing flex flex-col md:w-3/4 items-center m-auto mt-7 md:gap-4 rounded-md ">
        {JobList.length > 0 && JobList.map((Job) => (
          <JobsCard  job={Job} applied={applied}  user={user}/>
        ))}
      </div>
    </>
  );
}
