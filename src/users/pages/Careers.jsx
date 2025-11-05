import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faShare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { addApplicationApi, getallJobsApi } from '../../services/allApi';
import { toast, ToastContainer } from "react-toastify";

const Careers = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [jobTitle, setJobTitle] = useState('');
  const [token, setToken] = useState("");
  const fileInputRef = useRef(null);

  const [applicationDetails, setApplicationDetails] = useState({
    fullname: "",
    qualifications: "",
    email: "",
    phone: "",
    coverletter: "",
    resume: null
  });

  // Open modal and set job title
  const openModal = (title) => {
    setModalStatus(true);
    setJobTitle(title);
  };

  // Fetch jobs
  const getAllJobs = async (search = "") => {
    const result = await getallJobsApi(search);
    if (result.status === 200) setAllJobs(result.data);
  };

  useEffect(() => {
    getAllJobs();
    const savedToken = sessionStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Search handler
  const handleSearch = () => {
    getAllJobs(searchKey);
  };

  // Generic input handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationDetails(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Reset form
  const handleReset = () => {
    setApplicationDetails({
      fullname: "",
      qualifications: "",
      email: "",
      phone: "",
      coverletter: "",
      resume: null
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit application
  const handleSubmit = async () => {
    if (!token) {
      toast.error("⚠️ You are not logged in. Please login first.");
      return;
    }

    const { fullname, email, phone, qualifications, coverletter, resume } = applicationDetails;

    if (!fullname || !email || !phone || !qualifications || !coverletter || !resume) {
      toast.info('⚠️ Please fill in all required fields and upload your resume.');
      return;
    }

    try {
      const reqHeader = { 'Authorization': `Bearer ${token}` };
      const reqBody = new FormData();

      for (let key in applicationDetails) {
        reqBody.append(key, applicationDetails[key]);
      }
      reqBody.append('jobTitle', jobTitle);

      const result = await addApplicationApi(reqBody, reqHeader);

      if (result.status === 200 || result.status === 201) {
        toast.success('✅ Application submitted successfully!');
        setModalStatus(false);
        handleReset();
      } else {
        toast.error('❌ Failed to submit application.');
      }
    } catch (error) {
      console.error(error);
      toast.error('❌ Error submitting application. Check console for details.');
    }
  };

  return (
    <>
      <Header />
      <div className='flex flex-col justify-center gap-7 px-3 py-2 mx-5 my-4'>
        <h1 className='text-center text-4xl'>Careers</h1>
        <p className='text-justify'>
          Explore opportunities and apply to join our growing team.
        </p>
      </div>

      {/* Search */}
      <div className='flex justify-center items-center gap-2 mb-8'>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder='Search Job Title Here'
          className='bg-gray-300 w-72 hover:outline-none px-2 py-1 rounded'
        />
        <button onClick={handleSearch} className='px-3 py-1 bg-green-700 rounded text-white hover:bg-green-800'>Search</button>
      </div>

      {/* Jobs List */}
      <div className='py-5 px-5 md:px-20 flex flex-col gap-5'>
        {allJobs.length > 0 ? (
          allJobs.map((job) => {
            const jobName = job.title || job.tittle || "Untitled";
            return (
              <div key={job._id} className='shadow border border-gray-300 p-4 rounded-md'>
                <div className='md:grid grid-cols-[8fr_1fr]'>
                  <div className='px-3 py-2'>
                    <h1 className='text-xl font-semibold'>{jobName}</h1>
                    <hr className='my-2' />
                    <h3 className='mt-3'><FontAwesomeIcon icon={faLocationDot} /> {job.location}</h3>
                    <h3 className='mt-3'>Job Type: {job.jType}</h3>
                    <h3 className='mt-3'>Salary: {job.salary}</h3>
                    <h3 className='mt-3'>Qualification: {job.qualification}</h3>
                    <h3 className='mt-3'>Experience: {job.experience}</h3>
                    <p className='text-justify mt-3'>Description: {job.description}</p>
                  </div>
                  <div className='flex items-start justify-end px-3 py-2'>
                    <button
                      onClick={() => openModal(jobName)}
                      className='px-3 py-1 mt-2 bg-blue-600 rounded text-white hover:bg-blue-800 hover:scale-105 transition-transform'
                    >
                      Apply <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center text-gray-600'>No jobs available at the moment.</p>
        )}
      </div>

      {/* Modal */}
      {modalStatus && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-4 sm:p-6 relative">
            <div className="bg-gray-900 p-4 flex justify-between items-center rounded-t">
              <h1 className="text-white text-2xl">Application Form</h1>
              <FontAwesomeIcon
                onClick={() => setModalStatus(false)}
                icon={faXmark}
                className="text-white fa-2x cursor-pointer"
              />
            </div>

            {/* Form Body */}
            <div className="px-4 pt-3 pb-4">
              <input
                type="text"
                value={jobTitle}
                readOnly
                className="p-2 border rounded w-full mb-3 bg-gray-100 cursor-not-allowed"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="fullname" value={applicationDetails.fullname} onChange={handleChange} type="text" placeholder="Full Name" className="p-2 border rounded w-full" />
                <input name="email" value={applicationDetails.email} onChange={handleChange} type="email" placeholder="Email Id" className="p-2 border rounded w-full" />
                <input name="qualifications" value={applicationDetails.qualifications} onChange={handleChange} type="text" placeholder="Qualification" className="p-2 border rounded w-full" />
                <input name="phone" value={applicationDetails.phone} onChange={handleChange} type="text" placeholder="Phone" className="p-2 border rounded w-full" />
              </div>
              <textarea name="coverletter" value={applicationDetails.coverletter} onChange={handleChange} placeholder="Cover Letter" className="p-2 border rounded w-full mt-3" />
              <input name="resume" type="file" ref={fileInputRef} onChange={handleChange} className="border border-gray-400 rounded w-full mt-3 file:bg-gray-400 file:text-white file:p-2" />
            </div>

            <div className="flex justify-end gap-2 bg-gray-200 p-3 rounded-b">
              <button onClick={handleSubmit} className="bg-green-600 px-3 py-2 rounded text-white hover:bg-white hover:text-black hover:border hover:border-gray-300 transition">Submit</button>
              <button onClick={handleReset} className="bg-orange-500 px-3 py-2 rounded text-white hover:bg-gray-50 hover:text-black transition">Reset</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default Careers;
