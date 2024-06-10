const NavbarDetails = {
  Homepage: {
    Navbar: [
      { id: 1, name: "HOW WE WORK", path: "" },
      { id: 2, name: "PRICING", path: "" },
      { id: 3, name: "DOWNLOAD", path: "" },
      { id: 4, name: "ABOUT US", path: "" },
    ],
    Button: "LoginButton",
    Logo: "/",
  },
  Candidate: {
    Navbar: [
      { id: 1, name: "ACTIVE JOBS", path: "/candidate" },
      { id: 2, name: "APPLIED JOBS", path: "/candidate/appliedJobs" },

      { id: 4, name: "ABOUT ME", path: "aboutme" },
    ],
    Button: "Profile",
    Logo: "/candidate",
  },
  Employer: {
    Navbar: [
      { id: 1, name: "POSTED JOBS", path: "postedJobs" },
      { id: 2, name: "SAVED CANDIDATES", path: "/employer" },

      { id: 4, name: "ABOUT ME", path: "/employer" },
    ],
    Button: {
      name: "Profile",
      path: "/NewJob",
    },
    Logo: "/employer",
  },
};

export default NavbarDetails;
