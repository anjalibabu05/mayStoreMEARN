import React from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <>
      <Header />
      <div>
        <div className=" mt-8 px-3 py-2">
          <h1 className="text-center text-4xl">Contact Us</h1>
          <p className="text-justify mt-6 px-2 py-1  ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem assumenda culpa dolorum odit. Quae et sapiente
            mollitia esse, cum, recusandae, inventore temporibus voluptates aut
            minima nostrum nulla accusamus animi odio. Recusandae accusamus
            rerum, illo minus placeat voluptas provident animi aliquam dolorem
            ab, voluptatum soluta excepturi autem cum quae quibusdam nihil
            consequuntur, saepe ipsam. Nulla animi, accusantium laudantium
            quisquam minus eius! Accusantium doloremque totam architecto
            eligendi reiciendis, nulla culpa! Maiores omnis repellat blanditiis
            voluptatum quo, nostrum nihil in, animi quam aut dolorum id corporis
            quis fuga architecto minima laboriosam voluptatibus rem!
          </p>
        </div>
        <div className="flex justify-between mx-5 my-9 p-2">
          <p>
            <span className=" p-2 rounded-3xl bg-gray-300 mx-1">
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <span>123 street, apartment, any town, any country</span>
          </p>
          <p>
            <span className=" p-2 rounded-3xl bg-gray-300 mx-1">
              <FontAwesomeIcon icon={faPhone} />
            </span>{" "}
            <span>+91 7845328962</span>
          </p>
          <p>
            <span className=" p-2 rounded-3xl bg-gray-300 mx-1">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span>bookshelpdesk@gamil.com</span>
          </p>
        </div>
        <div className="my-15 md:grid grid-cols-2 gap-4">
            <div className="shadow bg-gray-300 ms-5">
                <h1 className="text-center text-4xl">Send Me Message</h1>
                <div className="flex flex-col gap-4 justify-center items-center my-4">
                    <input type="text" placeholder="Name" className="bg-white w-90 rounded p-1" />
                    <input type="text" placeholder="Email id" className="bg-white w-90 rounded p-1"/>
                    <input type="text" placeholder="Message" className="bg-white w-90 rounded p-1 size-24 text-left" />
                    <button className="bg-blue-500 w-90 rounded p-1">Send <FontAwesomeIcon icon={faPaperPlane}  /></button>
                </div>
            </div>
           <div className="shadow me-5">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.54195916445!2d76.30948084740359!3d10.00889799170815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1757582616339!5m2!1sen!2sin"
   
    height="350"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full"
  ></iframe>
</div>


        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;