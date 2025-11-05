import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { faCircleCheck, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from "../components/EditProfile";
import { toast, ToastContainer } from "react-toastify";
import { uploadBookApi } from "../../services/allApi";

const Profile = () => {
  const [sellStatus, setSellStatus] = useState(true);
  const [soldHistoryStatus, setSoldHistoryStatus] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(false);

  // book details
  const [bookDetails, setBookDetails] = useState({
    tittle: "",
    author: "",
    noOfPages: "",
    imageUrl: "",
    price: "",
    dPrice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadimages: [],
  });

  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [userProfileStatus, setUserProfileStatus] = useState({});

  // handle file upload
  const handleUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = [...bookDetails.uploadimages, files[0]];
    setBookDetails({ ...bookDetails, uploadimages: fileArray });

    const url = URL.createObjectURL(files[0]);
    setPreview(url);

    setPreviewList((prev) => [...prev, url]);
  };

  // reset form
  const handleReset = () => {
    setBookDetails({
      tittle: "",
      author: "",
      noOfPages: "",
      imageUrl: "",
      price: "",
      dPrice: "",
      abstract: "",
      publisher: "",
      language: "",
      isbn: "",
      category: "",
      uploadimages: [],
    });
    setPreview("");
    setPreviewList([]);
  };

  // submit
  const handleSubmit = async () => {
    const {
      tittle,
      author,
      noOfPages,
      imageUrl,
      price,
      dPrice,
      abstract,
      publisher,
      language,
      isbn,
      category,
      uploadimages,
    } = bookDetails;

    if (
      !tittle ||
      !author ||
      !noOfPages ||
      !imageUrl ||
      !price ||
      !dPrice ||
      !abstract ||
      !publisher ||
      !language ||
      !isbn ||
      !category ||
      uploadimages.length === 0
    ) {
      toast.info("Please fill the form completely");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = new FormData();
    for (let key in bookDetails) {
      if (key !== "uploadimages") {
        reqBody.append(key, bookDetails[key]);
      } else {
        bookDetails.uploadimages.forEach((item) => {
          reqBody.append("uploadimages", item);
        });
      }
    }

    try {
      const result = await uploadBookApi(reqBody, reqHeader);
      console.log(result);

      if (result?.status === 401) {
        toast.warning(result.response.data);
      } else if (result?.status === 200) {
        toast.success("Book Added Successfully");
        handleReset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Server error: " + err.message);
    }
  };

  // user details
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        username: user.username,
        profile: user.profile,
      });
    }
  }, [userProfileStatus]);

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
            userDetails.profile ||
            "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
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
        <EditProfile setUserProfileStatus={setUserProfileStatus} />
      </div>

      {/* Bio */}
      <p className="md:px-20 px-5 my-5 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
        repudiandae vel possimus deserunt nisi deleniti nobis dignissimos
        provident ipsum eligendi corporis laborum odio atque, quaerat porro at
        nostrum dolore quis.
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
            Sell Book
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

        {/* Sell Book Section */}
        {sellStatus && (
          <div className="bg-gray-200 p-10 mt-20">
            <h1 className="text-center text-3xl font-medium">Book Details</h1>

            <div className="md:grid grid-cols-2 mt-5 w-full">
              {/* Left column */}
              <div className="px-3">
                <div className="mb-3">
                  <input
                    value={bookDetails.tittle}
                    onChange={(e) =>
                      setBookDetails({ ...bookDetails, tittle: e.target.value })
                    }
                    type="text"
                    placeholder="Title"
                    className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={bookDetails.author}
                    onChange={(e) =>
                      setBookDetails({ ...bookDetails, author: e.target.value })
                    }
                    type="text"
                    placeholder="Author"
                    className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={bookDetails.noOfPages}
                    onChange={(e) =>
                      setBookDetails({
                        ...bookDetails,
                        noOfPages: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Number Of Pages"
                    className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={bookDetails.imageUrl}
                    onChange={(e) =>
                      setBookDetails({
                        ...bookDetails,
                        imageUrl: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Image URL"
                    className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={bookDetails.price}
                    onChange={(e) =>
                      setBookDetails({ ...bookDetails, price: e.target.value })
                    }
                    type="text"
                    placeholder="Price"
                    className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={bookDetails.dPrice}
                    onChange={(e) =>
                      setBookDetails({ ...bookDetails, dPrice: e.target.value })
                    }
                    type="text"
                    placeholder="Discount Price"
                    className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={bookDetails.abstract}
                    onChange={(e) =>
                      setBookDetails({
                        ...bookDetails,
                        abstract: e.target.value,
                      })
                    }
                    rows={5}
                    placeholder="Abstract"
                    className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  ></textarea>
                </div>
              </div>

              {/* Right column */}
              <div className="px-3">
                <input
                  value={bookDetails.publisher}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, publisher: e.target.value })
                  }
                  type="text"
                  placeholder="Publisher"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                />
                <input
                  value={bookDetails.language}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, language: e.target.value })
                  }
                  type="text"
                  placeholder="Language"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                />
                <input
                  value={bookDetails.isbn}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, isbn: e.target.value })
                  }
                  type="text"
                  placeholder="ISBN"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                />
                <input
                  value={bookDetails.category}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, category: e.target.value })
                  }
                  type="text"
                  placeholder="Category"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                />

                {/* File Upload */}
                <div className="flex flex-col items-center">
                  {!preview ? (
                    <label htmlFor="imageFileMain" className="cursor-pointer">
                      <input
                        onChange={handleUpload}
                        type="file"
                        id="imageFileMain"
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

                {/* Additional Image Add */}
                {preview && (
                  <div className="flex justify-center items-center">
                    {previewList.map((item, index) => (
                      <img key={index} src={item} style={{ width: "70px" }} />
                    ))}
                    <label htmlFor="imageFileAdd" className="cursor-pointer">
                      <input
                        onChange={handleUpload}
                        type="file"
                        id="imageFileAdd"
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
                    onClick={handleSubmit}
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

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default Profile;
