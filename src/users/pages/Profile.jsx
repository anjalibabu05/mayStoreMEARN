// src/pages/Profile.js
import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { faCircleCheck, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from "../components/EditProfile";
import { toast, ToastContainer } from "react-toastify";
import { userProfileUpdateContext } from "../../context/ContextSearch";
import { getAllUserBooksApi } from "../../services/allApi";
import { data } from "react-router-dom";

const Profile = () => {
  const [sellStatus, setSellStatus] = useState(true);
  const [soldHistoryStatus, setSoldHistoryStatus] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(false);
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    profile: "",
    bio: "",
  });

  const[userBook,setuserBook]=useState([])
  const[userBroughtBook,setuserBroughtBook]=useState([])
  const { userProfileUpdateStatus } = useContext(userProfileUpdateContext);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        username: user.username,
        profile: user.profile,
        bio: user.bio || "",
      });
    }
  }, [userProfileUpdateStatus]);

  // ------------------------------
  // Sell Book form data & preview
  // ------------------------------
  const [bookDetails, setBookDetails] = useState({
    tittle: "",
    author: "",
    noOfPages: "",
    ImageUrl: "",
    price: "",
    dPrice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadedimages: [],
  });
  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);

  // Handle upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPreviewList([...previewList, url]);
  };

  // Reset form
  const handleReset = () => {
    setBookDetails({
      tittle: "",
      author: "",
      noOfPages: "",
      ImageUrl: "",
      price: "",
      dPrice: "",
      abstract: "",
      publisher: "",
      language: "",
      isbn: "",
      category: "",
      uploadedimages: [],
    });
    setPreview("");
    setPreviewList([]);
  };
  const getAllUserBooks = async () => {
    try {
      if (!token) return; // ✅ Prevent "missing token"
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await getAllUserBooksApi(reqHeader);
      console.log(result);
      if(result.status==200){
        setuserBook(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log(userBook);
console.log(userBroughtBook);



  const getAllUserBroughtBook = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getAllUserBooksApi(reqHeader)
    console.log(result);
    if(result.status==200){
        setuserBroughtBook(result.data)
      }

  }

  useEffect(() => {
    if (!token) return;

    if (soldHistoryStatus) {
      getAllUserBooks();
    }
    else if (purchaseStatus) {
      getAllUserBroughtBook();
    }
    else {
       console.log("Sold History Page"); // <- no more default page
    }
    
  }, [sellStatus, soldHistoryStatus, purchaseStatus, token]);


  return (
    <>
      <Header />
      <div style={{ height: "200px" }} className="bg-gray-900"></div>

      {/* Profile Image */}
      <div
        style={{
          width: "230px",
          height: "230px",
          borderRadius: "50%",
          marginTop: "-130px",
          marginLeft: "70px",
        }}
        className="bg-white p-3"
      >
        <img
          src={
            userDetails.profile
              ? `http://localhost:4000/upload/${userDetails.profile}`
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Profile Name + Edit */}
      <div className="flex px-20 mt-5 justify-between">
        <p className="flex justify-center items-center">
          <span className="text-2xl">{userDetails.username}</span>
          <FontAwesomeIcon icon={faCircleCheck} className="text-blue-700 ms-2" />
        </p>
        <EditProfile />
      </div>

      {/* Bio */}
      <p className="md:px-20 px-5 my-5 text-justify">
        {userDetails.bio || "No bio added yet. Edit your profile to add one!"}
      </p>

      {/* Tabs */}
      <div className="md:px-40">
        <div className="flex justify-center items-center my-5">
          <p
            onClick={() => {
              setSellStatus(true);
              setSoldHistoryStatus(false);
              setPurchaseStatus(false);
            }}
            className={
              sellStatus
                ? "p-4 text-blue-600 border-t border-r border-l border-gray-200 rounded-t cursor-pointer"
                : "p-4 text-black border-b border-gray-200 cursor-pointer"
            }
          >
           Add Book
          </p>
          <p
            onClick={() => {
              setSellStatus(false);
              setSoldHistoryStatus(true);
              setPurchaseStatus(false);
            }}
            className={
              soldHistoryStatus
                ? "p-4 text-blue-600 border-t border-r border-l border-gray-200 rounded-t cursor-pointer"
                : "p-4 text-black border-b border-gray-200 cursor-pointer"
            }
          >
            Sold History
          </p>
          <p
            onClick={() => {
              setSellStatus(false);
              setSoldHistoryStatus(false);
              setPurchaseStatus(true);
            }}
            className={
              purchaseStatus
                ? "p-4 text-blue-600 border-t border-r border-l border-gray-200 rounded-t cursor-pointer"
                : "p-4 text-black border-b border-gray-200 cursor-pointer"
            }
          >
            Purchase History
          </p>
        </div>

        {/* ---------------- SELL BOOK SECTION ---------------- */}
        {sellStatus && (
          <div className="bg-gray-200 p-10 mt-20 rounded-md shadow">
            <h1 className="text-center text-3xl font-medium">Book Details</h1>
            <div className="md:grid grid-cols-2 mt-5 w-full">
              {/* Left Column */}
              <div className="px-3">
                {["tittle", "author", "noOfPages", "ImageUrl", "price", "dPrice"].map((field, index) => (
                  <input
                    key={index} 
                    value={bookDetails[field]}
                    onChange={(e) =>
                      setBookDetails({ ...bookDetails, [field]: e.target.value })
                    }
                    type="text"
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="p-2 bg-white rounded placeholder-gray-300 w-full mb-3"
                  />
                ))}
                <textarea
                  value={bookDetails.abstract}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, abstract: e.target.value })
                  }
                  rows={5}
                  placeholder="Abstract"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full mb-3"
                ></textarea>
              </div>

              {/* Right Column */}
              <div className="px-3">
                {["publisher", "language", "isbn", "category"].map((field, index) => (
                  <input
                    key={index}
                    value={bookDetails[field]}
                    onChange={(e) =>
                      setBookDetails({ ...bookDetails, [field]: e.target.value })
                    }
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="p-2 bg-white rounded placeholder-gray-300 w-full mb-3"
                  />
                ))}

                {/* Upload image */}
                <div className="flex flex-col items-center">
                  {!preview ? (
                    <label htmlFor="imageFile" className="cursor-pointer">
                      <input
                        onChange={handleUpload}
                        type="file"
                        id="imageFile"
                        className="hidden"
                      />
                      <img
                        src="https://repository-images.githubusercontent.com/229240000/2b1bba00-eae1-11ea-8b31-ea57fe8a3f95"
                        alt="upload"
                        className="w-[200px] h-[200px] object-cover"
                      />
                    </label>
                  ) : (
                    <img
                      src={preview}
                      alt="upload"
                      className="w-[200px] h-[200px] object-cover"
                    />
                  )}
                </div>

                {/* Preview List */}
                {preview && (
                  <div className="flex justify-center items-center mt-3">
                    {previewList.map((item, index) => (
                      <img
                        key={index}
                        src={item}
                        style={{ width: "70px" }}
                        className="mx-1 rounded"
                        alt="preview"
                      />
                    ))}
                    <label htmlFor="imageFile" className="cursor-pointer mx-2">
                      <input
                        onChange={handleUpload}
                        type="file"
                        id="imageFile"
                        className="hidden"
                      />
                      <FontAwesomeIcon icon={faSquarePlus} className="text-xl" />
                    </label>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-5">
                  <button
                    onClick={handleReset}
                    className="bg-amber-600 rounded text-black px-5 py-2 hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => toast.success("Book Submitted (demo only)")}
                    className="bg-green-600 rounded text-black px-5 py-2 hover:bg-white hover:border hover:border-green-600 hover:text-green-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SOLD HISTORY SECTION ---------------- */}
        {soldHistoryStatus && (
          <div className="p-10 my-20 shadow rounded bg-gray-200">
            <div className="flex flex-col items-center mt-10">
              <img
                src="https://img.freepik.com/premium-vector/art-illustration_29190-8569.jpg"
                alt="no books"
                style={{ width: "200px", height: "200px" }}
              />
              <p className="text-gray-700 mt-2">No Books added yet</p>
            </div>
          </div>
        )}

        {/* ---------------- PURCHASE HISTORY SECTION ---------------- */}
        {purchaseStatus && (
          <div className="p-10 my-20 shadow rounded bg-gray-200">
            <div className="flex flex-col items-center mt-10">
              <img
                src="https://img.freepik.com/premium-vector/art-illustration_29190-8569.jpg"
                alt="no books"
                style={{ width: "200px", height: "200px" }}
              />
              <p className="text-gray-700 mt-2">No Books purchased yet</p>
            </div>
          </div>
        )}
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default Profile;
