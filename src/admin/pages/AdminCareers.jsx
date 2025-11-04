import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../../users/components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import {
  addJobApi,
  deleteAjobApi,
  getAllApplicationApi,
  getallJobsApi,
} from "../../services/allApi";
import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../../services/serverUrl";
import { Link } from "react-router-dom";

const AdminCareers = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [modalStatus, setModalStatus] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [deleteJobStatus, setdeleteJobStatus] = useState({});
  const [addJobStatus, setaddJobStatus] = useState(false);
  const [allApplications, setAllApplications] = useState([]);
  const [jobStatus, setjobStatus] = useState(true);
  const [applicantStatus, setapplicantStatus] = useState(false);

  const [jobDetails, setJobDetails] = useState({
    tittle: "",
    location: "",
    jType: "",
    salary: "",
    qualification: "",
    experience: "",
    description: "",
  });

  // ✅ Fetch all jobs
  const getAllJobs = async (searchKey = "") => {
    try {
      const result = await getallJobsApi(searchKey);
      if (result.status === 200) {
        setAllJobs(result.data);
      } else {
        toast.warning("Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      toast.error("Failed to fetch jobs");
    }
  };

  // ✅ Fetch all applications
  const getApplications = async () => {
    try {
      const result = await getAllApplicationApi();
      if (result.status === 200) {
        setAllApplications(result.data);
      } else {
        toast.warning("Failed to fetch applicants");
      }
    } catch (err) {
      console.error("Get Applications Error:", err);
      toast.error("Failed to fetch applicants");
    }
  };

  console.log(allApplications);


  // ✅ Effect to fetch based on current tab
  useEffect(() => {
    if (jobStatus) {
      getAllJobs(searchKey);
    } else if (applicantStatus) {
      getApplications();
    } else {
      console.log("Something went wrong");
    }
  }, [addJobStatus, searchKey, deleteJobStatus, jobStatus, applicantStatus]);

  // ✅ Handle Submit Job
  const handleSubmit = async () => {
    const { tittle, location, jType, salary, qualification, experience, description } = jobDetails;

    if (!tittle || !location || !jType || !salary || !qualification || !experience || !description) {
      toast.info("Please fill the form completely!");
      return;
    }

    try {
      const result = await addJobApi({
        tittle,
        location,
        jType,
        salary,
        qualification,
        experience,
        description,
      });

      if (result.status === 200 || result.status === 201) {
        toast.success("Job added successfully!");
        handleReset();
        setModalStatus(false);
        setaddJobStatus(!addJobStatus);
        getAllJobs();
      } else if (result.status === 400) {
        toast.warning(result.data?.message || "Bad Request!");
      } else {
        toast.error("Failed to add job. Try again!");
      }
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Something went wrong!");
    }
  };

  // ✅ Reset Form
  const handleReset = () => {
    setJobDetails({
      tittle: "",
      location: "",
      jType: "",
      salary: "",
      qualification: "",
      experience: "",
      description: "",
    });
  };

  // ✅ Delete Job
  const handleDelete = async (id) => {
    try {
      const result = await deleteAjobApi(id);
      if (result.status === 200) {
        toast.success("Job deleted successfully!");
        setdeleteJobStatus({ id, status: true });
        getAllJobs(searchKey);
      } else {
        toast.error("Failed to delete job!");
      }
    } catch (err) {
      console.error("Delete Job Error:", err);
      toast.error("Failed to delete job!");
    }
  };

  // ✅ Handle Tab Switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === "jobs") {
      setjobStatus(true);
      setapplicantStatus(false);
    } else {
      setjobStatus(false);
      setapplicantStatus(true);
      getApplications();
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-[1fr_4fr]">
        <div className="bg-blue-100 flex flex-col items-center">
          <AdminSidebar />
        </div>

        <div>
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Careers</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-6 mb-8 text-gray-700">
              <button
                onClick={() => handleTabSwitch("jobs")}
                className={`pb-1 ${activeTab === "jobs"
                    ? "border-b-2 border-black font-medium"
                    : "hover:text-blue-600"
                  }`}
              >
                Job Post
              </button>
              <button
                onClick={() => handleTabSwitch("applicants")}
                className={`pb-1 ${activeTab === "applicants"
                    ? "border-b-2 border-black font-medium"
                    : "hover:text-blue-600"
                  }`}
              >
                View Applicants
              </button>
            </div>

            {/* Job Post Section */}
            {activeTab === "jobs" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex w-1/2">
                    <input
                      value={searchKey}
                      onChange={(e) => setsearchKey(e.target.value)}
                      type="text"
                      placeholder="Job Title"
                      className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={() => getAllJobs(searchKey)}
                      className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700"
                    >
                      Search
                    </button>
                  </div>
                  <button
                    onClick={() => setModalStatus(true)}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                  >
                    Add Job
                  </button>
                </div>

                {/* Job Cards */}
                {allJobs.length > 0 ? (
                  allJobs.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-md shadow-sm p-6 bg-white relative mb-4"
                    >
                      <h3 className="text-lg font-semibold mb-2">{item.tittle}</h3>
                      <p className="text-gray-700 mb-2">Location: {item.location}</p>
                      <p>Job Type: {item.jType}</p>
                      <p>Salary: {item.salary}</p>
                      <p>Qualification: {item.qualification}</p>
                      <p>Experience: {item.experience}</p>
                      <p className="mt-4 text-gray-600">{item.description}</p>

                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-2"
                      >
                        Delete <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No Jobs Added Yet!</p>
                )}
              </>
            )}

            {/* Applicants Section */}
            {activeTab === "applicants" && (
              <div className="text-center text-gray-600">
                {allApplications.length > 0 ? (
                  allApplications.map((app, index) => (
                    <div
                      key={index}
                      className="border rounded-md shadow-sm p-4 bg-white mb-4 text-left"
                    >
                      <h3 className="font-semibold">{app.fullname}</h3>
                      <p>Email: {app.email}</p>
                      <p>Phone: {app.phone}</p>
                      <p>Job Title:{app.jobTitle} </p>
                      {app.resume ? (
                        <div className="mt-3">
                          <Link
                            to={`${serverUrl}/pdfUploads/${app?.resume}`} // ✅ uses your live server
                          >
                            📄 View Resume
                          </Link>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic mt-2">No Resume Uploaded</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No Applicants Found 🚀</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Job Modal */}
      {modalStatus && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75">
          <div className="bg-white rounded-lg shadow-xl sm:w-full sm:max-w-lg relative">
            <div className="bg-gray-900 p-4 flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">Add Job Details</h1>
              <FontAwesomeIcon
                onClick={() => setModalStatus(false)}
                icon={faXmark}
                className="text-white fa-xl cursor-pointer"
              />
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    value={jobDetails.tittle}
                    onChange={(e) =>
                      setJobDetails({ ...jobDetails, tittle: e.target.value })
                    }
                    type="text"
                    placeholder="Job Title"
                    className="p-2 mb-3 border border-gray-400 rounded w-full"
                  />
                  <input
                    value={jobDetails.location}
                    onChange={(e) =>
                      setJobDetails({ ...jobDetails, location: e.target.value })
                    }
                    type="text"
                    placeholder="Location"
                    className="p-2 mb-3 border border-gray-400 rounded w-full"
                  />
                  <input
                    value={jobDetails.jType}
                    onChange={(e) =>
                      setJobDetails({ ...jobDetails, jType: e.target.value })
                    }
                    type="text"
                    placeholder="Job Type (Full-time / Internship)"
                    className="p-2 mb-3 border border-gray-400 rounded w-full"
                  />
                </div>
                <div>
                  <input
                    value={jobDetails.salary}
                    onChange={(e) =>
                      setJobDetails({ ...jobDetails, salary: e.target.value })
                    }
                    type="text"
                    placeholder="Salary"
                    className="p-2 mb-3 border border-gray-400 rounded w-full"
                  />
                  <input
                    value={jobDetails.qualification}
                    onChange={(e) =>
                      setJobDetails({
                        ...jobDetails,
                        qualification: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Qualification"
                    className="p-2 mb-3 border border-gray-400 rounded w-full"
                  />
                  <input
                    value={jobDetails.experience}
                    onChange={(e) =>
                      setJobDetails({ ...jobDetails, experience: e.target.value })
                    }
                    type="text"
                    placeholder="Experience"
                    className="p-2 mb-3 border border-gray-400 rounded w-full"
                  />
                </div>
              </div>
              <textarea
                value={jobDetails.description}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, description: e.target.value })
                }
                placeholder="Job Description"
                className="p-2 mb-4 border border-gray-400 rounded w-full h-32 resize-none"
              />
            </div>

            <div className="bg-gray-200 px-4 py-3 flex justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Submit
              </button>
              <button
                onClick={handleReset}
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default AdminCareers;
