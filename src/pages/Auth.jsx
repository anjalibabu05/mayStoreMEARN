import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { googleLoginApi, loginApi, registerApi } from "../services/allApi";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Auth = ({ register }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ REGISTER
  const handleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info("Please fill all fields");
      return;
    }

    const result = await registerApi({ username, email, password });
    console.log("REGISTER RESULT:", result);

    if (result?.status === 200) {
      toast.success("Registration successful!");
      setUserDetails({ username: "", email: "", password: "" });
      navigate("/login");
    } else if (result?.status === 400) {
      toast.warning(result?.data || "Invalid registration data");
    } else {
      toast.error(result?.data || "Something went wrong!");
    }

    setUserDetails({ username: "", email: "", password: "" });
  };

  // ✅ LOGIN
  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.info("Please fill all fields");
      return;
    }

    const result = await loginApi({ email, password });
    console.log("LOGIN RESULT:", result);

    if (result?.status === 200) {
      toast.success("Login successful!");
      sessionStorage.setItem(
        "existingUser",
        JSON.stringify(result.data.existingUser)
      );
      sessionStorage.setItem("token", result.data.token);

      setTimeout(() => {
        if (result.data.existingUser.email === "adminbook@gmail.com") {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
      }, 2000);
    } else if (result?.status === 401 || result?.status === 404) {
      toast.warning(result?.data || "Invalid credentials");
    } else {
      toast.error("Something went wrong!");
    }

    setUserDetails({ username: "", email: "", password: "" });
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    console.log("GOOGLE DETAILS:", details);

    const result = await googleLoginApi({
      username: details.name,
      email: details.email,
      password: "googlepswd",
      photo: details.picture,
    });

    console.log("GOOGLE LOGIN RESULT:", result);

    if (result?.status === 200) {
      toast.success("Login successful!");
      sessionStorage.setItem(
        "existingUser",
        JSON.stringify(result.data.existingUser)
      );
      sessionStorage.setItem("token", result.data.token);

      setTimeout(() => {
        if (result.data.existingUser.email === "adminbook@gmail.com") {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
      }, 2000);
    } else {
      toast.error(result?.data || "Something went wrong!");
    }
  };

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

            <h1 className="text-white mt-6 text-3xl">
              {register ? "Register" : "Login"}
            </h1>

            {register && (
              <div className="mb-5 w-full mt-4">
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  value={userDetails.username}
                  type="text"
                  placeholder="Username"
                  className="p-2 rounded bg-white w-full"
                />
              </div>
            )}

            <div className="mb-5 w-full mt-8">
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                value={userDetails.email}
                type="email"
                placeholder="Email"
                className="p-2 rounded bg-white w-full"
              />
            </div>

            <div className="mb-5 w-full mt-4">
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                value={userDetails.password}
                type="password"
                placeholder="Password"
                className="p-2 rounded bg-white w-full"
              />
            </div>

            <div className="mb-5 w-full flex justify-between">
              <p className="text-amber-400 text-sm">
                * Never share your password
              </p>
              {!register && (
                <p className="text-white underline text-sm">Forgot password?</p>
              )}
            </div>

            {register ? (
              <button
                onClick={handleRegister}
                type="button"
                className="bg-green-800 text-white w-full p-3 rounded mb-2"
              >
                Register
              </button>
            ) : (
              <button
                onClick={handleLogin}
                type="button"
                className="bg-green-800 text-white w-full p-3 rounded mb-2"
              >
                Login
              </button>
            )}

            {!register && (
              <>
                <p className="text-white my-2">
                  ---------------- or ----------------
                </p>
                <div className="p-4">
                  <GoogleLogin
                    onSuccess={(credentialResponse) =>
                      handleGoogleLogin(credentialResponse)
                    }
                    onError={() => toast.error("Google login failed")}
                  />
                </div>
              </>
            )}

            {register ? (
              <p className="text-white">
                Already a user?
                <Link to="/login" className="text-blue-600 underline ms-2">
                  Login
                </Link>
              </p>
            ) : (
              <p className="text-white">
                New here?
                <Link to="/register" className="text-blue-600 underline ms-2">
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

export default Auth;
