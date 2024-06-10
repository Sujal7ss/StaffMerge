import Navbar from "../../components/Navbar";
import JobDetailForm from "../../components/JobDetailForm/index.jsx";
function PostJobs() {
  return (
    <>
      
        <div className="">
          <div className="p-8 lg:w-1/2 mx-auto">
            <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
              <p className="text-center text-lg font-bold text-gray-500 ">
                Job Details
              </p>
              <JobDetailForm />
            </div>
          </div>
        </div>

    </>
  );
}

export default PostJobs;
