import LandingPage from "./pages/LandingPage";
import CandidateLayout from "./components/CandidateLayout/index.jsx";
import JobDetails from "./pages/JobDetails";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateHome from "./pages/CandidateHome";
import AppliedJobs from "./pages/AppliedJobs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateSignup from "./pages/CandidateSignup";
import CandidateLogin from "./pages/CandidateLogin";
import EmployerLogin from "./pages/EmployerLogin";
import EmployerSignup from "./pages/EmployerSignup";
import CompanyDetails from "./pages/CompanyDetails/index";
import CandidateAboutMe from "./pages/CandidteAboutMe/index.jsx";
import PostJobs from "./pages/PostJobs/index.jsx";
import PostedJobs from "./pages/PostedJobs/index.jsx";
import Layout from "./components/Layout";
import EmployerLayout from "./components/EmployerLayout";

function App() {
  console.log("HII");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="candidateSignup" element={<CandidateSignup />} />
          <Route path="candidateLogin" element={<CandidateLogin />} />
          <Route path="employerSignup" element={<EmployerSignup />} />
          <Route path="employerLogin" element={<EmployerLogin />} />
        </Route>

        <Route path="candidate" element={<CandidateLayout />}>
          <Route index element={<CandidateHome user={"candidate"}/>} />
          <Route path="appliedJobs" element={<AppliedJobs user={"candidate"}/>} />
          <Route path="jobsDetails" element={<JobDetails user={"candidate"}/>} />
          <Route path="aboutme" element={<CandidateAboutMe />} />
        </Route>

        <Route path="employer" element={<EmployerLayout />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="companyDetails" element={<CompanyDetails />} />
          <Route path="postJob" element={<PostJobs />} />
          <Route path="postedJobs" element={<PostedJobs user={"employer"} />} />
          <Route path="jobsDetails" element={<JobDetails user={"employer"}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
