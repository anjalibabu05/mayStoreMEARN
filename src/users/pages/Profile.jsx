import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faCamera, faEye, faX } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { getViewBookApi, makepaymentApi } from "../../services/allApi";
import { serverUrl } from "../../services/serverUrl";
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from "react-toastify";

const ViewBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const [bookDetails, setBookdetails] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    viewABook(id);
  }, [id]);

  const viewABook = async (bookId) => {
    try {
      const result = await getViewBookApi(bookId);
      if (result?.status === 200) {
        setBookdetails(result.data);
      } else {
        toast.error("Failed to load book details");
      }
    } catch (err) {
      toast.error("Error fetching book");
    }
  };

  const makePayment = async () => {
    if (!token) {
      toast.warning("Please login to purchase");
      return;
    }
    setLoading(true);
    try {
      const stripe = await loadStripe('pk_test_51SMjlSHwxAzUKRAuDYG1bkuMEzcQtfKjbZ8AoDpbf5hXPjB0gPPPqhlMTYO0qBkCZnMj2UNuDSC4nO3a8M0MpfxJ00xmM5CLG9');
      const reqBody = { bookDetails };
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await makepaymentApi(reqBody, reqHeader);

      if (result?.status === 200 && result.data?.sessionId) {
        await stripe.redirectToCheckout({ sessionId: result.data.sessionId });
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (err) {
      toast.error("Payment error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-center mt-6 mb-12 p-4">
        <div className="md:grid grid-cols-[1fr_3fr] gap-6 shadow-xl mx-10 p-6 rounded-lg w-full max-w-5xl">
          {/* Image section */}
          <div className="flex justify-center items-start p-2">
            <img
              src={bookDetails?.imageUrl || `${serverUrl}/upload/${bookDetails?.uploadimages?.[0]}` || "https://via.placeholder.com/300x400?text=No+Image"}
              alt={bookDetails?.tittle}
              className="w-72 h-96 object-cover rounded shadow"
            />
          </div>

          {/* Details section */}
          <div className="flex flex-col gap-3 px-3 py-2">
            <div>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => setOpenModal(true)}
                  className="cursor-pointer text-blue-600 text-xl"
                  title="View seller photos"
                />
              </div>
              <h1 className="text-center text-3xl font-bold mt-2">{bookDetails?.tittle}</h1>
              <h2 className="text-center text-blue-500 text-lg mt-1">{bookDetails?.author}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-3 py-2 mt-4 bg-gray-50 rounded p-4">
              <p><span className="font-semibold">Publisher:</span> {bookDetails?.publisher}</p>
              <p><span className="font-semibold">Language:</span> {bookDetails?.language}</p>
              <p><span className="font-semibold">Pages:</span> {bookDetails?.noOfPages}</p>
              <p><span className="font-semibold">Seller:</span> {bookDetails?.userEmail}</p>
              <p><span className="font-semibold">Price:</span> ₹{bookDetails?.price}</p>
              <p><span className="font-semibold">ISBN:</span> {bookDetails?.isbn}</p>
            </div>

            <div className="px-3 py-2 mt-4">
              <h3 className="font-semibold text-lg mb-2">About this book</h3>
              <p className="text-justify text-gray-700 leading-relaxed">{bookDetails?.abstract}</p>

              <div className="flex justify-end gap-4 mt-8 mb-4">
                <Link to="/all-books">
                  <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    <FontAwesomeIcon icon={faBackward} className="mr-2" />Back
                  </button>
                </Link>
                {bookDetails?.status === "sold" ? (
                  <button disabled className="bg-gray-400 px-4 py-2 rounded text-white font-semibold cursor-not-allowed">
                    Sold Out
                  </button>
                ) : (
                  <button
                    onClick={makePayment}
                    disabled={loading}
                    className="bg-green-600 px-4 py-2 rounded text-white font-semibold hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {loading ? "Processing..." : `Buy ₹${bookDetails?.dPrice}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Seller Photos */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="w-11/12 md:w-1/2 bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-3">
              <h1 className="font-semibold">Seller's Book Photos</h1>
              <FontAwesomeIcon icon={faX} onClick={() => setOpenModal(false)} className="cursor-pointer hover:text-red-400" />
            </div>

            <div className="flex gap-2 items-center mt-4 px-4 text-blue-500">
              <FontAwesomeIcon icon={faCamera} />
              <p className="text-sm">Photos taken by the seller</p>
            </div>

            <div className="flex flex-wrap justify-center mt-4 mb-8 gap-3 px-4">
              {bookDetails?.uploadimages?.length > 0 ? (
                bookDetails.uploadimages.map((item, index) => (
                  <img
                    key={index}
                    src={`${serverUrl}/upload/${item}`}
                    alt={`book-${index}`}
                    className="max-w-full max-h-60 object-contain rounded shadow"
                  />
                ))
              ) : (
                <p className="text-gray-500 py-6">No seller photos available</p>
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
};

export default ViewBook;
