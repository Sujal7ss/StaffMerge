import { useState, useEffect } from "react";
import JobListing from "../JobListing";
import toast from "react-hot-toast";
import getCookie from "../../components/cookie";
import axios from "axios";
import Lottie from "lottie-react";
import Loader from "../../assets/loader.json";

export default function AppliedJobs({ user = "candidate" }) {
  const [loading, setLoading] = useState(true);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        console.log("Fetch applied jobs");
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKENDURI}/api/candidate/appliedJobs`,
          {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (data.success) {
          setLoading(false)
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
      {loading && (
        <div className="flex flex-row w-full min-h-svh align-middle justify-center items-center">
          <Lottie
            animationData={Loader}
            className="w-52 flex flex-row align-middle justify-center"
          />
        </div>
      )}
      {!loading && jobList.length > 0 && (
        <JobListing JobList={jobList} applied={true} user={user} />
      )}
    </>
  );
}
