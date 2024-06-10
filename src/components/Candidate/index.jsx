import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import classNames from 'classnames';

function Candidate({ candidate, job }) {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sujal7ss-staff-merge-backend.vercel.app/api/candidate/resume/${candidate._id}`,
          { responseType: "blob" }
        );
        if (response.status === 200) {
          const url = URL.createObjectURL(response.data);
          setResumeUrl(url);
        } else {
          toast.error("No resume found");
        }
      } catch (err) {
        console.log("err");
      }
    };
    if (candidate) {
      fetchData();
    }
  }, []);
  const popupModal = () => {
    setIsOpen((e) => !e);
  };

  const handleYes = async() => {
    try{
      const {data} = await axios.get(`https://sujal7ss-staff-merge-backend.vercel.app/api/employer/selectCandidate`,
        {
          params: {
            job: job,
            candidate: candidate
          }
        }
      )
    }catch(err){
      console.log(err);
    }
    toast.success("Candidate selected")
    setIsOpen((e) => !e);
  };

  const handleNo = async () => {
    
    toast.error("Candidate not selected")
    setIsOpen((e) => !e);
  };
  const getModalClasses = () => {
    return classNames(
      'w-96', 'h-96', 'max-w-md', 'max-h-md', // Default to medium size
      'sm:max-w-lg', 'sm:max-h-lg', // Medium devices
      'md:max-w-xl', 'md:max-h-xl', // Large devices
      'lg:max-w-2xl', 'lg:max-h-2xl', // Larger devices
      'm-auto', 'p-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'h-20'
    );
  };

  const overlayStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay background
  };
  return (
    <section className="bg-gray-100 py-12">
      <ReactModal
        isOpen={isOpen}
        // className={"flex align-middle justify-center items-center w-52 h-52 bg-sky-300"}
        style={{
          overlay: overlayStyle,
          content: {}, // We will handle the content style with Tailwind classes
        }}
        className={getModalClasses()}

      >
        <div className="modal flex flex-col align-center items-center  md:w-full md:h-full">
          <h3 className="modal-title text-2xl mt-28 mb-20 font-sans font-semibold">
            Do u want to select this candidate?
          </h3>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleYes}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              YES!
            </button>
            <button
              onClick={handleNo}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              NO!
            </button>
          </div>
        </div>
      </ReactModal>
      <div className="md:max-w-4xl mx-auto px-4 flex sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-center p-6 gap-10">
            
            <div className="ml-6">
              {candidate.name && (
                <h2 className="text-2xl font-bold text-gray-900">
                  {candidate.name}
                </h2>
              )}

              {candidate.role && (
                <p className="text-lg text-gray-700">{candidate.role}</p>
              )}

              {candidate.city && candidate.state && candidate.country && (
                <p className="text-gray-600">
                  {" "}
                  {candidate.city} {candidate.state}, {candidate.country}
                </p>
              )}
              {candidate.email && (
                <p className="text-gray-600">Email: {candidate.email}</p>
              )}

              {candidate.phone && (
                <p className="text-gray-600">Phone: {candidate.phone}</p>
              )}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              About Me
            </h3>

            {candidate.description && (
              <p className="text-gray-700">{candidate.description}</p>
            )}
          </div>
          <div>
            {resumeUrl && (
              <div className="px-6 py-4 border-t border-gray-200 bg-sky-300 text-center hover:bg-sky-700">
                <a
                  href={resumeUrl}
                  download={`${candidate.name}-resume.pdf`}
                  className="font-mono text-md underline"
                >
                  Download Resume
                </a>
              </div>
            )}
            {resumeUrl && (
              <div className="px-6 py-4 border-t border-gray-200 bg-green-500 text-center hover:bg-green-600">
                <button
                  className="font-mono text-md underline"
                  onClick={popupModal}
                >
                  Select Candidate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Candidate;
