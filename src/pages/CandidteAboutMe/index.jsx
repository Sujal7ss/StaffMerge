import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import getCookie from "../../components/cookie";

function CandidateAboutMe() {
  const navigator = useNavigate();
  const [name, setName] = useState("Your Name");
  const [role, setRole] = useState("Your Role");
  const [description, setDescription] = useState(
    "I am a full stack developer with 5 years...."
  );
  const [city, setCity] = useState("City");
  const [state, setState] = useState("State");
  const [country, setCountry] = useState("Country");
  const [email, setEmail] = useState("example@gmail.com");
  const [phone, setPhone] = useState("1234567890");
  const [skills, setSkills] = useState(["java", "React", "Node"]);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://sujal7ss-staff-merge-backend.vercel.app/api/candidate/aboutme`,
          {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(data)
        if (!data.success) {
          toast.error("Login first");
          setTimeout(() => {
            
          }, 2000);
          return
        }
        const candidate = data.candidate;

        if (candidate) {
          if (candidate.name) {
            setName(candidate.name);
          }
          if (candidate.role) {
            setRole(candidate.role);
          }
          if (candidate.description) {
            setDescription(candidate.description);
          }
          if (candidate.city) {
            setCity(candidate.city);
          }
          if (candidate.state) {
            setState(candidate.state);
          }
          if (candidate.country) {
            setCountry(candidate.country);
          }
          if (candidate.email) {
            setEmail(candidate.email);
          }
          if (candidate.phone) {
            setPhone(candidate.phone);
          }
          if (candidate.skills) {
            setSkills(candidate.skills);
          }
          

          // setToken(response.data.token); // Assuming the response contains a token field
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log("Error fetching data");
        console.error(err);
      }
      // else {
      //   toast.error("Login first");
      //   setTimeout(()=> {

      //     window.location.href = "/candidateLogin";
      //   },2000)
      // }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setEdit((e) => !e);
    if (edit) {
      const response = await axios.post(
        `https://sujal7ss-staff-merge-backend.vercel.app/api/candidate/update`,
        {
          name: name,
          role: role,
          description: description,
          city: city,
          state: state,
          country: country,
          email: email,
          phone: phone,
          skills: skills,
        }
      );
    }
  };

  return (
    <>
      <section className=" py-12 flex items-center">
        <div className="max-w-full mx-auto px-4 flex sm:px-6 lg:px-8">
        <div className="card w-72 shadow-lg relative flex flex-col border top-2 hover:top-0 hover:cursor-pointer  border-zinc-300 border-r-4 border-b-4 md:w-full md:h-full p-3 rounded-lg  mb-5">
            <div className="flex flex-col md:flex-row items-center p-6 gap-10">
              <img
                className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <div className="ml-6">
                {edit && (
                  <>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                  </>
                )}
                {!edit && (
                  <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                )}

                {edit && (
                  <>
                    <input
                      id="role"
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Enter your Role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                  </>
                )}
                {!edit && <p className="text-lg text-gray-700">{role}</p>}

                {edit && (
                  <>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter your Role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                    <input
                      id="state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Enter your Role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                    <input
                      id="country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Enter your Role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                  </>
                )}
                {!edit && (
                  <p className="text-gray-600">
                    {" "}
                    {city} {state}, {country}
                  </p>
                )}

                <p className="text-gray-600">Email: {email}</p>

                {edit && (
                  <>
                    <input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your Role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                    />
                  </>
                )}
                {!edit && <p className="text-gray-600">Phone: {phone}</p>}

                <div className="flex mt-4 space-x-4">
                  <a
                    href="https://www.linkedin.com/in/johndoe"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {/* <FaLinkedin size={24} /> */}
                  </a>
                  <a
                    href="https://github.com/johndoe"
                    className="text-gray-900 hover:text-gray-700"
                  >
                    {/* <FaGithub size={24} /> */}
                  </a>
                  <a
                    href="https://twitter.com/johndoe"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    {/* <FaTwitter size={24} /> */}
                  </a>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
              >
                {edit ? "Save" : "Edit"}
              </button>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                About Me
              </h3>
              {edit && (
                <>
                  <textarea
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your Role"
                    className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  />
                </>
              )}
              {!edit && (
                <p className="text-gray-700 w-full overflow-scroll">
                  {description}
                </p>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}

export default CandidateAboutMe;
