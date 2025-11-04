import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { googleLoginApi, loginApi, registerApi } from "../services/allApi";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


 const Auth = ({ register }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(userDetails);
  // navigate
  const navigate = useNavigate();

  //register
  const handleRegister = async () => {
    console.log("inside register");
    const { username, email, password } = userDetails;
    if (username && email && password) {
      const result = await registerApi({ username, email, password });
      console.log(result);
      if (result.status == 200) {
        toast.success("Registration SuccesFull");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else if (result.status == 400) {
        toast.warning(result.response.data);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("Something Went Wrong.!!");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }
    } else {
      toast.info("please fill the form");
    }
  };
  // login
  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (email && password) {
      const result = await loginApi({ email, password });
      console.log(result);

      if (result.status == 200) {
        toast.success("Login SuccessFull.!");
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);

        setTimeout(() => {
          if (result.data.existingUser.email == "adminbook@gmail.com") {
            navigate("/admin-home");
          } else {
            navigate("/");
          }
        }, 3000);
      }
      // 401
      else if (result.status == 401) {
        toast.warning(result.response.data);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }
      // 404
      else if (result.status == 404) {
        toast.warning(result.response.data);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }
      //
      else {
        toast.error("something went wrong");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }
    } else {
      toast.info("please fill the form the complete data..!");
    }
  };

  // google login
 const handleGoogleLogin =async (credentialResponse)=>{
  const details = jwtDecode(credentialResponse.credential)
  console.log(details);

  // api call
  const result = await googleLoginApi({username:details.name,email:details.email,password:"googlepswd",photo:details.picture})
  console.log(result);
  // 
  if (result.status == 200) {
    toast.success("Login SuccessFull.!");
    sessionStorage.setItem(
      "existingUser",
      JSON.stringify(result.data.existingUser)
    );
    sessionStorage.setItem("token", result.data.token);

    setTimeout(() => {
      if (result.data.existingUser.email == "adminbook@gmail.com") {
        navigate("/admin-home");
      } else {
        navigate("/");
      }
    }, 3000);
  }
  else{
    toast.error("Something Went Wrong")
  }
 } 

  return (
    <div id="loginPage">
      <div className="md:grid grid-cols-3">
        <div></div>
        <div className="flex justify-center items-center flex-col">
          <h1>BOOK STORE</h1>
          <form className="w-full bg-gray-900 p-10 flex justify-center items-center flex-col rounded">
            <div
              style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              className="border border-white flex justify-center items-center "
            >
              <FontAwesomeIcon icon={faUser} className="text-white fa-2x" />
            </div>
            {register ? (
              <h1 className="text-white mt-6 text-3xl">Register</h1>
            ) : (
              <h1 className="text-white mt-6 text-3xl">Login</h1>
            )}
            {register && (
              <div className="mb-5 w-full mt-4">
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  value={userDetails.username}
                  type="text"
                  placeholder="username"
                  className="p-2 rounded placeholder-gray-6000 bg-white w-full"
                />
              </div>
            )}

            <div className="mb-5 w-full mt-8">
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                value={userDetails.email}
                type="text"
                placeholder="Email id"
                className="p-2 rounded placeholder-gray-6000 bg-white w-full"
              />
            </div>
            <div className="mb-5 w-full mt-4">
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                value={userDetails.password}
                type="text"
                placeholder="password"
                className="p-2 rounded placeholder-gray-6000 bg-white w-full"
              />
            </div>
            <div className=" mb-5 w-full flex justify-between">
              <p className="text-amber-400" style={{ fontSize: "14px" }}>
                * Never share the password with others
              </p>
              {!register && (
                <p
                  className="text-white underline"
                  style={{ fontSize: "14px" }}
                >
                  forgot password
                </p>
              )}
            </div>

            {register ? (
              <div className="mb-2 w-full">
                <button
                  onClick={handleRegister}
                  type="button"
                  className="bg-green-800 text-white w-full p-3 rounded"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="mb-2 w-full">
                <button
                  onClick={handleLogin}
                  type="button"
                  className="bg-green-800 text-white w-full p-3 rounded"
                >
                  Login
                </button>
              </div>
            )}

            {!register && (
              <p className="text-white my-2">
                -------------------------------or-------------------------------
              </p>
            )}
            {!register && (
              <div className="mb-5 mt-3 w-full flex justify-center">
                {/* <button className="bg-white text-black w-full p-3 rounded">
                  sign in with google
                </button> */}
                <div className="p-4">
                  <GoogleLogin 
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      toast.error("Login Failed..!")
                    }}
                  />
                </div>
              </div>
            )}
            {register ? (
              <p className="text-white">
                Are you alreday a user?
                <Link to={"/login"} className="text-blue-600 underline ms-2">
                  Login
                </Link>{" "}
              </p>
            ) : (
              <p className="text-white">
                Are you a new user?{" "}
                <Link to={"/register"} className="text-blue-600 underline ms-2">
                  Register
                </Link>
              </p>
            )}
          </form>
        </div>
        <div></div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
};

export default Auth