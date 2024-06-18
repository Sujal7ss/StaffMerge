import { useState, useEffect } from "react";
import JobListing from "../JobListing";
import Lottie from "lottie-react";
import Loader from "../../assets/loader.json";

import axios from "axios";

export default function CandidateHome({ user }) {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getList = async () => {
      try {
        // console.log(process.env.${process.env.REACT_APP_BACKENDURI})
        const { data } = await axios.get(
          
          `${process.env.REACT_APP_BACKENDURI}/api/candidate/joblist`
        );

        if (data.success) {
          const list = data.jobs;
          // console.log(list[0]);
          list.reverse();
          setJobList(list);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getList();
  }, []);

  return (
    <>
      {loading && (
        <div className="absolute top-0 flex flex-row w-full min-h-screen align-middle justify-center items-center">
          <Lottie
            animationData={Loader}
            className="w-52 flex flex-row align-middle justify-center"
          />
        </div>
      )}

      {!loading && <JobListing JobList={jobList} user={user} />}
    </>
  );
}
