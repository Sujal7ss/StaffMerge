import toast from "react-hot-toast";
import axios from "axios";
import Candidate from "../Candidate"
import { useEffect, useState } from "react";

function AppliedCandidates({ candidates, job }) {
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `https://sujal7ss-staff-merge-backend.vercel.app/api/candidate/appliedCandidates`,
          { emails: candidates }
        );

        if (data.success) {
          setAppliedCandidates(data.candidates);
        } else {
          return toast.error("No one applied so far");
        }
      } catch (err) {
        console.log("err");
      }
    };
    if (candidates && candidates.length > 0) {
      fetchData();
    }
  }, [candidates]);
  return (
    <>
      {appliedCandidates.length > 0 &&
        appliedCandidates.map(
          (candidate, index) =>
            candidate &&
            typeof candidate === "object" && (
              
                <Candidate key={candidate._id} candidate={candidate} job={job}/>
              
            )
        )}
    </>
  );
}

export default AppliedCandidates;
