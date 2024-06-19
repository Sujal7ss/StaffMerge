import { useState } from "react";
import axios from "axios";
import img from "../../assets/intel.png";
import getCookie from "../../components/cookie.js";

export default function EmployerProfile() {
  const [companyName, setCompanyName] = useState("Company Name");
  const [city, setCity] = useState("City");
  const [about, setAbout] = useState("About");
  const [description, setDescription] = useState("Description");

  const [edit, setEdit] = useState(false);
  const call = async () => {
    let user = getCookie(document.cookie);
    console.log(user)
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKENDURI}/api/employer/companyDetails?email=${user}`
      );

      if (data.data) {
        console.log(data)
        setCompanyName(data.data.companyName);
        setCity(data.data.city);
        setAbout(data.data.about);
        setDescription(data.data.about);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSave = async () => {
    console.log("Edit");
    setEdit((e) => !e);
    console.log(edit);

    if (edit) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKENDURI}/api/employer/companyDetails`
        );
      } catch (err) {}
    }
  };
  return (
    <>
      <div
        onLoad={call}
        className="company w-11/12 h-96 m-auto mb-10 flex-col items-center md:items-start md:flex-row flex gap-10 "
      >
        <div className="flex flex-col w-3/4 mt-4 items-center h-96 gap-10">
          <div className="card w-72 shadow-lg relative flex items-center border top-2 hover:top-0 hover:cursor-pointer  border-zinc-300 border-r-4 border-b-4 md:w-full md:h-full p-3 rounded-lg  mb-5">
            {/*   <div className="flex flex-row justify-between w-full border p-10 h-44 mt-4 bg-slate-50 items-center"> */}
            <div className="job-data flex flex-row  justify-evenly w-full ">
              
              <div className="title flex flex-col ">
                {edit && (
                  <>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter your Company Name"
                      className="w-24 h-8 md:w-full md:h-10 mb-2 md:px-3 md:py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                  </>
                )}
                {!edit && (
                  <h3 className="title text-2xl md:text-4xl  md:mb-5 font-semibold ">
                    {companyName}
                  </h3>
                )}

                {edit && (
                  <>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter your Company Name"
                      className="w-24 h-8 md:w-full md:h-10 mb-2 md:px-3 md:py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                  </>
                )}
                {!edit && (
                  <h4 className="title text-sm  md:text-xl font-semibold">
                    {city}
                  </h4>
                )}
              </div>
              <button
                onClick={handleSave}
                className="px-2 h-10 mt-2 md:mt-4 md:px-4 md:py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
              >
                {edit ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="card w-72 shadow-lg relative flex items-center border top-2 hover:top-0 hover:cursor-pointer  border-zinc-300 border-r-4 border-b-4 md:w-full md:h-full p-3 rounded-lg  mb-5">
            {!edit && (
              <div className="title flex flex-col items-start ">
                <h3 className="title text-md md:text-xl ">About the Company</h3>
                <p className="text-slate-400">{about}</p>
              </div>
            )}
            {edit && (
              <textarea
                id="desc"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your Company Details"
                className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              />
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-col  border w-1/3 h-fit p-10 mt-4 bg-slate-50 justify-evenly">
          <div className="title flex flex-col items-start m-auto">
            <h3 className="title text-2xl font-bold">About the Company</h3>
            <a href="#">
              <p className="text-slate-400">website</p>
            </a>
          </div>
          <div className="title flex-col items-center gap-5 mt-12">
            <div className="mb-3">
              <p className="text-slate-400 mb-2">Company's size</p>
              <h1 className="text-lg font-semibold">11-50 Employees</h1>
            </div>
            <div className="mb-3">
              <p className="text-slate-400 mb-2">Industry Type</p>
              <h1 className="text-lg font-semibold">Software As A Service</h1>
            </div>
            <div className="mb-3">
              <p className="text-slate-400 mb-2">Company Type</p>
              <h1 className="text-lg font-semibold">Private Limited Company</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
