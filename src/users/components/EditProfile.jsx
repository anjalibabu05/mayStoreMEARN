import React, { useEffect, useState, useContext } from "react";
import { faFilePen, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { updateUserProfileApi } from "../../services/allApi";
import { adminProfileUpdteContext } from "../../context/ContextSearch";

const EditProfile = () => {
  const [offCanvasStatus, setOffCanvasStatus] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    profile: "",
    bio: "",
  });
  const [token, setToken] = useState("");
  const [preview, setPreview] = useState("");
  const [existingProfileImg, setExistingProfileImg] = useState("");

  const { setUserProfileUpdateStatus } = useContext(adminProfileUpdteContext);

  // ✅ Handle image upload & preview
  const handleUploadImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails({ ...userDetails, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Reset form to last saved values
  const handleReset = () => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails({
        username: user.username,
        password: user.password || "",
        cpassword: user.password || "",
        profile: "",
        bio: user.bio || "",
      });
      setExistingProfileImg(user.profile);
      setPreview("");
      toast.info("Form reset to last saved values!");
    }
  };

  // ✅ Update user profile
  const handleUpdate = async () => {
    const { username, password, cpassword, profile, bio } = userDetails;

    if (!username || !password || !cpassword) {
      toast.warning("Please fill all required fields!");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("password", password);
    reqBody.append("bio", bio);
    if (profile) reqBody.append("profile", profile);

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await updateUserProfileApi(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user));
        setExistingProfileImg(result.data.user.profile);
        setPreview("");
        setOffCanvasStatus(false);
        setUserProfileUpdateStatus(result.data);
      } else {
        toast.error(result.response?.data?.message || "Update failed!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Server error while updating profile!");
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedToken && storedUser) {
      setToken(storedToken);
      const user = JSON.parse(storedUser);
      setUserDetails({
        username: user.username,
        password: user.password || "",
        cpassword: user.password || "",
        profile: "",
        bio: user.bio || "",
      });
      setExistingProfileImg(user.profile);
    }
  }, []);

  return (
    <div>
      {/* Open Edit Panel */}
      <button
        onClick={() => setOffCanvasStatus(true)}
        className="text-blue-800 border border-blue-800 rounded p-3 hover:bg-blue-800 hover:text-white"
      >
        <FontAwesomeIcon icon={faFilePen} /> Edit
      </button>

      {offCanvasStatus && (
        <div>
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="bg-white h-full w-96 fixed z-50 top-0 right-0 shadow-xl">
            <div className="bg-gray-900 px-3 py-4 flex justify-between items-center text-white text-2xl">
              <h1 className="text-lg font-semibold">Edit User Profile</h1>
              <FontAwesomeIcon
                onClick={() => setOffCanvasStatus(false)}
                icon={faXmark}
                className="cursor-pointer"
              />
            </div>

            {/* Profile Image Upload */}
            <div className="flex justify-center items-center flex-col mt-4">
              <label htmlFor="profilefile" className="relative cursor-pointer">
                <input onChange={handleUploadImg} type="file" id="profilefile" style={{ display: "none" }} />
                <img
                  src={
                    preview
                      ? preview
                      : existingProfileImg
                      ? `http://localhost:4000/upload/${existingProfileImg}`
                      : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                  }
                  alt="upload"
                  className="w-[200px] h-[200px] object-cover rounded-full border-2 border-gray-300"
                />
                <div className="text-white p-3 rounded-full bg-gray-900 absolute bottom-0 right-0">
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </label>
            </div>

            {/* Input Fields */}
            <div className="p-5 space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="p-2 bg-gray-100 rounded w-full"
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                className="p-2 bg-gray-100 rounded w-full"
                value={userDetails.password}
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="p-2 bg-gray-100 rounded w-full"
                value={userDetails.cpassword}
                onChange={(e) => setUserDetails({ ...userDetails, cpassword: e.target.value })}
              />

              <textarea
                rows={4}
                placeholder="Bio"
                className="p-2 bg-gray-100 rounded w-full"
                value={userDetails.bio}
                onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
              ></textarea>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleReset}
                  type="button"
                  className="bg-amber-600 rounded text-black px-5 py-2 hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600"
                >
                  Reset
                </button>

                <button
                  onClick={handleUpdate}
                  type="button"
                  className="bg-green-600 rounded text-black px-5 py-2 hover:bg-white hover:border hover:border-green-600 hover:text-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
