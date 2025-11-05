import React, { useContext, useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../../users/components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { serverUrl } from '../../services/serverUrl';
import { updateProfileApi } from '../../services/allApi';
import { adminProfileUpdteContext } from '../../context/ContextSearch';

const AdminSetting = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    profile: ""
  });
  const [existingProfileImg, setExistingProfileImg] = useState('');
  const [token, setToken] = useState('');
  const [preview, setPreview] = useState("");
  const [updateStatus, setUpdateStatus] = useState({});
  const { setAdminProfileUpdateStatus } = useContext(adminProfileUpdteContext);

  // Handle file selection
  const handleFileAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminDetails({ ...adminDetails, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Reset form
  const handleReset = () => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAdminDetails({
        username: user.username,
        password: user.password,
        cpassword: user.password,
        profile: ""
      });
      setExistingProfileImg(user.profile);
      setPreview("");
      toast.info("Form reset to last saved values!");
    }
  };

  // Update profile
  const handleUpdate = async () => {
    const { username, password, cpassword, profile } = adminDetails;

    if (!username || !password || !cpassword) {
      toast.info("Please complete all details!");
      return;
    }
    if (cpassword !== password) {
      toast.warning("Passwords do not match!");
      return;
    }

    try {
      const storedToken = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!storedToken) {
        toast.error("Unauthorized: Please log in again!");
        return;
      }

      let reqBody;
      let headers = {
        Authorization: `Bearer ${storedToken}`,
      };

      if (preview) {
        reqBody = new FormData();
        for (let key in adminDetails) {
          reqBody.append(key, adminDetails[key]);
        }
      } else {
        reqBody = JSON.stringify({
          username,
          password,
          profile: existingProfileImg,
        });
        headers["Content-Type"] = "application/json";
      }

      const result = await updateProfileApi(reqBody, headers);

      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        setUpdateStatus(result.data);
        setPreview("");
        setAdminProfileUpdateStatus(result.data);
        window.dispatchEvent(new Event("profileUpdated"));
      } else {
        toast.error(result.data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Server error! Please try again.");
    }
  };

  // Load user data on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("existingUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      const user = JSON.parse(storedUser);
      setAdminDetails({
        username: user.username,
        password: user.password,
        cpassword: user.password,
        profile: ""
      });
      setExistingProfileImg(user.profile);
    }
  }, [updateStatus]);

  return (
    <>
      <Header />
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center'>
          <AdminSidebar />
        </div>
        <div>
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-semibold text-center mb-8">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-600 text-justify">
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Praesent nec malesuada sapien.</p>
                <p>Donec tincidunt ante sit amet eros porttitor, eget ultrices nulla iaculis.</p>
              </div>

              {/* Right side - Form */}
              <div className="bg-blue-50 rounded-xl shadow-md p-6 flex flex-col items-center">
                <label htmlFor='AdminProfilefile' style={{ marginBottom: '50px' }}>
                  <input id='AdminProfilefile' type="file" style={{ display: "none" }} onChange={handleFileAdd} />
                  <img
                    src={preview
                      ? preview
                      : existingProfileImg
                        ? `${serverUrl}/upload/${existingProfileImg}`
                        : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  <FontAwesomeIcon icon={faPen} className='bg-yellow-500 text-white py-3 px-4 rounded'
                    style={{ marginLeft: '90px', marginTop: '-100px' }} />
                </label>

                <form className="w-full space-y-4">
                  <input
                    value={adminDetails.username}
                    onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })}
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    value={adminDetails.password}
                    onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    value={adminDetails.cpassword}
                    onChange={(e) => setAdminDetails({ ...adminDetails, cpassword: e.target.value })}
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-1/2 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="w-1/2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default AdminSetting;
