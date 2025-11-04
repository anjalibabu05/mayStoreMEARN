import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBook, faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { serverUrl } from "../../services/serverUrl";
import { adminProfileUpdteContext} from "../../context/ContextSearch";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminProfileUpdateStatus } = useContext(adminProfileUpdteContext);

  const [active, setActive] = useState("");
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    profile: ""
  });

  useEffect(() => {
    // set active tab based on current path
    if (location.pathname === "/admin-home") setActive("home");
    else if (location.pathname === "/admin-books") setActive("books");
    else if (location.pathname === "/admin-careers") setActive("careers");
    else if (location.pathname === "/admin-settings") setActive("settings");
    else setActive("");

    // Load admin details from sessionStorage
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAdminDetails({
        username: user.username,
        profile: user.profile || ""
      });
    }
  }, [location, adminProfileUpdateStatus]); // refresh on navigation or profile update

  useEffect(() => {
    // Listen for profileUpdated event from AdminSetting (for reset & update)
    const handleProfileUpdate = () => {
      const updatedUser = JSON.parse(sessionStorage.getItem("existingUser"));
      if (updatedUser) {
        setAdminDetails({
          username: updatedUser.username,
          profile: updatedUser.profile || ""
        });
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center p-5 bg-blue-100 h-full">
      <img
        src={
          adminDetails.profile
            ? `${serverUrl}/upload/${adminDetails.profile}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa7tBFCEp6gP1NhOcGkP1xrcJOkfkhLVCXOA&s"
        }
        alt="Admin Profile"
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />

      <h1 className="mt-5 font-semibold text-lg text-center break-words w-full">
        {adminDetails.username || "Admin"}
      </h1>

      <div className="my-8 w-full">
        <div className="flex flex-col items-start space-y-4 px-6">
          <label
            onClick={() => handleNavigate("/admin-home")}
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg ${
              active === "home" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-200"
            }`}
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </label>

          <label
            onClick={() => handleNavigate("/admin-books")}
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg ${
              active === "books" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-200"
            }`}
          >
            <FontAwesomeIcon icon={faBook} />
            All Books
          </label>

          <label
            onClick={() => handleNavigate("/admin-careers")}
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg ${
              active === "careers" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-200"
            }`}
          >
            <FontAwesomeIcon icon={faBagShopping} />
            Careers
          </label>

          <label
            onClick={() => handleNavigate("/admin-settings")}
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg ${
              active === "settings" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-200"
            }`}
          >
            <FontAwesomeIcon icon={faGear} />
            Settings
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
