import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../../users/components/Header";
import Footer from "../../components/Footer";
import { approveBookApi, getAllAdminBookApi, getAllUserApi } from "../../services/allApi";

const AllBooks = () => {
  const [activeTab, setActiveTab] = useState("books"); // default tab
  const [bookDetails, setBookDetails] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState("");

  // ✅ Fetch all books
  const getAllBooks = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getAllAdminBookApi(reqHeader);
    console.log("📚 All Books:", result);
    if (result.status === 200) {
      setBookDetails(result.data);
    }
  };

  // ✅ Fetch all users
  const getAllUsers = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getAllUserApi(reqHeader);
    console.log("👥 All Users:", result);
    if (result.status === 200) {
      setAllUsers(result.data);
    }
  };

  // ✅ Load token and fetch data
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setToken(sessionToken);
      getAllBooks(sessionToken);
      getAllUsers(sessionToken);
    }
  }, []);

  // ✅ Approve Book Function
  const approveBook = async (item) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await approveBookApi(item, reqHeader);
      console.log("✅ Approved Book:", result);

      // Update status locally to show tick
      setBookDetails((prevBooks) =>
        prevBooks.map((book) =>
          book.isbn === item.isbn ? { ...book, status: "approved" } : book
        )
      );
    } catch (error) {
      console.error("❌ Error approving book:", error);
    }
  };

  // ✅ Dummy user for display when list empty
  const dummyUser = {
    name: "Dummy User",
    email: "dummyuser@example.com",
    role: "User",
    avatar: "https://via.placeholder.com/150/3b82f6/ffffff?text=U",
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-[1fr_4fr] min-h-screen">
        {/* Sidebar */}
        <div className="bg-blue-100 flex flex-col items-center">
          <AdminSidebar />
        </div>

        {/* Main Section */}
        <div className="bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-center mb-6">Dashboard</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-6 mb-8 text-gray-700">
              <button
                onClick={() => setActiveTab("books")}
                className={`pb-1 ${activeTab === "books"
                    ? "border-b-2 border-black font-medium"
                    : "hover:text-blue-600"
                  }`}
              >
                Book List
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`pb-1 ${activeTab === "users"
                    ? "border-b-2 border-black font-medium"
                    : "hover:text-blue-600"
                  }`}
              >
                Users
              </button>
            </div>

            {/* 📘 Books Tab */}
            {activeTab === "books" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bookDetails.length > 0 ? (
                  bookDetails.map((item) => (
                    <div
                      key={item.isbn}
                      className="bg-white border rounded-md shadow hover:shadow-lg transition"
                    >
                      <img
                        src={item.ImageUrl}
                        alt={item.tittle}
                        className="w-full h-64 object-cover rounded-t-md"
                      />
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold">{item.tittle}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          ✍️ {item.author || "Unknown Author"}
                        </p>
                        <p className="text-base font-medium text-green-700 mt-2">
                          💰 ₹{item.dPrice || "N/A"}
                        </p>
                        <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-md">
                          {item.status || "Available"}
                        </span>
                      </div>

                      {/* ✅ Approve Button */}
                      <button
                        onClick={() => approveBook(item)}
                        className={`relative flex items-center justify-center gap-2 py-2 px-4 w-full font-semibold rounded-md shadow-md transition-all duration-300 
                          ${item.status === "approved"
                            ? "bg-green-100 text-green-700 border border-green-500 cursor-default"
                            : "bg-green-800 text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800"
                          }`}
                        disabled={item.status === "approved"}
                      >
                        {item.status === "approved" ? "Approved" : "Approve"}
                        {item.status === "approved" && (
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvyBXSSP0c-j8fyhbQGD3stsOhLWDnUd0sw&s"
                            alt="Approved"
                            className="w-6 h-6 ml-2 animate-bounce"
                          />
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No Books Found 📚</p>
                )}
              </div>
            )}

            {/* 👥 Users Tab */}
            {activeTab === "users" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {allUsers?.length > 0 ? (
                  allUsers
                    .filter((user) => user.email !== "adminbook@gmail.com") // ✅ hide admin
                    .map((user) => (
                      <div
                        key={user._id}
                        className="bg-white border rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
                      >
                        <img
                          src={user.profile || "https://via.placeholder.com/150/3b82f6/ffffff?text=U"}
                          alt={user.username}
                          className="w-24 h-24 rounded-full mb-3 object-cover"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-md">
                          User
                        </span>
                      </div>
                    ))
                ) : (
                  <p className="text-center">No Users Found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBooks;
