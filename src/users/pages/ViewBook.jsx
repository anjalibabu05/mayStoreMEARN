import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faCamera, faEye, faX } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";
//  import Modals from "../components/Modals";
import { isRouteErrorResponse, Link, useParams } from "react-router-dom";
import { getViewBookApi, makepaymentApi } from "../../services/allApi";
import { serverUrl } from "../../services/serverUrl";
import { loadStripe } from '@stripe/stripe-js';

const ViewBook = () => {
    const [openModal, setOpenModal] = useState(false)
    const [bookDetails, setBookdetails] = useState({})
    const [token, setToken] = useState("")
    const { id } = useParams()
    // console.log(id)

    // function to handle view book 
    const viewABook = async (id) => {
        const result = await getViewBookApi(id)
        console.log(result);
        if (result.status == 200) {
            setBookdetails(result.data)
            console.log(setBookdetails)

        }
    }



    useEffect(() => {
        viewABook(id)
    }, [])

    const makePayment = async () => {
        // stripe instance
        const stripe = await loadStripe('pk_test_51SMjlSHwxAzUKRAuDYG1bkuMEzcQtfKjbZ8AoDpbf5hXPjB0gPPPqhlMTYO0qBkCZnMj2UNuDSC4nO3a8M0MpfxJ00xmM5CLG9');
        reqBody = {
            bookDetails: bookDetails
        }
        const reqHeader = {
            'Authorization': `Bearer ${token}`
        }
        const result = await makepaymentApi(reqBody, reqHeader)
        console.log(result);
        console.log(result.data.bookUpdate);

        const sessionId = result.data.session
        const response = stripe.redirectToCheckout({
            // sessionId.sessionid
        })



    }
    useEffect(() => {
        viewABook(id)
        if (sessionStorage.getItem("token")) {
            const tokens = sessionStorage.getItem("token")
            setToken(tokens)
        }
    })
    return (
        <>
            <Header />
            <div className="max-h-screen flex justify-center items-center mt-6 mb-12 p-2 ">
                <div className="md:grid grid-cols-[1fr_3fr] gap-4 shadow-xl mx-10  p-2 rounded">
                    {/* image section */}
                    <div className="flex justify-center items-center p-2">
                        <img
                            src={bookDetails?.ImageUrl}
                            alt="" className="w-80"
                        />
                    </div>
                    {/* second section */}
                    <div className="flex flex-col gap-3 px-3 py-2 ">
                        <div>
                            <div className="flex justify-end "> <FontAwesomeIcon icon={faEye} onClick={() => setOpenModal(true)} /></div>
                            <h1 className="text-center text-3xl font-bold">
                                {bookDetails?.title}
                            </h1>
                            <h2 className="text-center text-blue-500">
                                {bookDetails?.author}
                            </h2>

                        </div>
                        <div className="md:grid grid-cols-3 justify-between gap-3.5 px-3 py-2 font-bold items-center  mt-4">
                            <p className="">Publisher : {bookDetails?.publisher}</p>
                            <p>Language : {bookDetails?.language}</p>
                            <p>No. Of pages : {bookDetails?.noOfPages}</p>
                            <p className="gap-2">Seller Email : {bookDetails?.userEmail}</p>
                            <p>Real Price : {bookDetails?.price}</p>
                            <p>ISBN : {bookDetails?.isbn}</p>
                        </div>
                        <div className="px-3 py-2 mt-7">
                            <p className="text-justify">{bookDetails?.abstract}</p>
                            <div className="flex justify-end gap-6 mt-8 mb-4">
                                <Link to={'/all-books'}><button className="px-3 py-1 rounded bg-blue-600 text-white font-bold"> <FontAwesomeIcon icon={faBackward} /> Back</button></Link>
                                <button onClick={makePayment} type="button" className="bg-green-600 px-3 py-1 rounded text-white font-bold">Buy {bookDetails?.dPrice}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && (
                <div className="fixed inset-0 bg-black/50 max-h-screen z-50 flex justify-center items-center w-screen">
                    <div className="w-2/3 md:w-1/3">
                        <div className="bg-white flex flex-col rounded overflow-auto max-h-[80vh]">
                            {/* modal header */}
                            <div className="flex justify-between items-center bg-black text-white px-2 py-4">
                                <h1>Book Photos</h1>
                                <FontAwesomeIcon icon={faX} onClick={() => setOpenModal(false)} className="cursor-pointer" />
                            </div>

                            <div className="flex gap-2 items-center mt-5 px-2 text-blue-400">
                                <FontAwesomeIcon icon={faCamera} />
                                <p>Camera click of the book in the hand of seller</p>
                            </div>

                            <div className="flex flex-wrap justify-center mt-5 mb-10 gap-2 px-2">
                                {bookDetails?.uploadedimages.map((item, index) => (
                                    <img
                                        key={index}
                                        src={`${serverUrl}/upload/${item}`}
                                        alt={`book-${index}`}
                                        className="max-w-full max-h-60 object-contain rounded shadow"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            <Footer />
        </>
    );
};

export default ViewBook;