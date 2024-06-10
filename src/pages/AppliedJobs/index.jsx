import { useState, useEffect } from "react";
import JobListing from "../JobListing";
import toast from "react-hot-toast";
import getCookie from "../../components/cookie";
import axios from "axios";

export default function AppliedJobs({ user = "candidate" }) {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        console.log("Fetch applied jobs");
        const { data } = await axios.get(
          `https://sujal7ss-staff-merge-backend.vercel.app/api/candidate/appliedJobs`,
          {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (data.success) {
          const list = data.jobs;
          list.reverse();
          return setJobList(list);
        } else {
          toast.error("Login first");
          setTimeout(() => {
            window.location.href = "/candidateLogin";
          }, 2000);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getList();
  }, []);

  console.log(jobList);
  return (
    <>
      {jobList.length > 0 && <JobListing JobList={jobList} applied={true} user={user} />}
    </>
  );
}
